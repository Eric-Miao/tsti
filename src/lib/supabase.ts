import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_FALLBACK } from '../config'

// 不读 import.meta.env：Vite 会把环境变量内联成字面量打进 bundle，
// 一旦有人把管理令牌填进 Vercel 的 VITE_ 变量，就会泄露到公开的 JS 里。
// Supabase 的 anon key 本来就是公开的（RLS 兜底），直接内置更安全。
const url = SUPABASE_FALLBACK.url
const anonKey = SUPABASE_FALLBACK.anonKey

export const supabaseEnabled = Boolean(url && anonKey)

let clientPromise: Promise<SupabaseClient | null> | null = null

// 按需加载 supabase-js，避免把 100KB+ 打进首屏
function getClient(): Promise<SupabaseClient | null> {
  if (!supabaseEnabled) return Promise.resolve(null)
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, anonKey),
    )
  }
  return clientPromise
}

const CLIENT_KEY = 'tsti.client.v1'

function clientId(): string {
  try {
    const existing = localStorage.getItem(CLIENT_KEY)
    if (existing) return existing
    const id =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(CLIENT_KEY, id)
    return id
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

export async function recordResult(payload: {
  code: string
  scores: Record<string, number>
}): Promise<void> {
  if (!supabaseEnabled) return
  try {
    const supabase = await getClient()
    if (!supabase) return
    await supabase.rpc('tsti_record', {
      p_client: clientId(),
      p_code: payload.code,
      p_e: payload.scores.E ?? 0,
      p_i: payload.scores.I ?? 0,
      p_b: payload.scores.B ?? 0,
      p_n: payload.scores.N ?? 0,
      p_s: payload.scores.S ?? 0,
      p_f: payload.scores.F ?? 0,
      p_a: payload.scores.A ?? 0,
      p_d: payload.scores.D ?? 0,
    })
  } catch {
    /* stats are best-effort */
  }
}

export interface Stats {
  total: number
  counts: Record<string, number>
}

export async function fetchStats(): Promise<Stats | null> {
  if (!supabaseEnabled) return null
  try {
    const supabase = await getClient()
    if (!supabase) return null
    const { data, error } = await supabase.rpc('tsti_stats')
    if (error || !data) return null
    const parsed = typeof data === 'string' ? JSON.parse(data) : data
    return { total: parsed.total ?? 0, counts: parsed.counts ?? {} }
  } catch {
    return null
  }
}
