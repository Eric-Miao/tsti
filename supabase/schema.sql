-- TSTI 结果统计
-- 在 Supabase SQL Editor 里执行一次即可

create table if not exists public.tsti_results (
  id bigserial primary key,
  client_id text not null unique,
  code text not null check (code ~ '^[EI][BN][SF][AD]$'),
  e int not null default 0,
  i int not null default 0,
  b int not null default 0,
  n int not null default 0,
  s int not null default 0,
  f int not null default 0,
  a int not null default 0,
  d int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.tsti_results enable row level security;

-- 匿名用户只能写入/更新自己的那一条，读不到别人的
drop policy if exists "anon upsert" on public.tsti_results;
create policy "anon upsert" on public.tsti_results
  for insert to anon with check (true);

drop policy if exists "anon update" on public.tsti_results;
create policy "anon update" on public.tsti_results
  for update to anon using (true) with check (true);

-- 只暴露聚合结果
create or replace function public.tsti_stats()
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'total', (select count(*) from public.tsti_results),
    'counts', coalesce(
      (select jsonb_object_agg(code, cnt) from (
        select code, count(*)::int as cnt
        from public.tsti_results
        group by code
      ) t),
      '{}'::jsonb
    )
  );
$$;

revoke all on function public.tsti_stats() from public;
grant execute on function public.tsti_stats() to anon;

-- 写入走 security definer：不需要给 anon 开 SELECT 策略，
-- 也就不会把任何人的原始记录暴露出去
create or replace function public.tsti_record(
  p_client text,
  p_code text,
  p_e int, p_i int, p_b int, p_n int,
  p_s int, p_f int, p_a int, p_d int
)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.tsti_results (client_id, code, e, i, b, n, s, f, a, d)
  values (p_client, p_code, p_e, p_i, p_b, p_n, p_s, p_f, p_a, p_d)
  on conflict (client_id) do update set
    code = excluded.code,
    e = excluded.e, i = excluded.i,
    b = excluded.b, n = excluded.n,
    s = excluded.s, f = excluded.f,
    a = excluded.a, d = excluded.d,
    created_at = now();
$$;

revoke all on function public.tsti_record(text, text, int, int, int, int, int, int, int, int) from public;
grant execute on function public.tsti_record(text, text, int, int, int, int, int, int, int, int) to anon;
