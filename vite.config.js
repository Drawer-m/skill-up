import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path for production
  base: '/',
  // Configure server for development
  server: {
    port: 3000,
    open: true,
  },
  // Configure build options
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Improve chunk size
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          mui: ['@mui/material', '@mui/icons-material']
        }
      }
    }
  }
})
