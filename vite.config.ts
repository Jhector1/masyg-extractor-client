import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  svgr(),],
  // css: {
  //   postcss: {},
  // },

    server: {
      host: '127.0.0.1',
      port: 3000, // Optional, default is 5173 for Vite
    },
  
})
