import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  svgr(),],
  // css: {
  //   postcsbs: {},
  // },

    server: {
      host: process.env.VITE_CLIENT,
      port: Number(process.env.VITE_CLIENT_PORT || 3000), // Optional, default is 5173 for Vite
    },
  
})
