import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: './',
  esbuild: false,
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  build: {
    minify: false,
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        projects: fileURLToPath(new URL('./projects.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      react: '@esm-bundle/react/esm/react.production.min.js',
      'react-dom': '@esm-bundle/react-dom/esm/react-dom.production.min.js',
    },
  },
});
