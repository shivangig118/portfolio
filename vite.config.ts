import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
        html2canvas: path.resolve(__dirname, 'node_modules/html2canvas-pro'),
      },
    },
    optimizeDeps: {
      include: ['html2canvas-pro'],
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
  
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
