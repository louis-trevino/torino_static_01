import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Relative base so the build works on a GitHub Pages project URL
// (https://<user>.github.io/<repo>/) as well as on a custom domain.
export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        privacy: resolve(import.meta.dirname, 'privacy.html'),
      },
    },
  },
})
