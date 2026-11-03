import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { ALL_CODES, TYPES } from '../src/data/types'
import { CardTemplate } from '../shared/CardTemplate'

const root = process.cwd()
const outDir = path.join(root, 'public/cards')
fs.mkdirSync(outDir, { recursive: true })

const fonts = [
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-reg.otf'), weight: 400 as const },
  { name: 'Noto', data: fs.readFileSync('public/fonts/srv/noto-bold.otf'), weight: 700 as const },
  { name: 'Archivo', data: fs.readFileSync('public/fonts/srv/archivo.ttf'), weight: 400 as const },
  { name: 'Barlow', data: fs.readFileSync('public/fonts/srv/barlow.ttf'), weight: 400 as const },
]

const b64 = (p: string, mime: string) =>
  `data:${mime};base64,${fs.readFileSync(p).toString('base64')}`

for (const code of ALL_CODES) {
  const type = TYPES[code]
  const svg = await satori(
    CardTemplate({
      type,
      index: ALL_CODES.indexOf(code) + 1,
      artSrc: b64(`public/types/${code.toLowerCase()}-v3.jpg`, 'image/jpeg'),
      qrSrc: b64('public/qr-v3.png', 'image/png'),
      handle: '@Eric-Miao',
    }) as any,
    { width: 1080, height: 1440, fonts },
  )
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()
  fs.writeFileSync(path.join(outDir, `${code}.png`), png)
  console.log(code, png.length)
}

console.log('cards written to public/cards')
