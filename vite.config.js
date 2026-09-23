import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Base relativo ('./') funciona tanto no Vercel (raiz) quanto no GitHub Pages
// (subpasta), sem precisar trocar a config por ambiente.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
})
