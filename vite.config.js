import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
