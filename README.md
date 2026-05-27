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

## License

MIT
