import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import json from '@rollup/plugin-json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), json()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src/'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components'),
      },
      {
        find: '@containers',
        replacement: path.resolve(__dirname, 'src/containers'),
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles'),
      },
    ],
  },
  build: {
    rollupOptions: {
      onwarn: (warning, warn) => {
        console.log(warning); // Add this line to inspect the warning object

        // Check the warning message and ignore if it matches your case
        if (
          warning.message.includes(
            'you need plugins to import files that are not JavaScript',
          )
        ) {
          return;
        }
        // Otherwise pass it along
        warn(warning);
      },
    },
  },
});
