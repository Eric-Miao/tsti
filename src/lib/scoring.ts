import { QUESTIONS, type Pole, type Dim } from '../data/questions'

export type Scores = Record<Pole, number>

export interface DimensionResult {
  dim: Dim
  left: Pole
  right: Pole
  leftCount: number
  rightCount: number
  winner: Pole
  strength: number // 0–100, 优势一方所占比例
}

export interface TstiResult {
  code: string
  scores: Scores
  dims: DimensionResult[]
}

const EMPTY: Scores = { E: 0, I: 0, B: 0, N: 0, S: 0, F: 0, A: 0, D: 0 }

const PAIRS: { dim: Dim; left: Pole; right: Pole }[] = [
  { dim: 'EI', left: 'E', right: 'I' },
  { dim: 'BN', left: 'B', right: 'N' },
  { dim: 'SF', left: 'S', right: 'F' },
  { dim: 'AD', left: 'A', right: 'D' },
]

export function score(answers: Record<number, Pole>): TstiResult {
  const scores: Scores = { ...EMPTY }

  for (const q of QUESTIONS) {
    const pole = answers[q.id]
    if (pole) scores[pole] += 1
  }

  const dims: DimensionResult[] = PAIRS.map(({ dim, left, right }) => {
    const leftCount = scores[left]
    const rightCount = scores[right]
    const total = leftCount + rightCount || 1
    const winner = leftCount >= rightCount ? left : right
    const winCount = Math.max(leftCount, rightCount)
    return { dim, left, right, leftCount, rightCount, winner, strength: Math.round((winCount / total) * 100) }
  })

  return { code: dims.map((d) => d.winner).join(''), scores, dims }
}

export function isComplete(answers: Record<number, Pole>): boolean {
  return QUESTIONS.every((q) => Boolean(answers[q.id]))
}

export function answeredCount(answers: Record<number, Pole>): number {
  return QUESTIONS.filter((q) => Boolean(answers[q.id])).length
}
