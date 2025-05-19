import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  resolve: {
    alias: {
      'jquery': 'jquery/dist/jquery.js',
      'moment': 'moment/moment.js'
    }
  },
  optimizeDeps: {
    include: ['jquery', 'moment', 'bootstrap-daterangepicker']
  }
})
