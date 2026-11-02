import { useEffect, useState } from 'react'
import { Ball } from '../components/Ball'
import { DimensionLegend } from '../components/DimBars'
import { ALL_CODES, TYPES } from '../data/types'
import { fetchStats, type Stats } from '../lib/supabase'

export function Landing({
  onStart,
  lastResult,
  onViewLast,
  onPickType,
}: {
  onStart: () => void
  lastResult: string | null
  onViewLast: (code: string) => void
  onPickType: (code: string) => void
}) {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    let alive = true
    fetchStats().then((s) => alive && setStats(s))
    return () => {
      alive = false
    }
  }, [])

  const top = stats && stats.total > 0
    ? Object.entries(stats.counts).sort((a, b) => b[1] - a[1])[0]
    : null

  return (
    <div className="mx-auto min-h-dvh w-full max-w-[600px] px-5 pb-14">
      <header className="flex items-center justify-between border-b-[1.5px] border-ink py-3.5">
        <div className="flex items-center gap-2">
          <Ball className="h-[18px] w-[18px] text-ball" />
          <span className="font-display text-[1.05rem] tracking-[0.08em]">TSTI</span>
        </div>
        <span className="label text-[0.6rem]">Tennis Style Type Indicator</span>
      </header>

      <section className="pt-9">
        <div className="label">Vol.01 — 球场人格档案</div>
        <h1 className="animate-fade-up mt-3 font-display text-[3.3rem] leading-[0.92] tracking-[-0.01em]">
          你是哪种
          <br />
          <span className="text-green">网球</span>人
        </h1>
        <p className="mt-5 max-w-[19rem] text-[0.92rem] leading-[1.75] text-ink-soft">
          28 道题，4 个维度，16 种网球人格。
          <br />
          不测你的水平，只测你是怎么打球的。
        </p>

        <div className="mt-7">
          <button className="btn-primary" onClick={onStart}>
            <Ball className="h-4 w-4 text-ball" />
            开始测试
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <span className="label text-[0.6rem]">28 题 · 约 4 分钟 · 无需注册</span>
          {stats && stats.total > 0 && (
            <span className="label text-[0.6rem] text-clay">
              已有 {stats.total.toLocaleString()} 人测过
            </span>
          )}
        </div>

        {lastResult && (
          <button
            onClick={() => onViewLast(lastResult)}
            className="mt-5 flex w-full items-center justify-between border-[1.5px] border-ink/25 px-4 py-3 text-left transition-colors hover:border-ink"
          >
            <span className="text-[0.82rem] text-ink-soft">
              你上次的结果：<span className="font-semibold text-ink">{TYPES[lastResult]?.name}</span>
            </span>
            <span className="font-cond text-sm tracking-[0.1em] text-clay">查看 →</span>
          </button>
        )}
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2">
          <h2 className="font-cond text-lg font-bold tracking-[0.18em] uppercase">四个维度</h2>
          <span className="label text-[0.58rem]">Four Axes</span>
        </div>
        <div className="mt-4">
          <DimensionLegend />
        </div>
        <p className="mt-3 text-[0.76rem] leading-relaxed text-ink-soft">
          每一维都是二选一，没有对错。四个维度组合出 2⁴ = 16 种类型。
        </p>
      </section>

      <section className="mt-10">
        <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2">
          <h2 className="font-cond text-lg font-bold tracking-[0.18em] uppercase">十六种型号</h2>
          <span className="label text-[0.58rem]">16 Types</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-px bg-ink/15">
          {ALL_CODES.map((code) => {
            const t = TYPES[code]
            return (
              <button
                key={code}
                onClick={() => onPickType(code)}
                className="group bg-paper px-3 py-3 text-left transition-colors hover:bg-paper-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-[1.05rem] tracking-[0.04em] text-green group-hover:text-clay">
                    {code}
                  </span>
                  <span className="text-[0.6rem] text-ink/25">→</span>
                </div>
                <div className="mt-0.5 text-[0.82rem] font-medium">{t.name}</div>
              </button>
            )
          })}
        </div>

        {top && (
          <p className="mt-3 text-[0.72rem] text-ink-soft">
            目前最多人测出的是
            <span className="mx-1 font-semibold text-ink">
              {top[0]} {TYPES[top[0]]?.name}
            </span>
            ，占 {Math.round((top[1] / stats!.total) * 100)}%。
          </p>
        )}
      </section>

      <section className="mt-10 border-[1.5px] border-ink bg-green p-5 text-paper">
        <div className="label text-[0.58rem] text-paper/60">Why 16</div>
        <p className="mt-2 text-[0.9rem] leading-[1.8]">
          网球最容易被简化成“进攻型”和“防守型”两种。
          但真正决定你像谁的，还有你站在哪、球怎么飞，以及你在场上藏不藏得住情绪。
          四个维度拆开，才有 16 种可以认领的答案。
        </p>
      </section>

      <footer className="mt-10 border-t-[1.5px] border-ink pt-4">
        <div className="flex items-center gap-2">
          <Ball className="h-3.5 w-3.5 text-ball" />
          <span className="font-display text-xs tracking-[0.1em]">TSTI</span>
        </div>
        <p className="mt-2 text-[0.68rem] leading-relaxed text-ink-soft">
          TSTI 是一个娱乐性质的自测工具，不构成心理测量、技术评级或教练建议。
          它只描述你打球的倾向，与你的球技无关。
        </p>
      </footer>
    </div>
  )
}
