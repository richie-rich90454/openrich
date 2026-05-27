# OpenRich

A universal rich-text editor monorepo — framework-agnostic core with bindings for React, Vue, Svelte, Solid, and vanilla JS.

## Packages

| Package                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `@openrich/core`        | Headless editor engine (TipTap/ProseMirror) |
| `@openrich/react`       | React `<OpenRichEditor>` component          |
| `@openrich/vue`         | Vue 3 `<OpenRichEditor>` component          |
| `@openrich/svelte`      | Svelte 5 `<OpenRichEditor>` component       |
| `@openrich/solid`       | SolidJS `<OpenRichEditor>` component        |
| `@openrich/vanilla`     | Imperative `mount()` / `unmount()`          |
| `@openrich/extensions`  | Tree-shakable nodes, marks, and plugins     |
| `@openrich/starter-kit` | Convenience bundle of all extensions        |
| `@openrich/ssr-utils`   | SSR utilities (`renderStatic`, `isClient`)  |

## Quick Start

```bash
npm install @openrich/core@latest @openrich/react@latest
npm install @openrich/extensions@latest
```

```tsx
import { OpenRichEditor } from "@openrich/react";
import { StarterKit } from "@openrich/starter-kit";

function App() {
    return (
        <OpenRichEditor
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

### Token setup (two options)

The token is **scope-restricted by npm** — it only has permissions for `@openrich/*` packages. Publishing non-@openrich packages with it will get rejected, not accidentally published. Choose either:

**Option A: Global (simple)** — writes to `~/.npmrc`, available to all projects but harmless outside this one:

```powershell
npm config set //registry.npmjs.org/:_authToken=npm_xxx --location=user
```

**Option B: Project-local (isolated)** — uses an env var that only this project sees:

```powershell
$env:NPM_TOKEN="npm_xxx"; npm run publish:prerelease
```

The `release` script can be updated to read `$env:NPM_TOKEN` if desired, but the default setup uses the global approach for simplicity.

### Prerequisites

1. Create the `@openrich` org on [npmjs.com](https://www.npmjs.com) — without it, publishing fails with `404 Scope not found`
2. Create an **automation token** at `npmjs.com → Access Tokens → Generate New Token → Automation`
3. Set the token via one of the options above

### One-command prerelease

```powershell
$env:CHANGESETS_PUBLISH_OTP="123456"; npm run publish:prerelease
```

The interactive `changeset` step pauses for you to describe changes, then the chain continues automatically. You can also use the script directly:

```powershell
.\scripts\release.ps1 -Mode prerelease -Otp 123456
```

### Stable release (manual steps)

```powershell
npm run changeset
npm run version-packages
npm run release
```

## License

MIT
