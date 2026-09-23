import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Served from https://<user>.github.io/Hackathon---Edmundo-e-Stefanne/
export default defineConfig({
  base: '/Hackathon---Edmundo-e-Stefanne/',
  plugins: [react(), tailwindcss()],
})
