import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(root, 'index.html'),
        personal: resolve(root, 'personal.html'),
        achievements: resolve(root, 'achievements.html'),
        parents: resolve(root, 'parents.html'),
        surprise: resolve(root, 'surprise.html')
      }
    }
  }
});
