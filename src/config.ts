export const SITE = {
  /** 线上地址，部署后改这里，分享卡片和页面里都会同步 */
  url: 'tsti-two.vercel.app',
  /** 作者署名 */
  handle: '@Eric-Miao',
  title: 'TSTI',
  subtitle: 'Tennis Style Type Indicator',
}

/**
 * anon key 只从环境变量读取，不进仓库。
 * 本地开发放 .env，线上放 Vercel 的 Environment Variables。
 * 值本身是公开的（会打进前端 bundle），但轮换时不该在 git 里留副本。
 */
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

/** 只认 JWT 形态（eyJ...）和新版 publishable key */
export function looksLikePublicKey(key?: string): boolean {
  if (!key) return false
  return key.startsWith('eyJ') || key.startsWith('sb_publishable_')
}
