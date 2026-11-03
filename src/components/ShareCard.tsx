import { forwardRef } from 'react'
import type { TennisType } from '../data/types'
import { DIMENSIONS } from '../data/questions'
import type { DimensionResult } from '../lib/scoring'
import { ALL_CODES } from '../data/types'
import { typeArtUrl } from './Ball'
import { SITE } from '../config'

export const ShareCard = forwardRef<
  HTMLDivElement,
  { type: TennisType; dims?: DimensionResult[]; handle?: string }
>(function ShareCard({ type, dims, handle = SITE.handle }, ref) {
  const fontSans = '"Inter","PingFang SC","Hiragino Sans GB","Noto Sans SC",system-ui,sans-serif'
  const fontDisplay = '"Archivo Black","PingFang SC",sans-serif'
  const fontCond = '"Barlow Condensed","PingFang SC",sans-serif'

  const excerpt = type.summary.split('。').slice(0, 2).join('。') + '。'
  const index = String(ALL_CODES.indexOf(type.code) + 1).padStart(2, '0')

  return (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1440,
        background: '#F5EFE3',
        color: '#16241C',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: fontSans,
      }}
    >
      {/* ── 插图：左上出血 ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 700,
          height: 1050,
          overflow: 'hidden',
          background: '#E3D6BD',
          borderRight: '3px solid #16241C',
          borderBottom: '3px solid #16241C',
        }}
      >
        <img
          src={typeArtUrl(type.code)}
          alt=""
          crossOrigin="anonymous"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      {/* ── 右上：型号 / 名字 / 四维 / 语录 ────────── */}
      <div
        style={{
          position: 'absolute',
          left: 744,
          top: 0,
          width: 280,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9, paddingTop: 40 }}>
          <svg width="24" height="24" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14.2" fill="#D8EF52" />
            <path
              d="M4.2 7.4c5.6 4.6 5.6 14.6 0 17.2M27.8 7.4c-5.6 4.6-5.6 14.6 0 17.2"
              stroke="#16241C"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontFamily: fontDisplay, fontSize: 24, letterSpacing: '0.1em' }}>TSTI</span>
        </div>

        <div style={{ height: 3, background: '#16241C', marginTop: 18 }} />

        <div
          style={{
            fontFamily: fontDisplay,
            fontSize: 104,
            lineHeight: 0.86,
            letterSpacing: '0.01em',
            color: '#1F4D3A',
            marginTop: 32,
            marginLeft: -4,
          }}
        >
          {type.code}
        </div>

        <div style={{ fontSize: 40, fontWeight: 700, lineHeight: 1.1, marginTop: 12 }}>
          {type.name}
        </div>
        <div
          style={{
            fontFamily: fontCond,
            fontSize: 13,
            letterSpacing: '0.2em',
            color: '#3D4A41',
            textTransform: 'uppercase',
            marginTop: 9,
          }}
        >
          {type.en}
        </div>

        <div style={{ fontSize: 20, lineHeight: 1.5, fontWeight: 500, marginTop: 24 }}>
          {type.tagline}
        </div>

        {dims && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 30 }}>
            {dims.map((d) => {
              const meta = DIMENSIONS[d.dim]
              const leftPct = Math.round((d.leftCount / (d.leftCount + d.rightCount || 1)) * 100)
              return (
                <div key={d.dim}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontFamily: fontCond,
                      fontSize: 15,
                      letterSpacing: '0.06em',
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: d.winner === d.left ? 700 : 500,
                        color: d.winner === d.left ? '#16241C' : 'rgba(22,36,28,0.32)',
                      }}
                    >
                      {d.left} {meta.leftLabel}
                    </span>
                    <span
                      style={{
                        fontWeight: d.winner === d.right ? 700 : 500,
                        color: d.winner === d.right ? '#16241C' : 'rgba(22,36,28,0.32)',
                      }}
                    >
                      {meta.rightLabel} {d.right}
                    </span>
                  </div>
                  <div style={{ height: 6, background: '#DCD0BA', position: 'relative' }}>
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: `${leftPct}%`,
                        background: '#1F4D3A',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: -2,
                        bottom: -2,
                        width: 1,
                        background: 'rgba(22,36,28,0.25)',
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div
          style={{
            fontSize: 15,
            lineHeight: 1.6,
            color: '#3D4A41',
            borderTop: '2px solid rgba(22,36,28,0.2)',
            paddingTop: 14,
            marginTop: 28,
          }}
        >
          {type.quote ? (
            <>
              “{type.quote.text}”
              <span style={{ color: 'rgba(61,74,65,0.6)' }}> — {type.quote.by}</span>
            </>
          ) : (
            excerpt
          )}
        </div>
      </div>

      {/* ── 左下：档案编号 ─────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 744,
          top: 880,
          width: 280,
        }}
      >
        <div
          style={{
            fontFamily: fontCond,
            fontSize: 12,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#3D4A41',
          }}
        >
          档案编号 · File
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: 6 }}>
          <span
            style={{
              fontFamily: fontDisplay,
              fontSize: 96,
              lineHeight: 0.85,
              color: '#D9622B',
            }}
          >
            {index}
          </span>
          <span style={{ fontFamily: fontCond, fontSize: 22, color: '#3D4A41', paddingBottom: 8 }}>
            / 16
          </span>
        </div>
        <div style={{ height: 3, background: '#16241C', marginTop: 16 }} />
        <div
          style={{
            marginTop: 10,
            fontFamily: fontCond,
            fontSize: 15,
            letterSpacing: '0.1em',
            color: '#3D4A41',
          }}
        >
          {type.code.split('').map((letter, i) => {
            const meta = DIMENSIONS[(['EI', 'BN', 'SF', 'AD'] as const)[i]]
            const label = letter === meta.left ? meta.leftLabel : meta.rightLabel
            return (
              <span key={letter} style={{ marginRight: 4 }}>
                <span style={{ fontWeight: 700, color: '#16241C' }}>{letter}</span> {label}
                {i < 3 && <span style={{ color: 'rgba(22,36,28,0.3)', margin: '0 8px' }}>·</span>}
              </span>
            )
          })}
        </div>
      </div>

      {/* ── 底部数据区 ─────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: 300,
          background: '#1F4D3A',
          color: '#F5EFE3',
          padding: '32px 56px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                fontFamily: fontCond,
                fontSize: 12,
                letterSpacing: '0.3em',
                color: '#D8EF52',
                textTransform: 'uppercase',
                fontWeight: 700,
              }}
            >
              Archetype Player
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: type.players.length > 3 ? '1fr 1fr' : '1fr',
                columnGap: 18,
                rowGap: 9,
              }}
            >
              {type.players.map((p) => (
                <div key={p.name} style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 19, fontWeight: 700, lineHeight: 1.25 }}>{p.name}</div>
                  <div
                    style={{
                      fontSize: 11.5,
                      color: '#D8EF52',
                      marginTop: 2,
                      lineHeight: 1.25,
                      letterSpacing: '0.02em',
                    }}
                  >
                    {p.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ background: '#F5EFE3', padding: 10, lineHeight: 0 }}>
              <img src="/qr-v2.svg" alt="" width={120} height={120} style={{ display: 'block' }} />
            </div>
            <div style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(245,239,227,0.75)' }}>
              扫码
              <br />
              测一测
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(245,239,227,0.22)',
            paddingTop: 12,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 16,
          }}
        >
          <span
            style={{
              fontFamily: fontCond,
              fontSize: 14,
              letterSpacing: '0.14em',
              color: 'rgba(245,239,227,0.55)',
            }}
          >
            {handle}
          </span>
          <span
            style={{
              fontFamily: fontCond,
              fontSize: 15,
              letterSpacing: '0.08em',
              fontWeight: 600,
              color: 'rgba(245,239,227,0.85)',
            }}
          >
            Tennis Style Type Indicator ｜ 网球人格 16 型
          </span>
        </div>
      </div>
    </div>
  )
})
