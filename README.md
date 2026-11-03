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
- 结果通过 URL `#/r/EBSA?d=61,70,52,43` 可直接分享
- 分享卡片用 `html-to-image` 在浏览器端生成 1080×1440 PNG
- 统计（可选）用 Supabase，通过 `/api` 的 Edge Function 访问，凭据不进入浏览器

## 本地开发

```bash
npm install
npm run dev
```

默认 http://localhost:5173

## 环境变量

复制 `.env.example` 为 `.env`：

```
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_ANON_KEY=
```

这两个变量只在服务端（`api/` 下的 Edge Function）读取，不带 `VITE_` 前缀，因此不会被打进前端 bundle，Vercel 也不会报 public prefix 警告。

浏览器只请求同源的 `/api/stats` 和 `/api/record`，前端代码里没有任何 Supabase 凭据。

不填也能跑，只是页面里不显示「已有 N 人测过」这些统计。

> 本地 `npm run dev` 不启动 `/api` 函数，统计会静默关闭。要本地联调统计，用 `vercel dev`，或者直接看 Preview 部署。

## Supabase 配置

1. 新建项目，进入 SQL Editor
2. 执行 `supabase/schema.sql`
3. 把 Project URL 和 anon public key 填进 `.env`

表结构：`tsti_results`（每台设备一条，靠 `client_id` 去重）。表不直接对 anon 开放，只暴露两个函数：`tsti_stats()` 返回聚合结果，`tsti_record()` 写入自己那条。

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
  lib/stats.ts         调用 /api/stats 与 /api/record
  screens/             Landing / Quiz / Result
  components/          ShareCard / TypeArt / DimBars
api/
  stats.ts             聚合统计（Edge Function）
  record.ts            结果写入（Edge Function）
public/
  types/*.webp         16 张 1970s 丝网印刷风插图
  fonts/*.woff2        自托管字体（分享卡片需要同源字体才能嵌入）
```

## 说明

TSTI 是娱乐性质的自测工具，不构成心理测量、技术评级或教练建议。四个维度借鉴了 MBTI 的二分结构，但题目与类型描述全部围绕网球场景重新设计。
