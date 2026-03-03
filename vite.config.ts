import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 6006,
    strictPort: false,
  },
  build: {
    target: 'es2020',
    sourcemap: true,
  },
});

