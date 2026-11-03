export const SITE = {
  /** 线上地址，部署后改这里，分享卡片和页面里都会同步 */
  url: 'tsti-two.vercel.app',
  /** 作者署名 */
  handle: '@Eric-Miao',
  title: 'TSTI',
  subtitle: 'Tennis Style Type Indicator',
}

/**
 * Supabase 默认配置。
 * anon key 是设计上就公开的（RLS 会挡住越权读取），所以直接内置；
 * 环境变量里如果填了合法的 key 会优先生效。
 */
export const SUPABASE_FALLBACK = {
  url: 'https://mjkepegxfhsxghdhjjiz.supabase.co',
  anonKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qa2VwZWd4ZmhzeGdoZGhqaml6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM2MzYzNTgsImV4cCI6MjEwOTIxMjM1OH0.c2a0oAKeqMQMrpoGDhxajqoiTb5QpvnrDecy0m9CQWc',
}

/** 只有 JWT 形态（eyJ...）或新版 publishable key 才认，防止把管理令牌打进前端 */
export function looksLikePublicKey(key?: string): boolean {
  if (!key) return false
  return key.startsWith('eyJ') || key.startsWith('sb_publishable_')
}
