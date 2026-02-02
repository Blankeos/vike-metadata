import * as path from 'path';
import { defineConfig } from 'vite';

import vue from '@vitejs/plugin-vue';
import vike from 'vike/plugin';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../packages/vue/src'),
    },
  },
  plugins: [vike(), vue()],
  server: { port: 3000 },
  preview: { port: 3000 },
});
