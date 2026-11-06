import { useEffect, useState } from 'react'
import { ALL_CODES, getTypes } from '../data'
import { useLocale } from '../i18n'
import { UI } from '../i18n/ui'
import { TypeArt } from '../components/TypeArt'
import { DimensionReadout } from '../components/DimBars'
import { Ball } from '../components/Ball'
import { fetchStats, recordResult } from '../lib/stats'
import { bestPartner, nightmare } from '../lib/pairing'

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
  const { locale, toggle } = useLocale()
  const t = UI.result
  const TYPES = getTypes(locale)
  const type = TYPES[code]
  const [cardUrl, setCardUrl] = useState<string | null>(null)
  const [cardError, setCardError] = useState(false)
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

  function makeCard() {
    setCardError(false)
    setCardUrl(`/cards/${locale === 'en' ? 'en/' : ''}${type.code}.jpg`)
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
        <div className="flex items-center gap-2">
          <span className="label text-[0.58rem]">
            {isOwn ? t.yourResult[locale] : t.typeFile[locale]}
          </span>
          <button
            onClick={toggle}
            className="label border-[1.5px] border-ink/30 px-2 py-0.5 text-[0.55rem] transition-colors hover:border-ink"
            aria-label="Switch language"
          >
            {UI.nav.langLabel[locale]}
          </button>
        </div>
      </header>

      {/* hero */}
      <section className="animate-scale-in pt-5">
        <div className="border-[1.5px] border-ink">
          <TypeArt code={type.code} className="block aspect-[2/3] w-full object-cover" />
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
              <div className="mt-1 text-[0.55rem] leading-none text-ink-soft">{t.sameType[locale]}</div>
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
          <SectionTitle label={t.axes[locale]} en="Your Axes" />
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
          <div className="label text-[0.56rem] !text-paper/60">{t.archetype[locale]}</div>
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
        <SectionTitle label={t.onCourt[locale]} en="On Court" />
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
        <SectionTitle label={t.prosCons[locale]} en="Pros & Cons" />
        <div className="grid gap-2.5">
          <div className="border-[1.5px] border-ink p-4">
            <div className="mb-2 flex items-center gap-2">
              <span className="h-2 w-2 bg-green" />
              <span className="font-cond text-sm font-bold tracking-[0.18em] uppercase">{t.weapons[locale]}</span>
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
              <span className="font-cond text-sm font-bold tracking-[0.18em] uppercase">{t.weakSpots[locale]}</span>
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
        <SectionTitle label={t.setup[locale]} en="Setup" />
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
        <SectionTitle label={t.doubles[locale]} en="Doubles" />
        <p className="text-[0.92rem] leading-relaxed text-ink-soft">{type.doubles}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <PartnerCard label={t.bestPartner[locale]} code={bestPartner(type.code)} tone="green" onPick={onPickType} />
          <PartnerCard label={t.nightmare[locale]} code={nightmare(type.code)} tone="clay" onPick={onPickType} />
        </div>
      </section>

      {/* actions */}
      <section className="mt-8 space-y-2.5">
        <button className="btn-primary" onClick={makeCard}>
          {cardError ? t.cardFailed[locale] : t.viewCard[locale]}
        </button>
        {isOwn ? (
          <button className="btn-ghost w-full" onClick={onStart}>
            {t.retake[locale]}
          </button>
        ) : (
          <button className="btn-ghost w-full" onClick={onStart}>
            {t.takeTest[locale]}
          </button>
        )}
      </section>

      {total !== null && (
        <p className="mt-4 text-center text-[0.7rem] text-ink-soft">
          {total.toLocaleString()} {t.finished[locale]}
        </p>
      )}

      {/* other types */}
      <section className="mt-10">
        <SectionTitle label={t.otherTypes[locale]} en="All Types" />
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
          {t.disclaimer[locale]}
        </p>
      </footer>


      {cardUrl && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-ink/80 p-5 backdrop-blur-sm"
          onClick={() => setCardUrl(null)}
        >
          <div className="flex items-center justify-between pb-3 text-paper">
            <span className="font-cond text-sm tracking-[0.18em] uppercase">{t.saveHint[locale]}</span>
            <button onClick={() => setCardUrl(null)} className="text-sm">
              {t.close[locale]}
            </button>
          </div>
          <div className="flex-1 overflow-auto" onClick={(e) => e.stopPropagation()}>
            <img src={cardUrl} alt="分享卡片" style={{ width: '100%', maxWidth: 420, height: 'auto', display: 'block', margin: '0 auto' }} />
          </div>
          <button className="btn-primary mt-3" onClick={shareCard}>
            {t.share[locale]}
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
  const { locale } = useLocale()
  const type = getTypes(locale)[code]
  return (
    <button
      onClick={() => onPick(code)}
      className="border-[1.5px] border-ink px-3 py-3 text-left transition-colors hover:bg-paper-2"
    >
      <div className={`label mb-1 text-[0.55rem] ${tone === 'clay' ? '!text-clay' : ''}`}>{label}</div>
      <div className="font-display text-base text-green">{code}</div>
      <div className="mt-0.5 text-[0.78rem] leading-tight">{type?.name}</div>
    </button>
  )
}
