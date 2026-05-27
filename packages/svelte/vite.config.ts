import { defineConfig } from 'vite';
import { resolve } from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenRichSvelte',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        return 'index.cjs';
      },
    },
    rollupOptions: {
      external: [
        /@openrich\//,
        'svelte',
        'svelte/internal',
      ],
      output: {
        globals: {
          svelte: 'Svelte',
        },
      },
    },
    target: 'es2015',
    sourcemap: true,
    minify: false,
  },
});
