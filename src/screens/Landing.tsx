import { useEffect, useState } from 'react'
import { Ball } from '../components/Ball'
import { DimensionLegend } from '../components/DimBars'
import { getTypes } from '../data'
import { fetchStats, type Stats } from '../lib/stats'
import { useLocale } from '../i18n'
import { UI } from '../i18n/ui'

export function Landing({
  onStart,
  lastResult,
  onViewLast,
}: {
  onStart: () => void
  lastResult: string | null
  onViewLast: (code: string) => void
}) {
  const { locale, toggle } = useLocale()
  const t = UI.landing
  const types = getTypes(locale)
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    let alive = true
    fetchStats().then((s) => alive && setStats(s))
    return () => {
      alive = false
    }
  }, [])

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[600px] px-5 pb-14">
      <header className="flex items-center justify-between border-b-[1.5px] border-ink py-3.5">
        <div className="flex items-center gap-2">
          <Ball className="h-[18px] w-[18px] text-ball" />
          <span className="font-display text-[1.05rem] tracking-[0.08em]">TSTI</span>
        </div>
        <button
          onClick={toggle}
          className="label border-[1.5px] border-ink/30 px-2.5 py-1 text-[0.62rem] transition-colors hover:border-ink"
          aria-label="Switch language"
        >
          {UI.nav.langLabel[locale]}
        </button>
      </header>

      <section className="pt-9">
        <div className="label">{t.vol[locale]}</div>
        <h1
          className={`animate-fade-up mt-3 font-display leading-[0.92] tracking-[-0.01em] ${
            locale === 'zh' ? 'text-[3.3rem]' : 'text-[2.7rem]'
          }`}
        >
          {t.title1[locale]}
          <br />
          <span className="text-green">{t.title2[locale]}</span>
        </h1>
        <p className="mt-5 max-w-[21rem] whitespace-pre-line text-[0.92rem] leading-[1.75] text-ink-soft">
          {t.intro[locale]}
        </p>

        <div className="mt-7">
          <button className="btn-primary" onClick={onStart}>
            <Ball className="h-4 w-4 text-ball" />
            {t.start[locale]}
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="label text-[0.6rem]">{t.meta[locale]}</span>
          {stats && stats.total > 0 && (
            <span className="label text-[0.6rem] text-clay">
              {stats.total.toLocaleString()} {t.taken[locale]}
            </span>
          )}
        </div>

        {lastResult && types[lastResult] && (
          <button
            onClick={() => onViewLast(lastResult)}
            className="mt-5 flex w-full items-center justify-between border-[1.5px] border-ink/25 px-4 py-3 text-left transition-colors hover:border-ink"
          >
            <span className="text-[0.82rem] text-ink-soft">
              {t.lastResult[locale]}
              <span className="font-semibold text-ink">{types[lastResult].name}</span>
            </span>
            <span className="font-cond text-sm tracking-[0.1em] text-clay">{t.view[locale]}</span>
          </button>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2">
          <h2 className="font-cond text-lg font-bold tracking-[0.18em] uppercase">{t.axes[locale]}</h2>
          <span className="label text-[0.58rem]">Four Axes</span>
        </div>
        <div className="mt-4">
          <DimensionLegend />
        </div>
        <p className="mt-3 text-[0.76rem] leading-relaxed text-ink-soft">{t.axesNote[locale]}</p>
      </section>

      <section className="mt-10 border-[1.5px] border-ink bg-green p-5 text-paper">
        <div className="label text-[0.58rem] text-paper/60">{t.why[locale]}</div>
        <p className="mt-2 text-[0.9rem] leading-[1.8]">{t.whyBody[locale]}</p>
      </section>

      <footer className="mt-10 border-t-[1.5px] border-ink pt-4">
        <div className="flex items-center gap-2">
          <Ball className="h-3.5 w-3.5 text-ball" />
          <span className="font-display text-xs tracking-[0.1em]">TSTI</span>
        </div>
        <p className="mt-2 text-[0.68rem] leading-relaxed text-ink-soft">{t.disclaimer[locale]}</p>
      </footer>
    </div>
  )
}
