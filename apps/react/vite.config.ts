import * as path from 'path';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../../packages/react/src'),
    },
  },
  plugins: [vike(), react()],
  server: { port: 3000 },
  preview: { port: 3000 },
});
