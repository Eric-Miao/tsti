import fs from 'node:fs'
import path from 'node:path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { execFileSync } from 'node:child_process'
import { ALL_CODES } from '../src/data/types'
import { getTypes } from '../src/data'
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

for (const locale of ['zh', 'en'] as const) {
  const TYPES = getTypes(locale)
  const outDirL = locale === 'en' ? path.join(outDir, 'en') : outDir
  fs.mkdirSync(outDirL, { recursive: true })
  for (const code of ALL_CODES) {
  const type = TYPES[code]
  const svg = await satori(
    CardTemplate({
      type,
      index: ALL_CODES.indexOf(code) + 1,
      artSrc: b64(`public/types/${code.toLowerCase()}-v3.jpg`, 'image/jpeg'),
      qrSrc: b64('public/qr-v4.png', 'image/png'),
      locale,
    }) as any,
    { width: 1080, height: 1920, fonts },
  )
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1080 } }).render().asPng()
  const tmp = path.join(outDirL, `${code}.png`)
  fs.writeFileSync(tmp, png)
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', tmp, '-q:v', '2', path.join(outDirL, `${code}.jpg`)])
  fs.unlinkSync(tmp)
  console.log(locale, code, fs.statSync(path.join(outDirL, `${code}.jpg`)).size)
  }
}

console.log('cards written to public/cards')
