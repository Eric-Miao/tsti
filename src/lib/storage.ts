import type { Pole } from '../data/questions'

const KEY = 'tsti.answers.v1'
const RESULT_KEY = 'tsti.lastResult.v1'

export function loadAnswers(): Record<number, Pole> {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Record<number, Pole>) : {}
  } catch {
    return {}
  }
}

export function saveAnswers(answers: Record<number, Pole>) {
  try {
    localStorage.setItem(KEY, JSON.stringify(answers))
  } catch {
    /* ignore */
  }
}

export function clearAnswers() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
}

export function saveLastResult(code: string) {
  try {
    localStorage.setItem(RESULT_KEY, code)
  } catch {
    /* ignore */
  }
}

export function loadLastResult(): string | null {
  try {
    return localStorage.getItem(RESULT_KEY)
  } catch {
    return null
  }
}
