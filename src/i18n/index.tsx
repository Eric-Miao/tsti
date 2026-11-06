import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

export type Locale = 'zh' | 'en'

const STORAGE_KEY = 'tsti.locale.v1'

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'zh'
  const langs = [...(navigator.languages ?? []), navigator.language ?? '']
  return langs.some((l) => l.toLowerCase().startsWith('zh')) ? 'zh' : 'en'
}

function readStored(): Locale | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'zh' || v === 'en' ? v : null
  } catch {
    return null
  }
}

interface LocaleCtx {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
}

const Ctx = createContext<LocaleCtx>({ locale: 'zh', setLocale: () => {}, toggle: () => {} })

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => readStored() ?? detectLocale())

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      /* ignore */
    }
  }, [])

  const toggle = useCallback(() => {
    setLocale(locale === 'zh' ? 'en' : 'zh')
  }, [locale, setLocale])

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
    document.title = locale === 'zh' ? 'TSTI · 网球风格类型指标' : 'TSTI · Tennis Style Type Indicator'
  }, [locale])

  const value = useMemo(() => ({ locale, setLocale, toggle }), [locale, setLocale, toggle])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useLocale() {
  return useContext(Ctx)
}
