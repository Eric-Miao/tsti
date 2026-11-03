import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { TYPES, ALL_CODES } from '../src/data/types'
import { CardTemplate, type CardVariant } from '../shared/CardTemplate'

const fonts = [
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-reg.otf'), weight: 400 as const },
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-bold.otf'), weight: 700 as const },
  { name: 'Archivo', data: fs.readFileSync('public/fonts/srv/archivo.ttf'), weight: 400 as const },
  { name: 'Barlow', data: fs.readFileSync('public/fonts/srv/barlow.ttf'), weight: 400 as const },
]
const b64 = (p: string, m: string) => `data:${m};base64,${fs.readFileSync(p).toString('base64')}`

const out = '/tmp/cards-v3'
fs.mkdirSync(out, { recursive: true })
const code = process.argv[2] ?? 'EBSA'
const variants = (process.argv[3] ?? 'A,B,C').split(',') as CardVariant[]

for (const v of variants) {
  const type = TYPES[code]
  const svg = await satori(
    CardTemplate({
      type,
      index: ALL_CODES.indexOf(code) + 1,
      artSrc: b64(`public/types/${code.toLowerCase()}-v3.jpg`, 'image/jpeg'),
      qrSrc: b64('public/qr-v4.png', 'image/png'),
      handle: '@Eric-Miao',
      variant: v,
    }) as any,
    { width: 1080, height: 1920, fonts },
  )
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()
  const file = path.join(out, `${code}-${v}.png`)
  fs.writeFileSync(file, png)
  console.log(file, png.length)
}
