import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

// Longest-matching-prefix aliases so that
//   '@openrich/core/src/theme/variables.css' is captured before '@openrich/core'
function alias(): Record<string, string> {
  const root = __dirname;
  return {
    // Specific sub‑path imports must come before the bare package alias
    '@openrich/core/src/theme/variables.css': resolve(root, 'packages/core/src/theme/variables.css'),

    // Bare package aliases (alphabetical)
    '@openrich/core': resolve(root, 'packages/core/src'),
    '@openrich/react': resolve(root, 'packages/react/src'),
    '@openrich/vue': resolve(root, 'packages/vue/src'),
    '@openrich/svelte': resolve(root, 'packages/svelte/src'),
    '@openrich/solid': resolve(root, 'packages/solid/src'),
    '@openrich/vanilla': resolve(root, 'packages/vanilla/src'),
    '@openrich/extensions': resolve(root, 'packages/extensions/src'),
    '@openrich/starter-kit': resolve(root, 'packages/extensions-starter-kit/src'),
    '@openrich/ssr-utils': resolve(root, 'packages/ssr-utils/src'),
  };
}

export default defineConfig({
  resolve: {
    alias: alias(),
  },
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['packages/*/src/**/*.test.{ts,tsx}'],
    exclude: ['node_modules'],
  },
});
