-- 演示用假数据：让首页的「已有 N 人测过」看起来有人气
--
-- ⚠️ 这不是真实用户。发版前想清掉就跑：
--     delete from public.tsti_results;
--
-- 用法：Supabase SQL Editor 里整段执行。改下面的 1200 就改总量。

with gen as (
  select
    (array['E','I'])[1 + floor(random() * 2)::int] as l1,
    (array['B','N'])[1 + floor(random() * 2)::int] as l2,
    (array['S','F'])[1 + floor(random() * 2)::int] as l3,
    (array['A','D'])[1 + floor(random() * 2)::int] as l4,
    (4 + floor(random() * 4))::int as w1,
    (4 + floor(random() * 4))::int as w2,
    (4 + floor(random() * 4))::int as w3,
    (4 + floor(random() * 4))::int as w4
  from generate_series(1, 1200)
)
insert into public.tsti_results (client_id, code, e, i, b, n, s, f, a, d, created_at)
select
  gen_random_uuid()::text,
  l1 || l2 || l3 || l4,
  case when l1 = 'E' then w1 else 7 - w1 end,
  case when l1 = 'E' then 7 - w1 else w1 end,
  case when l2 = 'B' then w2 else 7 - w2 end,
  case when l2 = 'B' then 7 - w2 else w2 end,
  case when l3 = 'S' then w3 else 7 - w3 end,
  case when l3 = 'S' then 7 - w3 else w3 end,
  case when l4 = 'A' then w4 else 7 - w4 end,
  case when l4 = 'A' then 7 - w4 else w4 end,
  now() - (random() * interval '45 days')
from gen;
