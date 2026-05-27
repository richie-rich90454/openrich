import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'OpenRichCore',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') return 'index.mjs';
        return 'index.cjs';
      },
    },
    rollupOptions: {
      external: [
        /@tiptap\//,
        /prosemirror-/,
      ],
      output: {
        globals: {},
      },
    },
    target: 'es2015',
    sourcemap: true,
    minify: false,
  },
});
