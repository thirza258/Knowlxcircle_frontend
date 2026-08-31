import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Pinned: the backend only whitelists http://localhost:5173 for CORS, and a
    // silent fallback to 5174 when the port is busy would break every request.
    port: 5173,
    strictPort: true,
  },
})
