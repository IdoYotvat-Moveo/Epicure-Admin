import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../Epicure-server/Epicure-Admin/build',
    emptyOutDir: true
  }
})
