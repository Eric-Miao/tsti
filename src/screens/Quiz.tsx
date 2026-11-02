import { useCallback, useEffect, useMemo, useState } from 'react'
import { QUESTIONS, type Pole } from '../data/questions'
import { answeredCount, isComplete, type TstiResult } from '../lib/scoring'

const ORDER = [...QUESTIONS].sort((a, b) => ((a.id * 7919) % 101) - ((b.id * 7919) % 101))

export function Quiz({
  answers,
  onAnswer,
  onComplete,
  onExit,
  onRestart,
}: {
  answers: Record<number, Pole>
  onAnswer: (questionId: number, pole: Pole) => void
  onComplete: (answers: Record<number, Pole>) => TstiResult
  onExit: () => void
  onRestart: () => void
}) {
  const firstUnanswered = useMemo(() => {
    const idx = ORDER.findIndex((q) => !answers[q.id])
    return idx === -1 ? 0 : idx
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [index, setIndex] = useState(firstUnanswered)
  const [leaving, setLeaving] = useState(false)

  const question = ORDER[index]
  const total = ORDER.length
  const done = answeredCount(answers)

  const advance = useCallback(
    (nextAnswers: Record<number, Pole>) => {
      if (index + 1 >= total) {
        if (isComplete(nextAnswers)) onComplete(nextAnswers)
        else {
          const next = ORDER.findIndex((q) => !nextAnswers[q.id])
          setIndex(next === -1 ? 0 : next)
        }
        return
      }
      setIndex((i) => i + 1)
    },
    [index, total, onComplete],
  )

  const pick = useCallback(
    (pole: Pole) => {
      if (leaving) return
      const nextAnswers = { ...answers, [question.id]: pole }
      onAnswer(question.id, pole)
      setLeaving(true)
      window.setTimeout(() => {
        setLeaving(false)
        advance(nextAnswers)
      }, 170)
    },
    [answers, question, onAnswer, advance, leaving],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '1' || e.key === 'a' || e.key === 'A') pick(question.a.pole)
      if (e.key === '2' || e.key === 'b' || e.key === 'B') pick(question.b.pole)
      if (e.key === 'ArrowLeft') setIndex((i) => Math.max(0, i - 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pick, question])

  const pct = Math.round((done / total) * 100)

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[600px] flex-col px-5 pb-8">
      <header className="flex items-center justify-between border-b-[1.5px] border-ink py-3.5">
        <button
          onClick={() => (index === 0 ? onExit() : setIndex((i) => i - 1))}
          className="font-cond text-sm tracking-[0.14em] text-ink-soft uppercase transition-colors hover:text-ink"
        >
          ← 上一步
        </button>
        <span className="font-cond text-sm font-bold tracking-[0.16em]">
          {String(index + 1).padStart(2, '0')}
          <span className="text-ink/35"> / {total}</span>
        </span>
      </header>

      <div className="mt-4 h-[6px] w-full bg-paper-3">
        <div
          className="h-full bg-clay transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div key={question.id} className={`flex flex-1 flex-col ${leaving ? 'opacity-0' : 'animate-fade-up'}`}>
        <div className="flex flex-1 flex-col justify-center py-8">
          <div>
            <div className="label">Q{String(index + 1).padStart(2, '0')}</div>
            <h2 className="mt-2.5 text-[1.5rem] leading-[1.45] font-semibold tracking-[-0.01em]">
              {question.scene}
            </h2>
          </div>

          <div className="mt-9 flex flex-col gap-2.5">
            <OptionButton label="A" text={question.a.text} onClick={() => pick(question.a.pole)} />
            <OptionButton label="B" text={question.b.text} onClick={() => pick(question.b.pole)} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-[0.7rem] leading-relaxed text-ink-soft/70">
            凭第一反应选，别想“应该”怎么打。
          </p>
          <button onClick={onRestart} className="label text-[0.6rem] underline decoration-ink/30 underline-offset-4">
            重新开始
          </button>
        </div>
      </div>
    </div>
  )
}

function OptionButton({
  label,
  text,
  onClick,
}: {
  label: string
  text: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="group flex w-full items-start gap-3.5 border-[1.5px] border-ink bg-paper px-4 py-4 text-left transition-all active:translate-y-[1px] active:bg-paper-2"
    >
      <span className="mt-[2px] flex h-6 w-6 shrink-0 items-center justify-center border-[1.5px] border-ink font-cond text-[0.8rem] font-bold transition-colors group-hover:bg-green group-hover:text-paper">
        {label}
      </span>
      <span className="text-[0.98rem] leading-[1.55]">{text}</span>
    </button>
  )
}
