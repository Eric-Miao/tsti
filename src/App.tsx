import { useCallback, useEffect, useState } from 'react'
import { Landing } from './screens/Landing'
import { Quiz } from './screens/Quiz'
import { Result } from './screens/Result'
import { loadAnswers, saveAnswers, loadLastResult, saveLastResult } from './lib/storage'
import { score, type TstiResult } from './lib/scoring'
import type { Pole } from './data/questions'
import { ALL_CODES, getQuestions } from './data'
import { LocaleProvider, useLocale } from './i18n'

type Route =
  | { name: 'landing' }
  | { name: 'quiz' }
  | { name: 'result'; code: string; dims?: number[][] }

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#\/?/, '')
  const [path, query] = raw.split('?')

  if (path === 'q') return { name: 'quiz' }

  if (path.startsWith('r/')) {
    const code = path.slice(2).toUpperCase()
    if (ALL_CODES.includes(code)) {
      const dimsParam = new URLSearchParams(query ?? '').get('d')
      const dims = dimsParam
        ? dimsParam.split(',').map((chunk) => chunk.split('').map((n) => Number(n)))
        : undefined
      return { name: 'result', code, dims }
    }
  }

  return { name: 'landing' }
}

function toHash(route: Route): string {
  if (route.name === 'quiz') return '#/q'
  if (route.name === 'result') {
    const d = route.dims ? `?d=${route.dims.map(([l, r]) => `${l}${r}`).join(',')}` : ''
    return `#/r/${route.code}${d}`
  }
  return '#/'
}

function AppInner() {
  const { locale } = useLocale()
  const [route, setRoute] = useState<Route>(() => parseHash())
  const [answers, setAnswers] = useState<Record<number, Pole>>(() => loadAnswers())

  useEffect(() => {
    const onHash = () => setRoute(parseHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const navigate = useCallback((next: Route) => {
    window.location.hash = toHash(next)
    setRoute(next)
  }, [])

  const handleAnswer = useCallback((questionId: number, pole: Pole) => {
    setAnswers((prev) => {
      const updated = { ...prev, [questionId]: pole }
      saveAnswers(updated)
      return updated
    })
  }, [])

  const handleComplete = useCallback(
    (all: Record<number, Pole>): TstiResult => {
      const result = score(all, getQuestions(locale))
      saveLastResult(result.code)
      navigate({
        name: 'result',
        code: result.code,
        dims: result.dims.map((d) => [d.leftCount, d.rightCount]),
      })
      return result
    },
    [navigate, locale],
  )

  if (route.name === 'quiz') {
    return (
      <Quiz
        answers={answers}
        onAnswer={handleAnswer}
        onComplete={handleComplete}
        onExit={() => navigate({ name: 'landing' })}
        onRestart={() => {
          setAnswers({})
          saveAnswers({})
        }}
      />
    )
  }

  if (route.name === 'result') {
    const stored = loadLastResult()
    const isOwn = stored === route.code && Boolean(route.dims)
    return (
      <Result
        code={route.code}
        dims={route.dims}
        isOwn={isOwn}
        onStart={() => navigate({ name: 'quiz' })}
        onHome={() => navigate({ name: 'landing' })}
        onPickType={(code) => navigate({ name: 'result', code })}
      />
    )
  }

  return (
    <Landing
      onStart={() => navigate({ name: 'quiz' })}
      lastResult={loadLastResult()}
      onViewLast={(code) => navigate({ name: 'result', code })}
    />
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <AppInner />
    </LocaleProvider>
  )
}
