import path from 'path';
import { defineConfig } from 'vite';

// Vike
import vikeSolid from 'vike-solid/vite';
import vike from 'vike/plugin';

export default defineConfig({
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src'),
      dev: path.resolve(__dirname),
    },
  },
  plugins: [
    {
      name: 'Replace env variables',
      transform(code, id) {
        if (id.includes('node_modules')) {
          return code;
        }
        return code
          .replace(/process\.env\.SSR/g, 'false')
          .replace(/process\.env\.DEV/g, 'true')
          .replace(/process\.env\.PROD/g, 'false')
          .replace(/process\.env\.NODE_ENV/g, '"development"')
          .replace(/import\.meta\.env\.SSR/g, 'false')
          .replace(/import\.meta\.env\.DEV/g, 'true')
          .replace(/import\.meta\.env\.PROD/g, 'false')
          .replace(/import\.meta\.env\.NODE_ENV/g, '"development"');
      },
    },
    vike({}),
    vikeSolid(),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
