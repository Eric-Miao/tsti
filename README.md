# TSTI · 网球风格类型指标

Tennis Style Type Indicator —— 28 道题，4 个维度，16 种网球人格。

## 四个维度

| 维度 | 两极 | 判据 |
| --- | --- | --- |
| 比赛气质 | **E** 外放 / **I** 内敛 | 得分失分写不写在脸上 |
| 主场位置 | **B** 底线 / **N** 网前 | 默认站在哪，脚往哪走 |
| 击球质感 | **S** 上旋 / **F** 平击 | 要安全边际还是穿透力 |
| 比赛取向 | **A** 进攻 / **D** 防守 | 分数是抢来的还是等来的 |

2⁴ = 16 型，例如 `EBSA` 底线机关枪、`IBSD` 底线沉默大魔王、`INFA` 网前冷面刺客。

## 技术栈

- Vite + React 19 + TypeScript + Tailwind CSS v4
- 纯前端，无后端依赖；结果通过 URL `#/r/EBSA?d=61,70,52,43` 可直接分享
- 分享卡片用 `html-to-image` 在浏览器端生成 1080×1440 PNG
- 统计（可选）用 Supabase：匿名只写不读，只暴露聚合结果

## 本地开发

```bash
npm install
npm run dev
```

默认 http://localhost:5173

## 环境变量

复制 `.env.example` 为 `.env`：

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=
```

只放**公开 key**（anon key `eyJ...` 或 publishable key `sb_publishable_...`）。这些值会被打进前端 bundle，靠 RLS 兜底，本来就是公开的。

不要放管理令牌（`sbp_...`）或 service_role / secret key。`vite.config.ts` 会在构建期直接报错拦下来。

不填也能跑，只是页面里不显示「已有 N 人测过」「X% 同型」这些统计。

## Supabase 配置

1. 新建项目，进入 SQL Editor
2. 执行 `supabase/schema.sql`
3. 把 Project URL 和 anon public key 填进 `.env`

表结构：`tsti_results`（每台设备一条，靠 `client_id` 去重）。RLS 只允许 anon 写入和更新，读取只能通过 `tsti_stats()` 这个聚合函数。

## 构建与部署

```bash
npm run build
npm run preview
```

Vercel：

```bash
npx vercel --prod
```

`vercel.json` 已配置 SPA rewrite，并把 `/fonts`、`/types` 设成永久缓存。

## 目录

```
src/
  data/questions.ts    28 道题 + 维度定义
  data/types.ts        16 型完整文案（画像/优劣势/装备/双打/训练）
  lib/scoring.ts       计分与四维偏好强度
  lib/storage.ts       答题断点续存
  lib/supabase.ts      结果上报 + 聚合统计
  screens/             Landing / Quiz / Result
  components/          ShareCard / TypeArt / DimBars
public/
  types/*.webp         16 张 1970s 丝网印刷风插图
  fonts/*.woff2        自托管字体（分享卡片需要同源字体才能嵌入）
```

## 说明

TSTI 是娱乐性质的自测工具，不构成心理测量、技术评级或教练建议。四个维度借鉴了 MBTI 的二分结构，但题目与类型描述全部围绕网球场景重新设计。
