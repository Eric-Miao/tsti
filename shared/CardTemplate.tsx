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

const AXES = ['EI', 'BN', 'SF', 'AD'] as const

const C = {
  paper: '#F5EFE3',
  ink: '#16241C',
  ball: '#D8EF52',
}

/** 场地决定色块：上旋=红土 / 网前平击=草地 / 底线平击=硬地 */
function blockColor(code: string) {
  const [, pos, spin] = code.split('')
  if (spin === 'S') return '#B84D1E' // 红土
  if (pos === 'N') return '#4F6B48' // 草地
  return '#34506B' // 硬地
}

export function CardTemplate({ type, index, artSrc, qrSrc, handle }: CardProps) {
  const bg = blockColor(type.code)
  const [m1, m2] = type.players
  const extra = type.players.slice(2)

  return (
    <div
      style={{
        width: 1080,
        height: 1440,
        display: 'flex',
        flexDirection: 'column',
        background: bg,
        color: C.paper,
        fontFamily: 'Noto',
      }}
    >
      {/* 上半：插图满幅 */}
      <img
        src={artSrc}
        width={1080}
        height={880}
        style={{ width: 1080, height: 880, objectFit: 'cover', objectPosition: 'center top' }}
      />

      {/* 下半：色块 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          padding: '30px 56px 30px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontFamily: 'Archivo',
              fontSize: 168,
              lineHeight: 0.92,
              letterSpacing: 2,
              color: C.paper,
            }}
          >
            {type.code}
          </div>
          <div style={{ fontSize: 52, fontWeight: 700, marginTop: 6, lineHeight: 1.1 }}>
            {type.name}
          </div>
          <div style={{ fontSize: 24, lineHeight: 1.45, marginTop: 10, color: 'rgba(245,239,227,0.82)' }}>
            {type.tagline}
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
            {type.code.split('').map((l, i) => {
              const meta = DIMENSIONS[AXES[i]]
              const label = l === meta.left ? meta.leftLabel : meta.rightLabel
              return (
                <div
                  key={l}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    border: '1.5px solid rgba(245,239,227,0.45)',
                    padding: '7px 14px',
                  }}
                >
                  <div style={{ fontFamily: 'Archivo', fontSize: 18 }}>{l}</div>
                  <div style={{ fontSize: 16, marginLeft: 7, color: 'rgba(245,239,227,0.8)' }}>
                    {label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 1, background: 'rgba(245,239,227,0.3)', marginBottom: 16 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', width: 760 }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>{m1.name}</div>
                  <div style={{ fontSize: 15, color: C.ball, marginLeft: 10 }}>{m1.title}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: 8 }}>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>{m2.name}</div>
                  <div style={{ fontSize: 15, color: C.ball, marginLeft: 10 }}>{m2.title}</div>
                </div>
                {extra.length > 0 && (
                  <div style={{ display: 'flex', marginTop: 8, color: 'rgba(245,239,227,0.6)', fontSize: 14 }}>
                    {extra.map((p) => p.name).join(' · ')}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', background: C.paper, padding: 8 }}>
                <img src={qrSrc} width={104} height={104} style={{ width: 104, height: 104 }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 15, lineHeight: 1.4, color: 'rgba(245,239,227,0.75)' }}>
                <div>扫码</div>
                <div>测一测</div>
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 18,
              fontFamily: 'Barlow',
              fontSize: 14,
              letterSpacing: 1,
              color: 'rgba(245,239,227,0.55)',
            }}
          >
            <div style={{ display: 'flex' }}>{handle}</div>
            <div style={{ display: 'flex' }}>
              TSTI · 第 {String(index).padStart(2, '0')} / 16 型
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
