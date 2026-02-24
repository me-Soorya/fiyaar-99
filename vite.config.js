import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/fiyaar-99/', // Replace 'fiyaar-99' with your actual GitHub repo name
})
