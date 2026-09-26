import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用相对路径，确保在 GitHub Pages 任意仓库子路径下均能正常加载静态资源
  base: './',
})

