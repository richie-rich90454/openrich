# Getting Started

## Installation

```bash
npm install @openrich/core@latest @openrich/extensions@latest
# Plus your framework binding:
npm install @openrich/react@latest
```

## Quick Start (React)

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

## Package Overview

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
