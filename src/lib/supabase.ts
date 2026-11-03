import type { SupabaseClient } from '@supabase/supabase-js'
import { SUPABASE_FALLBACK, looksLikePublicKey } from '../config'

const envUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

const url = envUrl && envUrl.includes('.supabase.co') ? envUrl : SUPABASE_FALLBACK.url

// 环境变量填错（例如误填了管理令牌）时回退到内置的 anon key，避免把敏感 key 打进前端
if (envKey && !looksLikePublicKey(envKey)) {
  console.warn('[TSTI] VITE_SUPABASE_ANON_KEY 不是合法的公开 key，已回退到内置配置')
}
const anonKey = looksLikePublicKey(envKey) ? envKey! : SUPABASE_FALLBACK.anonKey

export const supabaseEnabled = Boolean(url && anonKey)

let clientPromise: Promise<SupabaseClient | null> | null = null

// 按需加载 supabase-js，避免把 100KB+ 打进首屏
function getClient(): Promise<SupabaseClient | null> {
  if (!supabaseEnabled) return Promise.resolve(null)
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url!, anonKey!),
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
    await supabase.from('tsti_results').upsert(
      {
        client_id: clientId(),
        code: payload.code,
        e: payload.scores.E ?? 0,
        i: payload.scores.I ?? 0,
        b: payload.scores.B ?? 0,
        n: payload.scores.N ?? 0,
        s: payload.scores.S ?? 0,
        f: payload.scores.F ?? 0,
        a: payload.scores.A ?? 0,
        d: payload.scores.D ?? 0,
      },
      { onConflict: 'client_id' },
    )
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
