import React from 'react'
import type { TennisType } from '../src/data/types'

export interface CardProps {
  type: TennisType
  index: number
  artSrc: string
  qrSrc: string
  handle: string
}

const C = {
  paper: '#F5EFE3',
  ink: '#16241C',
  green: '#1F4D3A',
  yellow: '#D8EF52',
}

function blockColor(code: string) {
  const [, pos, spin] = code.split('')
  if (spin === 'S') return '#B84D1E'
  if (pos === 'N') return '#4F6B48'
  return '#34506B'
}

/** 每张插图的构图不同，个别需要放大并重新对焦（z=放大倍数，f=纵向对焦 0顶 1底） */
const FOCUS: Record<string, { z: number; f: number }> = {
  IBSD: { z: 1.5, f: 0.06 },
  IBFD: { z: 1.3, f: 0.16 },
  INFD: { z: 1.18, f: 0.1 },
}

const IMAGE_H = 1240
const CREAM_H = 410
const FOOTER_H = 270

export function CardTemplate({ type, index, artSrc, qrSrc, handle }: CardProps) {
  const bg = blockColor(type.code)

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        display: 'flex',
        flexDirection: 'column',
        background: C.paper,
        color: C.ink,
        fontFamily: 'Noto',
      }}
    >
      {/* 插图 0–1240 */}
      <div style={{ width: 1080, height: IMAGE_H, overflow: 'hidden', flexShrink: 0 }}>
        <img
          src={artSrc}
          style={{
            width: 1080 * (FOCUS[type.code]?.z ?? 1),
            height: IMAGE_H * (FOCUS[type.code]?.z ?? 1),
            objectFit: 'cover',
            objectPosition: 'center top',
            marginLeft: -(1080 * ((FOCUS[type.code]?.z ?? 1) - 1)) / 2,
            marginTop: -(IMAGE_H * ((FOCUS[type.code]?.z ?? 1) - 1)) * (FOCUS[type.code]?.f ?? 0),
          }}
        />
      </div>

      {/* 奶油信息面 1240–1720 */}
      <div
        style={{
          width: 1080,
          height: CREAM_H,
          flexShrink: 0,
          display: 'flex',
        }}
      >
        <div style={{ display: 'flex', width: 952, marginLeft: 64, marginTop: 32 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 600 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: C.yellow,
                padding: '8px 16px',
              }}
            >
              <div style={{ fontSize: 26, fontWeight: 700, color: C.green }}>网球人格测试</div>
            </div>
            <div
              style={{
                display: 'flex',
                marginLeft: 14,
                fontFamily: 'Archivo',
                fontSize: 22,
                letterSpacing: 2,
                color: C.green,
              }}
            >
              TSTI
            </div>
          </div>

          <div
            style={{
              fontFamily: 'Archivo',
              fontSize: 168,
              lineHeight: 0.92,
              color: C.green,
              marginTop: 18,
            }}
          >
            {type.code}
          </div>

          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.15, marginTop: 4 }}>
            {type.name}
          </div>

          <div
            style={{
              fontSize: 25,
              lineHeight: 1.5,
              marginTop: 12,
              color: '#3A4A40',
              width: 600,
            }}
          >
            {type.tagline}
          </div>
        </div>

        {/* 二维码 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginLeft: 'auto',
            width: 288,
          }}
        >
          <div
            style={{
              display: 'flex',
              background: '#FFFFFF',
              padding: 36,
            }}
          >
            <img src={qrSrc} width={216} height={216} style={{ width: 216, height: 216 }} />
          </div>
          <div
            style={{
              fontSize: 20,
              color: C.green,
              marginTop: 10,
              width: 288,
              textAlign: 'center',
            }}
          >
            扫码，测出你的网球人格
          </div>
        </div>
        </div>
      </div>

      {/* 色块页脚 1720–1920 */}
      <div
        style={{
          width: 1080,
          height: FOOTER_H,
          flexShrink: 0,
          background: bg,
          color: '#FFFFFF',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <div style={{ display: 'flex', width: 952, marginLeft: 64 }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: 700, justifyContent: 'center' }}>
          {type.players.slice(0, 2).map((p) => (
            <div key={p.name} style={{ display: 'flex', alignItems: 'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: 26, fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 18, marginLeft: 10, color: 'rgba(255,255,255,0.85)' }}>
                {p.title}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            height: FOOTER_H,
            marginLeft: 'auto',
          }}
        >
          <div style={{ display: 'flex', fontSize: 20, fontWeight: 700, marginTop: 30 }}>
            第 {String(index).padStart(2, '0')} / 16 型
          </div>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Barlow',
              fontSize: 16,
              letterSpacing: 1,
              color: 'rgba(255,255,255,0.75)',
              marginBottom: 16,
            }}
          >
            {handle}
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}
