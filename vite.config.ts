import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // Оптимизации для PWA
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
        }
      }
    }
  },
  server: {
    headers: {
      'Service-Worker-Allowed': '/'
    }
  }
})