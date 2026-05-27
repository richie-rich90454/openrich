import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'OpenRichSolid',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        return 'index.cjs';
      },
    },
    rollupOptions: {
      external: [
        /@openrich\//,
        'solid-js',
      ],
      output: {
        globals: {
          'solid-js': 'Solid',
        },
      },
    },
    target: 'es2015',
    sourcemap: true,
    minify: false,
  },
});
