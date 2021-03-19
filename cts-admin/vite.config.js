import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8880
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, './src')
    }
  },
  build: {
    outDir: resolve(__dirname, '../cts-server/admin')
  }
})
