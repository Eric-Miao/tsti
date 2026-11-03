import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { ALL_CODES, TYPES } from '../src/data/types'
import { CardTemplate } from '../src/card/CardTemplate'
import type { DimensionResult } from '../src/lib/scoring'

type Font = { name: string; data: Buffer; weight: 400 | 700 }

let fontCache: Font[] | null = null
let wasmReady: Promise<void> | null = null

const file = (p: string) => fs.readFileSync(path.join(process.cwd(), p))

function loadFonts(): Font[] {
  if (fontCache) return fontCache
  fontCache = [
    { name: 'Noto', data: file('public/fonts/srv/noto-reg.otf'), weight: 400 },
    { name: 'Noto', data: file('public/fonts/srv/noto-bold.otf'), weight: 700 },
    { name: 'Archivo', data: file('public/fonts/srv/archivo.ttf'), weight: 400 },
    { name: 'Barlow', data: file('public/fonts/srv/barlow.ttf'), weight: 400 },
  ]
  return fontCache
}

async function loadWasm() {
  if (!wasmReady) {
    wasmReady = initWasm(file('public/resvg.wasm'))
  }
  return wasmReady
}

const DIMS = [
  { dim: 'EI' as const, left: 'E' as const, right: 'I' as const },
  { dim: 'BN' as const, left: 'B' as const, right: 'N' as const },
  { dim: 'SF' as const, left: 'S' as const, right: 'F' as const },
  { dim: 'AD' as const, left: 'A' as const, right: 'D' as const },
]

function parseDims(raw: string): DimensionResult[] {
  return DIMS.map((d, i) => {
    const chunk = raw.split(',')[i] ?? '00'
    const leftCount = Number(chunk[0] ?? 0) || 0
    const rightCount = Number(chunk[1] ?? 0) || 0
    const winner = leftCount >= rightCount ? d.left : d.right
    const total = leftCount + rightCount || 1
    return {
      ...d,
      leftCount,
      rightCount,
      winner,
      strength: Math.round((Math.max(leftCount, rightCount) / total) * 100),
    }
  })
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const codeParam = Array.isArray(req.query.c) ? req.query.c[0] : req.query.c
  const code = (codeParam ?? '').toUpperCase()
  const type = TYPES[code]
  if (!type) {
    res.status(404).send('unknown type')
    return
  }

  try {
    const rawDims = Array.isArray(req.query.d) ? req.query.d[0] : req.query.d
    const dims = parseDims(rawDims ?? '43,43,43,43')
    const fonts = loadFonts()
    await loadWasm()

    const artSrc = `data:image/jpeg;base64,${file(`public/types/${code.toLowerCase()}-v3.jpg`).toString('base64')}`
    const qrSrc = `data:image/png;base64,${file('public/qr-v3.png').toString('base64')}`

    const svg = await satori(
      <CardTemplate
        type={type}
        dims={dims}
        index={ALL_CODES.indexOf(code) + 1}
        artSrc={artSrc}
        qrSrc={qrSrc}
        handle="@Eric-Miao"
      />,
      { width: 1080, height: 1440, fonts },
    )

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()

    res.setHeader('content-type', 'image/png')
    res.setHeader('cache-control', 'public, max-age=3600, s-maxage=86400')
    res.status(200).send(Buffer.from(png))
  } catch (err) {
    console.error('[card]', err)
    res.status(500).send(`card error: ${(err as Error).message}`)
  }
}
