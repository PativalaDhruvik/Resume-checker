import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves from /Resume-checker/ — base must match repo name
  base: mode === 'production' || process.env.NODE_ENV === 'production' ? '/Resume-checker/' : '/',
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
}));
