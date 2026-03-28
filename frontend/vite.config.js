// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://assignmentt-self.vercel.app',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});