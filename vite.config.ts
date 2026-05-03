import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // This must match your GitHub repository name exactly
  base: '/Attendance-Tracker/', 
  plugins: [react()],
})
