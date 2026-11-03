// GET /api/stats → { total, counts }
// anon key 只在服务端使用，不下发到浏览器
export const config = { runtime: 'edge' }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

export default async function handler() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return json({ total: 0, counts: {} })

  try {
    const res = await fetch(`${url}/rest/v1/rpc/tsti_stats`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: '{}',
    })
    if (!res.ok) return json({ total: 0, counts: {} })
    const data = await res.json()
    return json({ total: data?.total ?? 0, counts: data?.counts ?? {} })
  } catch {
    return json({ total: 0, counts: {} })
  }
}
