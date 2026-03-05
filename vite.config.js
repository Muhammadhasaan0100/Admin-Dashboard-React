import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
  base: "/Admin-Dashboard-React/",
=======
  base: '/Admin-Dashboard-React/',
  plugins: [react(),tailwindcss()],
>>>>>>> f6b213adaaa14703dbaa056854b59d76adce6ac5
})
