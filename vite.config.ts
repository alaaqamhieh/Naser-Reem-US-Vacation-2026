import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Local-first welcome site. No backend, no external calls.
export default defineConfig({
  plugins: [react()],
  base: './',
})
