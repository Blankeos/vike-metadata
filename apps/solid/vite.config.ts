import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import vike from 'vike/plugin';
import vikeSolid from 'vike-solid/vite';

export default defineConfig({
  plugins: [tsconfigPaths(), vike(), vikeSolid()],
  resolve: {
    conditions: ['browser', 'development', 'module', 'import'],
  },
  optimizeDeps: {
    esbuildOptions: {
      conditions: ['browser', 'development', 'module', 'import'],
    },
  },
  server: { port: 3000 },
  preview: { port: 3000 },
});
