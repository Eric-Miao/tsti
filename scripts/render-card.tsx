import fs from 'node:fs'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { TYPES, ALL_CODES } from '../src/data/types'
import { CardTemplate } from '../src/card/CardTemplate'
import type { DimensionResult } from '../src/lib/scoring'

const code = process.argv[2] ?? 'EBSA'
const type = TYPES[code]

const fonts = [
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-reg.otf'), weight: 400 as const },
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-bold.otf'), weight: 700 as const },
  { name: 'Archivo', data: fs.readFileSync('public/fonts/srv/archivo.ttf'), weight: 400 as const },
  { name: 'Barlow', data: fs.readFileSync('public/fonts/srv/barlow.ttf'), weight: 400 as const },
]

const b64 = (p: string, mime: string) =>
  `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`

const counts: [number, number][] = [
  [6, 1],
  [7, 0],
  [5, 2],
  [4, 3],
]
const dims: DimensionResult[] = [
  { dim: 'EI', left: 'E', right: 'I', leftCount: 6, rightCount: 1, winner: 'E', strength: 86 },
  { dim: 'BN', left: 'B', right: 'N', leftCount: 7, rightCount: 0, winner: 'B', strength: 100 },
  { dim: 'SF', left: 'S', right: 'F', leftCount: 5, rightCount: 2, winner: 'S', strength: 71 },
  { dim: 'AD', left: 'A', right: 'D', leftCount: 4, rightCount: 3, winner: 'A', strength: 57 },
]
void counts

const element = CardTemplate({
  type,
  dims,
  index: ALL_CODES.indexOf(code) + 1,
  artSrc: b64(`public/types/${code.toLowerCase()}-v3.jpg`, 'image/jpeg'),
  qrSrc: b64('public/qr-v3.png', 'image/png'),
  handle: '@Eric-Miao',
})

const svg = await satori(element as any, { width: 1080, height: 1440, fonts })
fs.writeFileSync('/tmp/card-server.svg', svg)
const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()
fs.writeFileSync('/tmp/card-server.png', png)
console.log('rendered', code, png.length, 'bytes')
