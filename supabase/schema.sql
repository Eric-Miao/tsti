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

-- 只走函数，不直接开表权限：
-- 前端的 anon key 是公开的，能做的事越少越好。
alter table public.tsti_results enable row level security;
revoke all on public.tsti_results from anon, authenticated;
drop policy if exists "anon upsert" on public.tsti_results;
drop policy if exists "anon update" on public.tsti_results;

-- 聚合统计：只返回总数和每个类型的计数，不暴露任何单条记录
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

-- 写入：同一台设备覆盖自己那条，不新增
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
