import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // THis is the configuration for localhost:3000
  server:{
    proxy:{
      // it says wheneve the url in code starts with /api you should direct it using this configuration
      '/api':{
        target: 'http://localhost:3000'
      },
      '/images':{
        target: 'http://localhost:3000'
      }
    }
  },
  build:{
    outDir: '../ecommerce-backend-ai-main/dist'
  }
})
