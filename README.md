# OpenRich

A universal rich-text editor monorepo — framework-agnostic core with bindings for React, Vue, Svelte, Solid, and vanilla JS.

## Packages

| Package | Description |
|---------|-------------|
| `@openrich/core` | Headless editor engine (TipTap/ProseMirror) |
| `@openrich/react` | React `<Editor>` component |
| `@openrich/vue` | Vue 3 `<Editor>` component |
| `@openrich/svelte` | Svelte 5 `<Editor>` component |
| `@openrich/solid` | SolidJS `<Editor>` component |
| `@openrich/vanilla` | Imperative `mount()` / `unmount()` |
| `@openrich/extensions` | Tree-shakable nodes, marks, and plugins |
| `@openrich/starter-kit` | Convenience bundle of all extensions |
| `@openrich/ssr-utils` | SSR utilities (`renderStatic`, `isClient`) |

## Quick Start

```bash
npm install @openrich/core@latest @openrich/react@latest
npm install @openrich/extensions@latest
```

```tsx
import { Editor } from '@openrich/react';
import { StarterKit } from '@openrich/starter-kit';

function App() {
  return (
    <Editor
      content="<p>Hello, OpenRich!</p>"
      extensions={[StarterKit]}
      theme="system"
    />
  );
}
```

## Features

- **Framework-agnostic core** — use with React, Vue, Svelte, Solid, or vanilla
- **Tree-shakable extensions** — only bundle what you use
- **SSR-safe** — `renderStatic()` for server rendering, client hydration
- **Theme** — light / dark / system (auto-detects `prefers-color-scheme`)
- **i18n** — 11 built-in locales with RTL/LTR auto-detection
- **Cold design** — neutral grays, CSS variables, no glassmorphism
- **Dual CJS/ESM** — each package ships both `.cjs` and `.mjs`

## Playground

```bash
git clone https://github.com/your-org/openrich.git
cd openrich
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Development

```bash
# Build all packages
npm run build

# Type-check all packages
npm run typecheck

# Lint all packages
npm run lint
```

## Publishing

All `@openrich/*` packages are versioned together using Changesets.

### Stable release

```bash
# Create a changeset (interactive)
npm run changeset

# Apply changesets and bump versions
npm run version-packages

# Build and publish all packages to npm
npm run release
```

### Prerelease (e.g., `1.0.0-next.1`)

```bash
# Enter prerelease mode
npm run prerelease next

# Create a changeset
npm run changeset

# Bump to prerelease versions
npm run version-packages

# Build and publish with the `next` dist-tag
npm run release

# When ready for stable, exit prerelease mode
npx changeset pre exit
```

All packages publish with `@latest` dist-tag by default. Prereleases use the `next` dist-tag, so users install them via `npm install @openrich/core@next`.

## License

MIT
