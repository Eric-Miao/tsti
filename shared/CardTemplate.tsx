import React from 'react'
import type { TennisType } from '../src/data/types'
import { DIMENSIONS } from '../src/data/questions'

export interface CardProps {
  type: TennisType
  index: number
  artSrc: string
  qrSrc: string
  handle: string
}

const C = {
  paper: '#F5EFE3',
  ball: '#D8EF52',
}

const AXES = ['EI', 'BN', 'SF', 'AD'] as const

/** 场地决定色块：上旋=红土 / 网前平击=草地 / 底线平击=硬地 */
function blockColor(code: string) {
  const [, pos, spin] = code.split('')
  if (spin === 'S') return '#B84D1E'
  if (pos === 'N') return '#4F6B48'
  return '#34506B'
}

export function CardTemplate({ type, index, artSrc, qrSrc, handle }: CardProps) {
  const bg = blockColor(type.code)

  return (
    <div
      style={{
        width: 1080,
        height: 1440,
        display: 'flex',
        position: 'relative',
        background: bg,
        color: C.paper,
        fontFamily: 'Noto',
      }}
    >
      {/* 满幅插图 */}
      <img
        src={artSrc}
        width={1080}
        height={1440}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 1080,
          height: 1440,
          objectFit: 'cover',
          objectPosition: 'center top',
        }}
      />

      {/* 居中信息块 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 880,
          background: bg,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 64px',
        }}
      >
        <div
          style={{
            fontFamily: 'Archivo',
            fontSize: 196,
            lineHeight: 0.9,
            letterSpacing: 4,
          }}
        >
          {type.code}
        </div>

        <div style={{ fontSize: 62, fontWeight: 700, marginTop: 14, lineHeight: 1.1 }}>
          {type.name}
        </div>

        <div
          style={{
            fontSize: 28,
            lineHeight: 1.5,
            marginTop: 16,
            color: 'rgba(245,239,227,0.85)',
            textAlign: 'center',
            maxWidth: 820,
          }}
        >
          {type.tagline}
        </div>

        <div
          style={{
            fontSize: 21,
            lineHeight: 1.6,
            marginTop: 12,
            color: 'rgba(245,239,227,0.62)',
            textAlign: 'center',
            maxWidth: 760,
          }}
        >
          {type.summary.split('。')[0]}。
        </div>

        <div style={{ display: 'flex', gap: 14, marginTop: 26 }}>
          {type.code.split('').map((l, i) => {
            const meta = DIMENSIONS[AXES[i]]
            const label = l === meta.left ? meta.leftLabel : meta.rightLabel
            return (
              <div
                key={l}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  border: '2px solid rgba(245,239,227,0.5)',
                  padding: '9px 18px',
                }}
              >
                <div style={{ fontFamily: 'Archivo', fontSize: 24 }}>{l}</div>
                <div style={{ fontSize: 22, marginLeft: 9, color: 'rgba(245,239,227,0.85)' }}>
                  {label}
                </div>
              </div>
            )
          })}
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 26,
            marginTop: 32,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9 }}>
            <div style={{ display: 'flex', background: C.paper, padding: 12 }}>
              <img src={qrSrc} width={150} height={150} style={{ width: 150, height: 150 }} />
            </div>
            <div style={{ fontSize: 20, color: 'rgba(245,239,227,0.8)' }}>扫码测一测</div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              borderLeft: '2px solid rgba(245,239,227,0.3)',
              paddingLeft: 26,
              width: 470,
            }}
          >
            {type.players.slice(0, 2).map((p) => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 28, fontWeight: 700 }}>{p.name}</div>
                  <div style={{ fontSize: 17, color: C.ball, marginLeft: 10 }}>{p.title}</div>
                </div>
              </div>
            ))}
            {type.players.length > 2 && (
              <div style={{ display: 'flex', fontSize: 17, color: 'rgba(245,239,227,0.65)' }}>
                同型还有 {type.players.slice(2).map((p) => p.name).join('、')}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: 34,
            fontFamily: 'Barlow',
            fontSize: 16,
            letterSpacing: 2,
            color: 'rgba(245,239,227,0.55)',
          }}
        >
          <div style={{ display: 'flex' }}>{handle}</div>
          <div style={{ display: 'flex' }}>TSTI · 第 {String(index).padStart(2, '0')} / 16 型</div>
        </div>
      </div>
    </div>
  )
}
