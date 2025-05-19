import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allow access from local network
    proxy: {
      '/api': {
        target: 'http://192.168.0.41:5000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
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
