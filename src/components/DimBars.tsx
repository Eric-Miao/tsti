import { DIMENSIONS } from '../data/questions'
import type { DimensionResult } from '../lib/scoring'

export function DimensionReadout({ dim }: { dim: DimensionResult }) {
  const meta = DIMENSIONS[dim.dim]
  const leftPct = Math.round((dim.leftCount / (dim.leftCount + dim.rightCount || 1)) * 100)
  const leftWins = dim.winner === dim.left

  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span
          className={`font-cond text-[0.95rem] tracking-[0.14em] uppercase ${
            leftWins ? 'font-bold text-ink' : 'text-ink/35'
          }`}
        >
          {dim.left} {meta.leftLabel}
        </span>
        <span className="label shrink-0 text-[0.65rem]">{meta.name}</span>
        <span
          className={`font-cond text-[0.95rem] tracking-[0.14em] uppercase ${
            !leftWins ? 'font-bold text-ink' : 'text-ink/35'
          }`}
        >
          {dim.right} {meta.rightLabel}
        </span>
      </div>

      <div className="relative h-[7px] w-full bg-paper-3">
        <div
          className="absolute inset-y-0 left-0 bg-green"
          style={{ width: `${leftPct}%` }}
        />
        <div className="absolute inset-y-0 left-1/2 w-px bg-ink/40" />
      </div>

      <div className="mt-1 flex justify-between">
        <span className={`font-cond text-xs ${leftWins ? 'text-ink' : 'text-ink/35'}`}>
          {dim.leftCount}
        </span>
        <span className="font-cond text-xs font-bold text-clay">{dim.strength}%</span>
        <span className={`font-cond text-xs ${!leftWins ? 'text-ink' : 'text-ink/35'}`}>
          {dim.rightCount}
        </span>
      </div>
    </div>
  )
}

export function DimensionLegend() {
  return (
    <div className="grid grid-cols-2 gap-px bg-ink/15">
      {Object.entries(DIMENSIONS).map(([key, d]) => (
        <div key={key} className="bg-paper p-3.5">
          <div className="label mb-1.5 text-[0.6rem]">{d.name}</div>
          <div className="flex items-center gap-1.5">
            <span className="font-display text-lg leading-none text-green">{d.left}</span>
            <span className="text-[0.72rem] text-ink-soft">{d.leftLabel}</span>
            <span className="text-[0.7rem] text-ink/30">/</span>
            <span className="font-display text-lg leading-none text-clay">{d.right}</span>
            <span className="text-[0.72rem] text-ink-soft">{d.rightLabel}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
