import { forwardRef } from 'react'
import type { TennisType } from '../data/types'
import { DIMENSIONS } from '../data/questions'
import type { DimensionResult } from '../lib/scoring'
import { typeArtUrl } from './Ball'
import { SITE } from '../config'

export const ShareCard = forwardRef<
  HTMLDivElement,
  { type: TennisType; dims?: DimensionResult[]; handle?: string }
>(function ShareCard({ type, dims, handle = SITE.handle }, ref) {
  const fontSans =
    '"Inter","PingFang SC","Hiragino Sans GB","Noto Sans SC",system-ui,sans-serif'
  const fontDisplay = '"Archivo Black","PingFang SC",sans-serif'
  const fontCond = '"Barlow Condensed","PingFang SC",sans-serif'

  const excerpt = type.summary.split('。').slice(0, 2).join('。') + '。'

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
        display: 'flex',
        flexDirection: 'column',
        padding: 56,
        boxSizing: 'border-box',
        fontFamily: fontSans,
      }}
    >
      {/* paper grain */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.35,
          mixBlendMode: 'multiply',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)' opacity='0.3'/%3E%3C/svg%3E\")",
        }}
      />

      {/* header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '3px solid #16241C',
          paddingBottom: 16,
          position: 'relative',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="14.2" fill="#D8EF52" />
            <path
              d="M4.2 7.4c5.6 4.6 5.6 14.6 0 17.2M27.8 7.4c-5.6 4.6-5.6 14.6 0 17.2"
              stroke="#16241C"
              strokeWidth="2.1"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <span style={{ fontSize: 28, letterSpacing: '0.1em', fontFamily: fontDisplay }}>TSTI</span>
        </div>
        <span
          style={{
            fontSize: 17,
            letterSpacing: '0.26em',
            color: '#3D4A41',
            textTransform: 'uppercase',
            fontFamily: fontCond,
            fontWeight: 600,
          }}
        >
          Tennis Style Type
        </span>
      </div>

      {/* main */}
      <div style={{ display: 'flex', gap: 40, marginTop: 28, position: 'relative', flexShrink: 0 }}>
        <div
          style={{
            width: 592,
            height: 789,
            border: '3px solid #16241C',
            overflow: 'hidden',
            background: '#E3D6BD',
            flexShrink: 0,
          }}
        >
          <img
            src={typeArtUrl(type.code)}
            alt=""
            crossOrigin="anonymous"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <div
            style={{
              fontFamily: fontDisplay,
              fontSize: 112,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: '#1F4D3A',
              marginLeft: -5,
            }}
          >
            {type.code}
          </div>
          <div style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15, marginTop: 12 }}>
            {type.name}
          </div>
          <div
            style={{
              width: 40,
              height: 4,
              background: '#D9622B',
              marginTop: 14,
              marginBottom: 12,
            }}
          />
          <div style={{ fontSize: 20, color: '#3D4A41', lineHeight: 1.55 }}>{type.tagline}</div>

          {/* dims */}
          {dims && (
            <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 15 }}>
              {dims.map((d) => {
                const meta = DIMENSIONS[d.dim]
                const leftPct = Math.round((d.leftCount / (d.leftCount + d.rightCount || 1)) * 100)
                return (
                  <div key={d.dim}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 16,
                        fontFamily: fontCond,
                        letterSpacing: '0.04em',
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontWeight: d.winner === d.left ? 700 : 500,
                          color: d.winner === d.left ? '#16241C' : 'rgba(22,36,28,0.3)',
                        }}
                      >
                        {d.left} {meta.leftLabel}
                      </span>
                      <span
                        style={{
                          fontWeight: d.winner === d.right ? 700 : 500,
                          color: d.winner === d.right ? '#16241C' : 'rgba(22,36,28,0.3)',
                        }}
                      >
                        {meta.rightLabel} {d.right}
                      </span>
                    </div>
                    <div style={{ height: 7, background: '#E3D6BD', position: 'relative' }}>
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
                          background: 'rgba(22,36,28,0.35)',
                        }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div style={{ marginTop: 24, minWidth: 0 }}>
            {type.quote ? (
              <div style={{ borderLeft: '3px solid #D9622B', paddingLeft: 14 }}>
                <div
                  style={{
                    fontSize: 17,
                    lineHeight: 1.5,
                    color: '#3D4A41',
                    fontFamily: fontSans,
                  }}
                >
                  “{type.quote.text}”
                </div>
                <div
                  style={{
                    marginTop: 7,
                    fontSize: 12,
                    letterSpacing: '0.16em',
                    color: '#3D4A41',
                    fontFamily: fontCond,
                    textTransform: 'uppercase',
                  }}
                >
                  — {type.quote.by}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: 15, lineHeight: 1.7, color: '#3D4A41' }}>{excerpt}</div>
            )}
          </div>
        </div>
      </div>

      {/* setup strip */}
      <div
        style={{
          marginTop: 26,
          borderTop: '2px solid rgba(22,36,28,0.22)',
          paddingTop: 18,
          display: 'flex',
          gap: 24,
          position: 'relative',
        }}
      >
        {type.gear.slice(0, 3).map((g) => (
          <div key={g.label} style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.26em',
                color: '#3D4A41',
                textTransform: 'uppercase',
                fontFamily: fontCond,
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              {g.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{g.value}</div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      {/* footer band */}
      <div
        style={{
          margin: '0 -56px -56px',
          background: '#1F4D3A',
          color: '#F5EFE3',
          padding: '26px 56px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.3em',
                color: '#D8EF52',
                fontWeight: 700,
                textTransform: 'uppercase',
                fontFamily: fontCond,
                marginBottom: 10,
              }}
            >
              Archetype Player
            </div>
            {type.players.map((p) => (
              <div key={p.name} style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 27, fontWeight: 700 }}>{p.name}</span>
                <span
                  style={{
                    fontSize: 15,
                    color: '#D8EF52',
                    marginLeft: 10,
                    letterSpacing: '0.04em',
                  }}
                >
                  {p.title}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                background: '#F5EFE3',
                padding: 9,
                lineHeight: 0,
                flexShrink: 0,
              }}
            >
              <img src="/qr.svg" alt="" width={96} height={96} style={{ display: 'block' }} />
            </div>
            <div style={{ fontSize: 14, lineHeight: 1.5, color: 'rgba(245,239,227,0.72)' }}>
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
              fontSize: 14,
              letterSpacing: '0.12em',
              color: 'rgba(245,239,227,0.6)',
              fontFamily: fontCond,
            }}
          >
            {handle}
          </span>
          <span
            style={{
              fontSize: 15,
              letterSpacing: '0.08em',
              color: 'rgba(245,239,227,0.85)',
              fontFamily: fontCond,
              fontWeight: 600,
            }}
          >
            Tennis Style Type Indicator ｜ 网球人格 16 型
          </span>
        </div>
      </div>
    </div>
  )
})
