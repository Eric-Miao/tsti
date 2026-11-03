// POST /api/record  { client, code, scores }
export const config = { runtime: 'edge' }

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })

const CODE_RE = /^[EI][BN][SF][AD]$/
const clamp = (n: unknown) => {
  const v = Number(n)
  return Number.isFinite(v) ? Math.max(0, Math.min(99, Math.floor(v))) : 0
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') return json({ ok: false }, 405)

  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_ANON_KEY
  if (!url || !key) return json({ ok: true, skipped: true })

  let body: any
  try {
    body = await req.json()
  } catch {
    return json({ ok: false }, 400)
  }

  const code = String(body?.code ?? '')
  const client = String(body?.client ?? '').slice(0, 64)
  if (!CODE_RE.test(code) || client.length < 8) return json({ ok: false }, 400)

  const s = body?.scores ?? {}

  try {
    const res = await fetch(`${url}/rest/v1/rpc/tsti_record`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_client: client,
        p_code: code,
        p_e: clamp(s.E), p_i: clamp(s.I),
        p_b: clamp(s.B), p_n: clamp(s.N),
        p_s: clamp(s.S), p_f: clamp(s.F),
        p_a: clamp(s.A), p_d: clamp(s.D),
      }),
    })
    return json({ ok: res.ok }, res.ok ? 200 : 502)
  } catch {
    return json({ ok: false }, 502)
  }
}
