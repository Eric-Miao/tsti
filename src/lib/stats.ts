// 统计走同源的 /api，浏览器里不出现任何 Supabase 凭据
const CLIENT_KEY = 'tsti.client.v1'

export interface Stats {
  total: number
  counts: Record<string, number>
}

export function clientId(): string {
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

export async function fetchStats(): Promise<Stats | null> {
  try {
    const res = await fetch('/api/stats', { headers: { accept: 'application/json' } })
    if (!res.ok) return null
    const data = (await res.json()) as Stats
    if (!data || typeof data.total !== 'number') return null
    return data
  } catch {
    return null
  }
}

export async function recordResult(payload: {
  code: string
  scores: Record<string, number>
}): Promise<void> {
  try {
    await fetch('/api/record', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client: clientId(),
        code: payload.code,
        scores: payload.scores,
      }),
    })
  } catch {
    /* 统计失败不影响主流程 */
  }
}
