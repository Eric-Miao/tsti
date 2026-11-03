import React from 'react'
import type { TennisType } from '../src/data/types'
import { DIMENSIONS } from '../src/data/questions'
import { bestPartner, nightmare } from '../src/lib/pairing'
import type { DimensionResult } from '../src/lib/scoring'

export interface CardProps {
  type: TennisType
  dims?: DimensionResult[]
  index: number
  artSrc: string
  qrSrc: string
  handle: string
}

const AXES = ['EI', 'BN', 'SF', 'AD'] as const

const C = {
  paper: '#F5EFE3',
  paper2: '#E3D6BD',
  ink: '#16241C',
  inkSoft: '#3D4A41',
  green: '#1F4D3A',
  clay: '#D9622B',
  ball: '#D8EF52',
}

/** satori 只支持 flex，不支持 grid，所以这里全部用 flex 版式 */
export function CardTemplate({ type, dims, index, artSrc, qrSrc, handle }: CardProps) {
  const pairs: { dim: string; left: string; right: string; label: string; leftLabel: string; rightLabel: string; leftCount: number; rightCount: number; winner: string }[] =
    (dims ?? []).map((d) => {
      const meta = DIMENSIONS[d.dim]
      return {
        dim: d.dim,
        left: d.left,
        right: d.right,
        label: meta.name,
        leftLabel: meta.leftLabel,
        rightLabel: meta.rightLabel,
        leftCount: d.leftCount,
        rightCount: d.rightCount,
        winner: d.winner,
      }
    })

  // 球员两列排（超过 2 人时）
  const rows: typeof type.players[] = []
  for (let i = 0; i < type.players.length; i += 2) {
    rows.push(type.players.slice(i, i + 2))
  }

  return (
    <div
      style={{
        width: 1080,
        height: 1440,
        display: 'flex',
        flexDirection: 'column',
        background: C.paper,
        color: C.ink,
        fontFamily: 'Noto',
      }}
    >
      {/* 主区：插图 + 右栏 */}
      <div style={{ display: 'flex', height: 1050 }}>
        <img
          src={artSrc}
          width={700}
          height={1050}
          style={{ width: 700, height: 1050, objectFit: 'cover' }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: 380,
            height: 1050,
            padding: '36px 52px 30px 40px',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 11,
                  background: C.ball,
                  display: 'flex',
                }}
              />
              <div style={{ fontFamily: 'Archivo', fontSize: 24, letterSpacing: 2 }}>TSTI</div>
            </div>
            <div style={{ height: 3, background: C.ink, marginTop: 16 }} />

            <div
              style={{
                fontFamily: 'Archivo',
                fontSize: 104,
                lineHeight: 1,
                color: C.green,
                marginTop: 26,
              }}
            >
              {type.code}
            </div>
            <div style={{ fontSize: 40, fontWeight: 700, marginTop: 10 }}>{type.name}</div>
            <div
              style={{
                fontFamily: 'Barlow',
                fontSize: 13,
                letterSpacing: 3,
                color: C.inkSoft,
                marginTop: 8,
                textTransform: 'uppercase',
              }}
            >
              {type.en}
            </div>
            <div style={{ fontSize: 20, lineHeight: 1.5, marginTop: 18 }}>{type.tagline}</div>

            {/* 四维 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 26 }}>
              {pairs.map((d) => {
                const total = d.leftCount + d.rightCount || 1
                const pct = Math.round((d.leftCount / total) * 100)
                return (
                  <div key={d.dim} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'Barlow',
                        fontSize: 15,
                        marginBottom: 5,
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          fontWeight: d.winner === d.left ? 700 : 400,
                          color: d.winner === d.left ? C.ink : 'rgba(22,36,28,0.32)',
                        }}
                      >
                        {d.left} {d.leftLabel}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          fontWeight: d.winner === d.right ? 700 : 400,
                          color: d.winner === d.right ? C.ink : 'rgba(22,36,28,0.32)',
                        }}
                      >
                        {d.rightLabel} {d.right}
                      </div>
                    </div>
                    <div style={{ display: 'flex', height: 6, background: C.paper2 }}>
                      <div style={{ display: 'flex', width: `${pct}%`, background: C.green }} />
                    </div>
                  </div>
                )
              })}
            </div>

            <div
              style={{
                display: 'flex',
                fontSize: 15,
                lineHeight: 1.6,
                color: C.inkSoft,
                borderTop: '2px solid rgba(22,36,28,0.2)',
                paddingTop: 12,
                marginTop: 22,
              }}
            >
              {type.quote ? `“${type.quote.text}” — ${type.quote.by}` : type.summary.split('。')[0] + '。'}
            </div>

            <div style={{ display: 'flex', marginTop: 34, gap: 6 }}>
              {type.code.split('').map((l, i) => {
                const meta = DIMENSIONS[AXES[i]]
                return (
                  <div key={l} style={{ display: 'flex', flexDirection: 'column', width: 68 }}>
                    <div style={{ fontFamily: 'Archivo', fontSize: 44, lineHeight: 1, color: C.green }}>
                      {l}
                    </div>
                    <div style={{ fontFamily: 'Barlow', fontSize: 12, color: C.inkSoft, marginTop: 6 }}>
                      {l === meta.left ? meta.leftLabel : meta.rightLabel}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 档案编号 */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                fontFamily: 'Barlow',
                fontSize: 12,
                letterSpacing: 3,
                color: C.inkSoft,
                textTransform: 'uppercase',
              }}
            >
              档案编号 · File
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, marginTop: 4 }}>
              <div style={{ fontFamily: 'Archivo', fontSize: 88, lineHeight: 1, color: C.clay }}>
                {String(index).padStart(2, '0')}
              </div>
              <div style={{ fontFamily: 'Barlow', fontSize: 20, color: C.inkSoft, paddingBottom: 10 }}>
                / 16
              </div>
            </div>
            <div style={{ height: 3, background: C.ink, marginTop: 10 }} />
          </div>
        </div>
      </div>

      {/* 间隔 */}
      <div style={{ display: 'flex', height: 90 }} />

      {/* 底部数据带 */}
      <div
        style={{
          display: 'flex',
          height: 300,
          background: C.green,
          color: C.paper,
          padding: '26px 52px 18px',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: 640 }}>
            <div
              style={{
                fontFamily: 'Barlow',
                fontSize: 12,
                letterSpacing: 3,
                color: C.ball,
                textTransform: 'uppercase',
              }}
            >
              Archetype Player
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 8 }}>
              {rows.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', marginBottom: 6 }}>
                  {row.map((p) => (
                    <div key={p.name} style={{ display: 'flex', flexDirection: 'column', width: 320 }}>
                      <div style={{ fontSize: 18, fontWeight: 700 }}>{p.name}</div>
                      <div style={{ fontSize: 11, color: C.ball, marginTop: 2 }}>{p.title}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ display: 'flex', background: C.paper, padding: 8 }}>
              <img src={qrSrc} width={112} height={112} style={{ width: 112, height: 112 }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14, color: 'rgba(245,239,227,0.75)', lineHeight: 1.5 }}>
              <div>扫码</div>
              <div>测一测</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(245,239,227,0.22)',
            paddingTop: 10,
            fontFamily: 'Barlow',
            fontSize: 14,
          }}
        >
          <div style={{ display: 'flex', color: 'rgba(245,239,227,0.55)', letterSpacing: 2 }}>{handle}</div>
          <div style={{ display: 'flex', color: 'rgba(245,239,227,0.85)', letterSpacing: 1 }}>
            Tennis Style Type Indicator ｜ 网球人格 16 型
          </div>
        </div>
      </div>
    </div>
  )
}

export { bestPartner, nightmare }
