import { forwardRef } from 'react'
import type { TennisType } from '../data/types'
import { DIMENSIONS } from '../data/questions'
import type { DimensionResult } from '../lib/scoring'
import { typeArtUrl } from './Ball'
import { SITE } from '../config'

export const ShareCard = forwardRef<
  HTMLDivElement,
  { type: TennisType; dims?: DimensionResult[]; site?: string; handle?: string }
>(function ShareCard(
  { type, dims, site = SITE.url, handle = SITE.handle },
  ref,
) {
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
      <div style={{ display: 'flex', gap: 40, marginTop: 30, position: 'relative', flexShrink: 0 }}>
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
              fontSize: 116,
              lineHeight: 0.9,
              letterSpacing: '0.01em',
              color: '#1F4D3A',
              marginLeft: -5,
            }}
          >
            {type.code}
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.15, marginTop: 12 }}>
            {type.name}
          </div>
          <div
            style={{
              width: 40,
              height: 4,
              background: '#D9622B',
              marginTop: 16,
              marginBottom: 14,
            }}
          />
          <div style={{ fontSize: 21, color: '#3D4A41', lineHeight: 1.55 }}>{type.tagline}</div>

          {/* dims */}
          {dims && (
            <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 17 }}>
              {dims.map((d) => {
                const meta = DIMENSIONS[d.dim]
                const leftPct = Math.round((d.leftCount / (d.leftCount + d.rightCount || 1)) * 100)
                return (
                  <div key={d.dim}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 17,
                        fontFamily: fontCond,
                        letterSpacing: '0.04em',
                        marginBottom: 5,
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
                    <div style={{ height: 8, background: '#E3D6BD', position: 'relative' }}>
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

          <div style={{ marginTop: 24, fontSize: 17, lineHeight: 1.7, color: '#3D4A41' }}>
            {excerpt}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      {/* setup strip */}
      <div
        style={{
          borderTop: '2px solid rgba(22,36,28,0.22)',
          paddingTop: 20,
          display: 'flex',
          gap: 24,
          position: 'relative',
        }}
      >
        {type.gear.slice(0, 3).map((g) => (
          <div key={g.label} style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                letterSpacing: '0.26em',
                color: '#3D4A41',
                textTransform: 'uppercase',
                fontFamily: fontCond,
                fontWeight: 600,
                marginBottom: 8,
              }}
            >
              {g.label}
            </div>
            <div style={{ fontSize: 21, fontWeight: 600, lineHeight: 1.3 }}>{g.value}</div>
          </div>
        ))}
      </div>

      {/* one thing */}
      <div
        style={{
          marginTop: 26,
          borderLeft: '4px solid #D9622B',
          paddingLeft: 18,
          position: 'relative',
        }}
      >
        <div
          style={{
            fontSize: 13,
            letterSpacing: '0.26em',
            color: '#D9622B',
            textTransform: 'uppercase',
            fontFamily: fontCond,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          One Thing
        </div>
        <div style={{ fontSize: 20, lineHeight: 1.6, color: '#16241C' }}>{type.training}</div>
      </div>

      <div style={{ flex: 1 }} />

      {/* footer band */}
      <div
        style={{
          margin: '0 -56px -56px',
          background: '#1F4D3A',
          color: '#F5EFE3',
          padding: '32px 56px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              letterSpacing: '0.3em',
              color: '#D8EF52',
              fontWeight: 700,
              textTransform: 'uppercase',
              fontFamily: fontCond,
            }}
          >
            Archetype Player
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, marginTop: 7 }}>
            {type.players[0]?.name}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            style={{
              fontSize: 17,
              letterSpacing: '0.14em',
              color: '#F5EFE3',
              fontFamily: fontCond,
              fontWeight: 600,
            }}
          >
            {site}
          </div>
          <div
            style={{
              fontSize: 14,
              letterSpacing: '0.12em',
              color: 'rgba(245,239,227,0.6)',
              fontFamily: fontCond,
              fontWeight: 500,
              marginTop: 4,
            }}
          >
            {handle}
          </div>
        </div>
      </div>
    </div>
  )
})
