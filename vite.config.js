import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ts-calculator/',
  optimizeDeps: {
    include: ['monaco-editor']
  }
});
