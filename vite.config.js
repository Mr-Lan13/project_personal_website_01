import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  esbuild: false,
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      react: '@esm-bundle/react/esm/react.production.min.js',
      'react-dom': '@esm-bundle/react-dom/esm/react-dom.production.min.js',
    },
  },
});
