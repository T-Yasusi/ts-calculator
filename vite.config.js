import { defineConfig } from 'vite';

export default defineConfig({
  build: {
      target: 'esnext', 
  },
  base: '/ts-calculator/',
  optimizeDeps: {
    include: ['monaco-editor']
  }
});
