import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  build:{
    minify:'terser',
    terserOptions:{
      compress:{
        drop_console:true,
        drop_debugger:true
      }
    }
  },
  server:
  {
    host:'0.0.0.0',
    strictPort:true,
    open:false,
    proxy:
    {
  "/funvisit":"http://localhost:3000",
    },
  }
})

