import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const key = env.VITE_SUPABASE_ANON_KEY

  // 构建期拦截：VITE_ 变量会被内联进前端 bundle，
  // 只有公开 key 能出现在这里。管理令牌 / secret key 一律报错。
  if (key && !/^(eyJ|sb_publishable_)/.test(key)) {
    throw new Error(
      'VITE_SUPABASE_ANON_KEY 看起来不是公开 key。\n' +
        '只允许 anon key（eyJ...）或 publishable key（sb_publishable_...）。\n' +
        '管理令牌（sbp_...）和 secret key 绝不能出现在 VITE_ 变量里。',
    )
  }

  return {
    plugins: [react(), tailwindcss()],
  }
})
