# OpenRich

A universal rich-text editor for any UI framework.

```tsx
import { OpenRichEditor } from "@openrich/react";
import { StarterKit } from "@openrich/starter-kit";

export default () => (
    <OpenRichEditor content="<p>Hello, world!</p>" extensions={[StarterKit]} theme="system" />
);
```

## Why OpenRich?

- **Framework-agnostic** — core is headless; bindings for React, Vue, Svelte, Solid, vanilla
- **Tree-shakable** — import only the extensions you need
- **SSR-safe** — `renderStatic()` produces HTML without a DOM
- **Theme-aware** — light, dark, or system (auto `prefers-color-scheme`)
- **i18n-ready** — 11 built-in locales with RTL/LTR detection
- **Embeddable** — `className` and `style` props for sizing; CSS variables for theming
