import { useEffect, useRef, useState } from 'react'
import { ALL_CODES, TYPES } from '../data/types'
import { ShareCard } from '../components/ShareCard'
import { TypeArt } from '../components/TypeArt'
import { DimensionReadout } from '../components/DimBars'
import { Ball } from '../components/Ball'
import { fetchStats, recordResult } from '../lib/supabase'

export function Result({
  code,
  dims,
  isOwn,
  onStart,
  onHome,
  onPickType,
}: {
  code: string
  dims?: number[][]
  isOwn: boolean
  onStart: () => void
  onHome: () => void
  onPickType: (code: string) => void
}) {
  const type = TYPES[code]
  const cardRef = useRef<HTMLDivElement>(null)
  const [cardUrl, setCardUrl] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [samePct, setSamePct] = useState<number | null>(null)
  const [total, setTotal] = useState<number | null>(null)

  const dimensionResults = dims?.map(([l, r], i) => {
    const keys = [
      { dim: 'EI' as const, left: 'E' as const, right: 'I' as const },
      { dim: 'BN' as const, left: 'B' as const, right: 'N' as const },
      { dim: 'SF' as const, left: 'S' as const, right: 'F' as const },
      { dim: 'AD' as const, left: 'A' as const, right: 'D' as const },
    ][i]
    const winner = l >= r ? keys.left : keys.right
    return {
      ...keys,
      leftCount: l,
      rightCount: r,
      winner,
      strength: Math.round((Math.max(l, r) / (l + r || 1)) * 100),
    }
  })

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isOwn && dims) {
      // 每个设备只记一条，重复进入不会重复计数
      recordResult({
        code,
        scores: {
          E: dims[0][0], I: dims[0][1],
          B: dims[1][0], N: dims[1][1],
          S: dims[2][0], F: dims[2][1],
          A: dims[3][0], D: dims[3][1],
        },
      })
    }
    fetchStats().then((s) => {
      if (!s || s.total === 0) return
      setTotal(s.total)
      const c = s.counts[code] ?? 0
      setSamePct(Math.max(1, Math.round((c / s.total) * 100)))
    })
  }, [code, isOwn, dims])

  async function makeCard() {
    if (!cardRef.current || busy) return
    setBusy(true)
    try {
      const { toPng } = await import('html-to-image')
      await document.fonts.ready
      const url = await toPng(cardRef.current, { pixelRatio: 1, cacheBust: true })
      setCardUrl(url)
    } catch {
      try {
        const { toPng } = await import('html-to-image')
        const url = await toPng(cardRef.current, { pixelRatio: 1, skipFonts: true })
        setCardUrl(url)
      } catch {
        /* give up quietly */
      }
    } finally {
      setBusy(false)
    }
  }

  async function shareCard() {
    if (!cardUrl) return
    try {
      const blob = await (await fetch(cardUrl)).blob()
      const file = new File([blob], `TSTI-${type.code}.png`, { type: 'image/png' })
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `TSTI · ${type.name}` })
        return
      }
    } catch {
      /* fall through to download */
    }
    const a = document.createElement('a')
    a.href = cardUrl
    a.download = `TSTI-${type.code}.png`
    a.click()
  }

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[600px] px-5 pb-16">
      <header className="flex items-center justify-between border-b-[1.5px] border-ink py-3.5">
        <button onClick={onHome} className="flex items-center gap-2">
          <Ball className="h-[17px] w-[17px] text-ball" />
          <span className="font-display text-[1rem] tracking-[0.08em]">TSTI</span>
        </button>
        <span className="label text-[0.58rem]">
          {isOwn ? '你的结果' : '类型档案'}
        </span>
      </header>

      {/* hero */}
      <section className="animate-scale-in pt-5">
        <div className="border-[1.5px] border-ink">
          <TypeArt code={type.code} className="block aspect-[4/5] w-full object-cover" />
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <div className="font-display text-[3.4rem] leading-[0.9] tracking-[0.01em] text-green">
              {type.code}
            </div>
            <h1 className="mt-2 text-[1.7rem] leading-tight font-bold">{type.name}</h1>
            <p className="mt-1 font-cond text-[0.8rem] tracking-[0.16em] text-ink-soft uppercase">
              {type.en}
            </p>
          </div>
          {samePct !== null && (
            <div className="shrink-0 border-[1.5px] border-ink px-2.5 py-1.5 text-center">
              <div className="font-display text-lg leading-none text-clay">{samePct}%</div>
              <div className="mt-1 text-[0.55rem] leading-none text-ink-soft">同型</div>
            </div>
          )}
        </div>

        <p className="mt-4 border-l-[3px] border-clay pl-3 text-[1.05rem] font-medium leading-relaxed">
          {type.tagline}
        </p>
      </section>

      {/* dimensions */}
      {dimensionResults && (
        <section className="mt-8">
          <SectionTitle label="四维读数" en="Your Axes" />
          <div className="divide-y divide-ink/10">
            {dimensionResults.map((d) => (
              <DimensionReadout key={d.dim} dim={d} />
            ))}
          </div>
        </section>
      )}

      {/* archetype */}
      <section className="mt-8 border-[1.5px] border-ink bg-green text-paper">
        <div className="border-b border-paper/20 px-5 py-3">
          <div className="label text-[0.56rem] !text-paper/60">原型球员</div>
        </div>
        {type.players.map((p) => (
          <div key={p.name} className="border-b border-paper/20 px-5 py-4 last:border-b-0">
            <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
              <span className="text-[1.1rem] font-bold">{p.name}</span>
              <span className="text-[0.68rem] tracking-[0.06em] text-ball">{p.title}</span>
            </div>
            <div className="mt-1 text-[0.8rem] leading-relaxed text-paper/70">{p.note}</div>
          </div>
        ))}
        {type.quote && (
          <blockquote className="border-t border-paper/20 px-5 py-4">
            <p className="text-[0.92rem] leading-[1.65] text-paper/90">“{type.quote.text}”</p>
            <cite className="mt-2 block font-cond text-[0.7rem] tracking-[0.16em] text-paper/50 uppercase not-italic">
              — {type.quote.by}
            </cite>
          </blockquote>
        )}
      </section>

      {/* summary */}
      <section className="mt-8">
        <SectionTitle label="球场画像" en="On Court" />
        <p className="text-[0.95rem] leading-[1.85] text-ink-soft">{type.summary}</p>

        <div className="mt-5 grid grid-cols-2 gap-px bg-ink/15">
          {type.profile.map((row) => (
            <div key={row.label} className="bg-paper px-3 py-3">
              <div className="label mb-1 text-[0.56rem]">{row.label}</div>
              <div className="text-[0.85rem] font-medium">{row.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* strengths / weaknesses */}
      <section className="mt-8">
        <SectionTitle label="优势与痛点" en="Pros & Cons" />
        <div className="grid gap-2.5">
          <div className="border-[1.5px] border-ink p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 bg-green" />
              <span className="font-cond text-sm font-bold tracking-[0.18em] uppercase">你的武器</span>
            </div>
            <ul className="space-y-1.5">
              {type.strengths.map((s) => (
                <li key={s} className="flex gap-2 text-[0.88rem] leading-relaxed">
                  <span className="text-green">＋</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-[1.5px] border-ink p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 bg-clay" />
              <span className="font-cond text-sm font-bold tracking-[0.18em] uppercase">你的痛点</span>
            </div>
            <ul className="space-y-1.5">
              {type.weaknesses.map((s) => (
                <li key={s} className="flex gap-2 text-[0.88rem] leading-relaxed">
                  <span className="text-clay">－</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* gear */}
      <section className="mt-8">
        <SectionTitle label="装备偏好" en="Setup" />
        <div className="divide-y divide-ink/10 border-y-[1.5px] border-ink">
          {type.gear.map((g) => (
            <div key={g.label} className="flex items-baseline justify-between gap-4 py-2.5">
              <span className="label text-[0.6rem]">{g.label}</span>
              <span className="text-[0.86rem] font-medium">{g.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* doubles */}
      <section className="mt-8">
        <SectionTitle label="双打定位" en="Doubles" />
        <p className="text-[0.92rem] leading-relaxed text-ink-soft">{type.doubles}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <PartnerCard label="最佳搭子" code={type.bestPartner} tone="green" onPick={onPickType} />
          <PartnerCard label="最怕遇到" code={type.nightmare} tone="clay" onPick={onPickType} />
        </div>
      </section>

      {/* actions */}
      <section className="mt-8 space-y-2.5">
        <button className="btn-primary" onClick={makeCard} disabled={busy}>
          {busy ? '正在生成…' : '生成分享卡片'}
        </button>
        {isOwn ? (
          <button className="btn-ghost w-full" onClick={onStart}>
            再测一次
          </button>
        ) : (
          <button className="btn-ghost w-full" onClick={onStart}>
            测一测我是哪一种
          </button>
        )}
      </section>

      {total !== null && (
        <p className="mt-4 text-center text-[0.7rem] text-ink-soft">
          已有 {total.toLocaleString()} 人完成测试
        </p>
      )}

      {/* other types */}
      <section className="mt-10">
        <SectionTitle label="其他型号" en="All Types" />
        <div className="grid grid-cols-4 gap-px bg-ink/15">
          {ALL_CODES.map((c) => (
            <button
              key={c}
              onClick={() => onPickType(c)}
              className={`bg-paper py-3 text-center transition-colors hover:bg-paper-2 ${
                c === code ? 'bg-green text-paper hover:bg-green' : ''
              }`}
            >
              <div className="font-cond text-[0.78rem] font-bold tracking-[0.06em]">{c}</div>
            </button>
          ))}
        </div>
      </section>

      <footer className="mt-10 border-t-[1.5px] border-ink pt-4">
        <p className="text-[0.68rem] leading-relaxed text-ink-soft">
          TSTI 是一个娱乐性质的自测工具，不构成心理测量、技术评级或教练建议。
          它只描述你打球的倾向，与你的球技无关。
        </p>
      </footer>

      {/* offscreen share card */}
      <div style={{ position: 'fixed', left: -9999, top: 0, pointerEvents: 'none' }} aria-hidden>
        <ShareCard ref={cardRef} type={type} dims={dimensionResults} />
      </div>

      {cardUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/80 p-5 backdrop-blur-sm"
          onClick={() => setCardUrl(null)}
        >
          <div className="flex items-center justify-between pb-3 text-paper">
            <span className="font-cond text-sm tracking-[0.18em] uppercase">长按图片保存</span>
            <button onClick={() => setCardUrl(null)} className="text-sm">
              关闭 ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={cardUrl} alt="分享卡片" className="mx-auto w-full max-w-[420px]" />
          </div>
          <button className="btn-primary mt-3" onClick={shareCard}>
            分享 / 保存到相册
          </button>
        </div>
      )}
    </div>
  )
}

function SectionTitle({ label, en }: { label: string; en: string }) {
  return (
    <div className="mb-3 flex items-baseline justify-between border-b-[1.5px] border-ink pb-2">
      <h2 className="font-cond text-base font-bold tracking-[0.18em] uppercase">{label}</h2>
      <span className="label text-[0.55rem]">{en}</span>
    </div>
  )
}

function PartnerCard({
  label,
  code,
  tone,
  onPick,
}: {
  label: string
  code: string
  tone: 'green' | 'clay'
  onPick: (code: string) => void
}) {
  const t = TYPES[code]
  return (
    <button
      onClick={() => onPick(code)}
      className="border-[1.5px] border-ink px-3 py-3 text-left transition-colors hover:bg-paper-2"
    >
      <div className={`label mb-1 text-[0.55rem] ${tone === 'clay' ? '!text-clay' : ''}`}>{label}</div>
      <div className="font-display text-base text-green">{code}</div>
      <div className="mt-0.5 text-[0.78rem] leading-tight">{t?.name}</div>
    </button>
  )
}
