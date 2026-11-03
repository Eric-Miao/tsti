import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'
import { ALL_CODES, TYPES } from '../src/data/types'
import { CardTemplate } from '../src/card/CardTemplate'
import type { DimensionResult } from '../src/lib/scoring'

export const config = { runtime: 'edge' }

type Font = { name: string; data: ArrayBuffer; weight: 400 | 700 }

let fontCache: Font[] | null = null
let wasmReady: Promise<void> | null = null

async function loadFonts(origin: string): Promise<Font[]> {
  if (fontCache) return fontCache
  const load = (path: string) => fetch(new URL(path, origin)).then((r) => r.arrayBuffer())
  const [noto, notoBold, archivo, barlow] = await Promise.all([
    load('/fonts/srv/noto-reg.otf'),
    load('/fonts/srv/noto-bold.otf'),
    load('/fonts/srv/archivo.ttf'),
    load('/fonts/srv/barlow.ttf'),
  ])
  fontCache = [
    { name: 'Noto', data: noto, weight: 400 },
    { name: 'Noto', data: notoBold, weight: 700 },
    { name: 'Archivo', data: archivo, weight: 400 },
    { name: 'Barlow', data: barlow, weight: 400 },
  ]
  return fontCache
}

async function loadWasm(origin: string) {
  if (!wasmReady) {
    wasmReady = (async () => {
      const res = await fetch(new URL('/resvg.wasm', origin))
      await initWasm(await res.arrayBuffer())
    })()
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

export default async function handler(req: Request) {
  const url = new URL(req.url)
  const code = (url.searchParams.get('c') ?? '').toUpperCase()
  const type = TYPES[code]
  if (!type) return new Response('unknown type', { status: 404 })

  try {
    const dims = parseDims(url.searchParams.get('d') ?? '43,43,43,43')
    const [fonts] = await Promise.all([loadFonts(url.origin), loadWasm(url.origin)])

    const art = new URL(`/types/${code.toLowerCase()}-v3.jpg`, url.origin).toString()
    const qr = new URL('/qr-v3.png', url.origin).toString()

    const svg = await satori(
      <CardTemplate
        type={type}
        dims={dims}
        index={ALL_CODES.indexOf(code) + 1}
        artSrc={art}
        qrSrc={qr}
        handle="@Eric-Miao"
      />,
      { width: 1080, height: 1440, fonts },
    )

    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()

    return new Response(png, {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'public, max-age=3600, s-maxage=86400',
      },
    })
  } catch (err) {
    console.error('[card]', err)
    return new Response(`card error: ${(err as Error).message}`, { status: 500 })
  }
}
