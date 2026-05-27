# PLAN — openrich-editor

> Universal rich-text editor monorepo. TipTap-based, multi-framework, cold-design system, 11 locales, i18n RTL/LTR, theme-aware.

---

## 1. Overview

**openrich** is a framework-agnostic rich-text editor built on TipTap (ProseMirror). It ships as a monorepo (npm workspaces + Turborepo) with one core package and framework bindings for React, Vue, Svelte, Solid, and vanilla JS. Extensions are tree-shakable via a separate package; a `@openrich/starter-kit` bundles the common ones.

| Attribute | Value |
|-----------|-------|
| **Editor engine** | TipTap (v2, `@tiptap/core`) |
| **Build tool** | Vite + Rolldown (vite@latest) |
| **Monorepo** | npm workspaces + Turborepo |
| **Output** | CJS (`.cjs`) + ESM (`.mjs`) per package |
| **Target** | Chrome 49+ (ES2015) |
| **Design** | Cold / neutral — no glassmorphism, no gradients, no blur |
| **Fonts** | System fonts only |
| **Locales** | en, zh, es, ar, pt, fr, ru, de, ja, ko, hi (11) |

---

## 2. Success Criteria

- [ ] `@openrich/core` can be imported in Node 18+ and browser, creates an Editor instance
- [ ] All 4 framework bindings render an editor and respond to props (content, onUpdate, theme, locale, etc.)
- [ ] `@openrich/vanilla` mount/unmount works with any DOM element
- [ ] Extensions are individually importable and tree-shaken when unused
- [ ] Starter kit bundles all common extensions in a single import
- [ ] Theme (light/dark/system) toggles correctly; CSS variables applied
- [ ] Locale switching works; RTL layouts detected properly
- [ ] Build outputs are valid CJS + ESM; bundle size of core < 30KB gzip
- [ ] Playground demo runs with theme toggle, locale selector, editable toggle
- [ ] Turborepo caching works — second build is near-instant

---

## 3. Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Editor engine | TipTap v2 (`@tiptap/core`) | Higher-level API over ProseMirror; extension system aligns with openrich's architecture |
| Build | Vite library mode (Rolldown) | `vite@latest` with Rolldown for fast lib bundling; CJS + ESM dual output |
| Monorepo | npm workspaces + Turborepo | Simple setup, no extra tooling; Turborepo for caching |
| Language | TypeScript (strict) | Type safety across framework bindings |
| Testing | Vitest | Vite-native, fast, same config |
| Linting | Biome | Fast, unified linter + formatter |
| Framework bindings | React, Vue, Svelte, Solid | One binding per framework; each lightweight wrapper around core |
| CSS | Plain CSS custom properties | No preprocessing; theme variables at `:root` / `.dark` |

---

## 4. File Tree

```
openrich/
├── package.json                          # Root: workspaces, scripts, devDeps
├── tsconfig.json                         # Root TS config (strict, paths)
├── tsconfig.build.json                   # Build-only overrides
├── turbo.json                            # Turborepo pipeline
├── biome.json                            # Biome config
├── .gitignore
├── .npmrc                                # Legacy peer deps handling
│
├── packages/
│   ├── core/
│   │   ├── package.json                  # @openrich/core
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts                # Library mode, CJS+ESM
│   │   ├── src/
│   │   │   ├── index.ts                  # Public API barrel
│   │   │   ├── openrich-editor.ts        # OpenRichEditor class (wraps Editor)
│   │   │   ├── types.ts                  # Core types: EditorOptions, SerializedDoc, etc.
│   │   │   ├── transaction.ts            # Transaction helpers, chain API
│   │   │   ├── command-api.ts            # Command wrappers (toggleBold, insertImage, etc.)
│   │   │   ├── serialization/
│   │   │   │   ├── index.ts
│   │   │   │   ├── to-html.ts            # serialize HTML
│   │   │   │   ├── to-json.ts            # serialize ProseMirror JSON
│   │   │   │   ├── to-markdown.ts        # serialize Markdown
│   │   │   │   └── to-text.ts            # serialize plain text
│   │   │   ├── render-static.ts          # renderStatic() — SSR output
│   │   │   ├── base/
│   │   │   │   ├── node.ts               # Node extension base class
│   │   │   │   ├── mark.ts               # Mark extension base class
│   │   │   │   └── extension.ts          # Extension base class
│   │   │   ├── i18n/
│   │   │   │   ├── index.ts              # I18nManager class
│   │   │   │   ├── messages.ts           # Locale messages map
│   │   │   │   └── locales/
│   │   │   │       ├── en.ts
│   │   │   │       ├── zh.ts
│   │   │   │       ├── es.ts
│   │   │   │       ├── ar.ts
│   │   │   │       ├── pt.ts
│   │   │   │       ├── fr.ts
│   │   │   │       ├── ru.ts
│   │   │   │       ├── de.ts
│   │   │   │       ├── ja.ts
│   │   │   │       ├── ko.ts
│   │   │   │       └── hi.ts
│   │   │   ├── theme/
│   │   │   │   ├── index.ts              # ThemeManager class
│   │   │   │   └── variables.css         # CSS custom properties
│   │   │   └── utils/
│   │   │       ├── is-client.ts
│   │   │       ├── dom.ts                # DOM helpers
│   │   │       └── platform.ts           # Platform detection
│   │   └── dist/                         # (build output)
│   │
│   ├── react/
│   │   ├── package.json                  # @openrich/react
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── editor.tsx                # <Editor> component
│   │   │   ├── use-editor.ts             # Hook: create/destroy editor instance
│   │   │   ├── editor-provider.tsx        # Optional context provider
│   │   │   └── types.ts                  # React-specific prop types
│   │   └── dist/
│   │
│   ├── vue/
│   │   ├── package.json                  # @openrich/vue
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── editor.vue                # <Editor> component
│   │   │   ├── use-editor.ts             # Composable
│   │   │   └── types.ts
│   │   └── dist/
│   │
│   ├── svelte/
│   │   ├── package.json                  # @openrich/svelte
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── svelte.config.js
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── Editor.svelte             # <Editor> component
│   │   │   └── types.ts
│   │   └── dist/
│   │
│   ├── solid/
│   │   ├── package.json                  # @openrich/solid
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.tsx
│   │   │   ├── editor.tsx                # <Editor> component
│   │   │   ├── create-editor.ts          # Solid primitive
│   │   │   └── types.ts
│   │   └── dist/
│   │
│   ├── vanilla/
│   │   ├── package.json                  # @openrich/vanilla
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.ts                  # mount(), unmount()
│   │   │   └── mount.ts                  # mount logic
│   │   └── dist/
│   │
│   ├── extensions/
│   │   ├── package.json                  # @openrich/extensions
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   ├── index.ts                  # Barrel of all extensions
│   │   │   ├── nodes/
│   │   │   │   ├── paragraph.ts
│   │   │   │   ├── heading.ts
│   │   │   │   ├── bullet-list.ts
│   │   │   │   ├── ordered-list.ts
│   │   │   │   ├── task-list.ts
│   │   │   │   ├── code-block.ts
│   │   │   │   ├── blockquote.ts
│   │   │   │   ├── horizontal-rule.ts
│   │   │   │   ├── image.ts
│   │   │   │   └── hard-break.ts
│   │   │   ├── marks/
│   │   │   │   ├── bold.ts
│   │   │   │   ├── italic.ts
│   │   │   │   ├── underline.ts
│   │   │   │   ├── strike.ts
│   │   │   │   ├── code.ts
│   │   │   │   ├── link.ts
│   │   │   │   └── highlight.ts
│   │   │   └── plugins/
│   │   │       ├── placeholder.ts
│   │   │       └── keyboard-shortcuts.ts
│   │   └── dist/
│   │
│   ├── extensions-starter-kit/
│   │   ├── package.json                  # @openrich/starter-kit
│   │   ├── tsconfig.json
│   │   ├── vite.config.ts
│   │   ├── src/
│   │   │   └── index.ts                  # Re-exports all from @openrich/extensions as one array
│   │   └── dist/
│   │
│   └── ssr-utils/
│       ├── package.json                  # @openrich/ssr-utils
│       ├── tsconfig.json
│       ├── vite.config.ts
│       ├── src/
│       │   └── index.ts                  # Re-exports renderStatic + isClient from core
│       └── dist/
│
└── playground/
    ├── package.json                      # React demo app
    ├── tsconfig.json
    ├── vite.config.ts                    # Dev server mode
    ├── index.html
    └── src/
        ├── main.tsx                      # Entry
        ├── app.tsx                       # App shell with controls
        ├── theme-toggle.tsx              # Light/dark/system switcher
        ├── locale-selector.tsx           # Dropdown for 11 locales
        ├── editable-toggle.tsx           # Toggle editable prop
        └── styles.css                    # Playground-specific styles
```

---

## 5. Build Order (Dependency Graph)

```
                    ┌──────────────────────┐
                    │  @openrich/core       │  (no internal deps)
                    │  [Phase 1]            │
                    └──────────┬───────────┘
                               │
            ┌──────────────────┼──────────────────┐
            ▼                  ▼                   ▼
   ┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
   │ @openrich/   │   │ @openrich/   │   │ @openrich/       │
   │ extensions   │   │ ssr-utils    │   │ vanilla          │
   │ [Phase 2]    │   │ [Phase 2]    │   │ [Phase 3]        │
   └──────┬───────┘   └──────────────┘   └──────────────────┘
          │
          ▼
   ┌──────────────────┐
   │ starter-kit      │
   │ [Phase 2]        │
   └──────────────────┘

   ┌──────────────────┐
   │ @openrich/react  │ ◄── core + extensions
   │ @openrich/vue    │ ◄── core + extensions
   │ @openrich/svelte │ ◄── core + extensions
   │ @openrich/solid  │ ◄── core + extensions
   │ [Phase 3]        │
   └──────────────────┘

   ┌──────────────────┐
   │ playground/      │ ◄── react
   │ [Phase 4]        │
   └──────────────────┘
```

**Build order by package:**
1. `@openrich/core` (P0 — no deps)
2. `@openrich/extensions` (P1 — depends on core types)
3. `@openrich/starter-kit` (P1 — depends on extensions)
4. `@openrich/ssr-utils` (P1 — depends on core)
5. `@openrich/vanilla` (P2 — depends on core + extensions)
6. `@openrich/react` (P2 — depends on core + extensions)
7. `@openrich/vue` (P2 — same)
8. `@openrich/svelte` (P2 — same)
9. `@openrich/solid` (P2 — same)
10. `playground/` (P3 — depends on react + core)

---

## 6. Phase Breakdown

### Phase 0 — Monorepo Scaffold

**Goal:** Working monorepo with Turborepo, TypeScript, and Biome.

**Files to create:**
- `package.json` (root) — workspaces: `["packages/*", "playground"]`, devDeps: turbo, typescript, vite, biome
- `tsconfig.json` (root) — strict, paths: `@openrich/*`
- `tsconfig.build.json` — stricter, declaration, declarationMap
- `turbo.json` — pipeline: build dependsOn ^build, dev, lint
- `biome.json` — config for TS/TSX
- `.npmrc` — `legacy-peer-deps=true`
- `.gitignore` (update existing) — add `dist/`, `.turbo`

**Agent:** `backend-specialist` (monorepo infrastructure)
**Verification:**
- `npm install` completes without errors
- `npx turbo --version` prints version
- `npx tsc --noEmit` passes on empty project
- `npx biome --version` prints version

---

### Phase 1 — `@openrich/core`

**Goal:** Headless editor class, serialization, base classes, i18n, theme, SSR utils.

**Files to create:**
- `packages/core/package.json` — deps: `@tiptap/core`, `@tiptap/pm`, `prosemirror-model`, `prosemirror-view`, `prosemirror-state`, `prosemirror-transform`, `prosemirror-commands`, `prosemirror-keymap`, `prosemirror-schema-list`, `prosemirror-inputrules`
- `packages/core/tsconfig.json`
- `packages/core/vite.config.ts` — lib mode, `build.lib.name='OpenRichCore'`, `build.rollupOptions.external: /@tiptap/`, CJS+ESM
- `packages/core/src/index.ts`
- `packages/core/src/openrich-editor.ts` — wraps `Editor` from `@tiptap/core`, adds locale/theme management
- `packages/core/src/types.ts` — `OpenRichOptions`, `FrameworkEnum`, `ThemeMode`, `LocaleConfig`, `SerializedDoc`
- `packages/core/src/transaction.ts` — chainable `.chain()` API
- `packages/core/src/command-api.ts` — `toggleBold()`, `toggleItalic()`, `toggleHeading(level)`, `toggleBulletList()`, `insertImage(attrs)`, `undo()`, `redo()`, etc.
- `packages/core/src/serialization/to-html.ts` — uses `prosemirror-model` `DOMSerializer`
- `packages/core/src/serialization/to-json.ts` — `doc.toJSON()`
- `packages/core/src/serialization/to-markdown.ts` — uses TipTap's `generateHTML`/markdown extension or `prosemirror-markdown`
- `packages/core/src/serialization/to-text.ts` — iterate doc nodes, collect text
- `packages/core/src/render-static.ts` — `renderStatic(doc, extensions)` → HTML string (no DOM required)
- `packages/core/src/base/node.ts` — `class Node { name; schema; parseDOM; toDOM; }`
- `packages/core/src/base/mark.ts` — `class Mark { name; schema; parseDOM; toDOM; }`
- `packages/core/src/base/extension.ts` — `class Extension { name; addCommands; addKeyboardShortcuts; addInputRules; }`
- `packages/core/src/i18n/index.ts` — `I18nManager` singleton
- `packages/core/src/i18n/messages.ts` — imports all locales, message shape
- `packages/core/src/i18n/locales/en.ts` through `hi.ts` — 11 locale files
- `packages/core/src/theme/index.ts` — `ThemeManager`, listens to `prefers-color-scheme`, applies `.dark`/`.light`
- `packages/core/src/theme/variables.css` — `--openrich-bg: #fff`, `--openrich-surface: #f5f5f5`, `--openrich-primary: #4f5b66`, `--openrich-border: #d1d5db`, `--openrich-text: #1f2937`, `--openrich-radius: 0px`; `.dark` overrides
- `packages/core/src/utils/is-client.ts`
- `packages/core/src/utils/dom.ts`
- `packages/core/src/utils/platform.ts`

**Agent:** `frontend-specialist` (editor internals, i18n, theme) + `backend-specialist` (serialization, SSR)
**Verification:**
- `cd packages/core && npx vite build` produces `dist/index.mjs` + `dist/index.cjs`
- `node -e "require('./dist/index.cjs')"` does not throw
- Static analysis: `npx tsc --noEmit` passes in `packages/core`
- Unit tests pass for serialization round-trip (JSON → HTML → JSON)
- Unit tests pass for 3 locale files
- RTL detection works (mock `dir="rtl"`)

---

### Phase 2 — Extensions, Starter Kit, SSR Utils

**Goal:** Tree-shakable extensions package, starter kit bundle, SSR utils re-export.

#### 2a. `@openrich/extensions`

**Files to create:**
- `packages/extensions/package.json` — deps: `@openrich/core` (peer), `@tiptap/extension-*` equivalents
- `packages/extensions/tsconfig.json`
- `packages/extensions/vite.config.ts` — lib mode, external: `@openrich/core`, `@tiptap/*`
- `packages/extensions/src/index.ts` — barrel
- `packages/extensions/src/nodes/paragraph.ts` — extends base `Node`
- `packages/extensions/src/nodes/heading.ts`
- `packages/extensions/src/nodes/bullet-list.ts` + `list-item.ts`
- `packages/extensions/src/nodes/ordered-list.ts`
- `packages/extensions/src/nodes/task-list.ts` + `task-item.ts`
- `packages/extensions/src/nodes/code-block.ts`
- `packages/extensions/src/nodes/blockquote.ts`
- `packages/extensions/src/nodes/horizontal-rule.ts`
- `packages/extensions/src/nodes/image.ts`
- `packages/extensions/src/nodes/hard-break.ts`
- `packages/extensions/src/marks/bold.ts`
- `packages/extensions/src/marks/italic.ts`
- `packages/extensions/src/marks/underline.ts`
- `packages/extensions/src/marks/strike.ts`
- `packages/extensions/src/marks/code.ts`
- `packages/extensions/src/marks/link.ts`
- `packages/extensions/src/marks/highlight.ts`
- `packages/extensions/src/plugins/placeholder.ts` — custom placeholder plugin
- `packages/extensions/src/plugins/keyboard-shortcuts.ts` — extra keyboard shortcuts

Each extension wraps the corresponding TipTap extension or implements it via base classes. For example, `bold.ts` imports `@tiptap/extension-bold` and re-exports it as an openrich-compatible wrapper.

**Agent:** `frontend-specialist`
**Verification:**
- Build produces valid CJS + ESM
- `import { Bold } from '@openrich/extensions'` resolves and `Bold.name === 'bold'`
- Tree-shaking confirmed: bundling only `Bold` excludes `Italic` from output

#### 2b. `@openrich/starter-kit`

**Files to create:**
- `packages/extensions-starter-kit/package.json` — deps: `@openrich/extensions`, `@openrich/core`
- `packages/extensions-starter-kit/tsconfig.json`
- `packages/extensions-starter-kit/vite.config.ts`
- `packages/extensions-starter-kit/src/index.ts` — imports all nodes/marks/plugins, exports as `StarterKit` array

**Agent:** `frontend-specialist`
**Verification:**
- `import { StarterKit } from '@openrich/starter-kit'` returns an array of 20+ extensions
- Build succeeds

#### 2c. `@openrich/ssr-utils`

**Files to create:**
- `packages/ssr-utils/package.json` — deps: `@openrich/core`
- `packages/ssr-utils/tsconfig.json`
- `packages/ssr-utils/vite.config.ts`
- `packages/ssr-utils/src/index.ts` — `export { renderStatic, isClient } from '@openrich/core'`

**Agent:** `backend-specialist`
**Verification:**
- `import { renderStatic, isClient } from '@openrich/ssr-utils'` works
- `isClient` is `false` in Node, `true` in browser

---

### Phase 3 — Framework Bindings + Vanilla

**Goal:** Working framework components for React, Vue, Svelte, Solid, and vanilla.

#### 3a. `@openrich/react`

**Files to create:**
- `packages/react/package.json` — deps: `@openrich/core` (peer), `@openrich/extensions` (peer), react (peer), react-dom (peer)
- `packages/react/tsconfig.json` — `jsx: "react-jsx"`
- `packages/react/vite.config.ts` — lib mode, external: react, react-dom, `@openrich/*`
- `packages/react/src/index.ts`
- `packages/react/src/editor.tsx` — `<Editor content extensions={[StarterKit]} editable onUpdate onFocus onBlur locale theme placeholder />`
- `packages/react/src/use-editor.ts` — `useEditor(options)` hook that creates/destroys editor lifecycle
- `packages/react/src/editor-provider.tsx` — optional React context to share editor instance
- `packages/react/src/types.ts`

**Props surface:**
```ts
interface EditorProps {
  content?: string | Record<string, unknown>;
  extensions?: Extension[];
  editable?: boolean;
  onUpdate?: (props: { editor: OpenRichEditor; content: string }) => void;
  onFocus?: (props: { editor: OpenRichEditor }) => void;
  onBlur?: (props: { editor: OpenRichEditor }) => void;
  locale?: string | { dir: 'ltr' | 'rtl'; messages: Record<string, string> };
  theme?: 'light' | 'dark' | 'system';
  placeholder?: string;
}
```

**Agent:** `frontend-specialist`
**Verification:**
- `<Editor content="<p>Hello</p>" />` renders a TipTap editor in the DOM
- `onUpdate` fires on content change
- `editable={false}` disables editing
- `theme="dark"` applies `.dark` class and dark CSS variables

#### 3b. `@openrich/vue`

**Files to create:**
- `packages/vue/package.json` — deps: `@openrich/core` (peer), `@openrich/extensions` (peer), vue (peer)
- `packages/vue/tsconfig.json`
- `packages/vue/vite.config.ts` — lib mode, external: vue, `@openrich/*`
- `packages/vue/src/index.ts`
- `packages/vue/src/editor.vue` — `<Editor>` SFC with `defineProps` matching the same surface
- `packages/vue/src/use-editor.ts` — composable
- `packages/vue/src/types.ts`

**Agent:** `frontend-specialist`
**Verification:**
- `<Editor :content="'<p>Hello</p>'" />` renders in a Vue test app
- Props reactive: changing `extensions` rebuilds the editor

#### 3c. `@openrich/svelte`

**Files to create:**
- `packages/svelte/package.json` — deps: `@openrich/core`, `@openrich/extensions`, svelte (peer)
- `packages/svelte/tsconfig.json`
- `packages/svelte/svelte.config.js`
- `packages/svelte/vite.config.ts`
- `packages/svelte/src/index.ts`
- `packages/svelte/src/Editor.svelte` — Svelte 5 runes component
- `packages/svelte/src/types.ts`

**Agent:** `frontend-specialist` (with Svelte expertise)
**Verification:**
- Mount `Editor` in a Svelte app, editor renders and is interactive

#### 3d. `@openrich/solid`

**Files to create:**
- `packages/solid/package.json` — deps: `@openrich/core`, `@openrich/extensions`, solid-js (peer)
- `packages/solid/tsconfig.json`
- `packages/solid/vite.config.ts`
- `packages/solid/src/index.tsx`
- `packages/solid/src/editor.tsx` — Solid JSX component
- `packages/solid/src/create-editor.ts` — Solid reactive primitive
- `packages/solid/src/types.ts`

**Agent:** `frontend-specialist` (with Solid expertise)
**Verification:**
- Mount `Editor` in a Solid app, editor renders and is interactive

#### 3e. `@openrich/vanilla`

**Files to create:**
- `packages/vanilla/package.json` — deps: `@openrich/core`, `@openrich/extensions`
- `packages/vanilla/tsconfig.json`
- `packages/vanilla/vite.config.ts`
- `packages/vanilla/src/index.ts`
- `packages/vanilla/src/mount.ts` — `mount(element, options)` creates editor, appends to DOM; `unmount(editor)` destroys

**Agent:** `frontend-specialist`
**Verification:**
- In a plain HTML page, `mount(document.getElementById('editor'), { content: '<p>Hello</p>' })` works
- `unmount` removes the editor and cleans up DOM

---

### Phase 4 — Playground

**Goal:** A working React demo app that exercises all features.

**Files to create:**
- `playground/package.json` — deps: `@openrich/core`, `@openrich/react`, `@openrich/extensions`, `@openrich/starter-kit`, react, react-dom, vite (dev)
- `playground/tsconfig.json`
- `playground/vite.config.ts` — dev server, alias `@openrich/*` to packages
- `playground/index.html`
- `playground/src/main.tsx`
- `playground/src/app.tsx` — app shell, imports all controls
- `playground/src/theme-toggle.tsx` — light/dark/system radio buttons or select
- `playground/src/locale-selector.tsx` — dropdown with 11 locales
- `playground/src/editable-toggle.tsx` — toggle switch
- `playground/src/styles.css` — layout, control bar styling (cold design)

**Agent:** `frontend-specialist`
**Verification:**
- `npm run dev` in playground starts Vite dev server
- Theme toggle switches between light/dark/system (check `prefers-color-scheme` mock)
- Locale selector changes language of built-in strings
- Editable toggle enables/disables editing
- Content typed into editor persists

---

### Phase 5 — CSS & Theme Polish

**Goal:** Finalize theme variables, cold-design aesthetic, system font stack.

**Files to modify:**
- `packages/core/src/theme/variables.css` — finalize color values

**Design tokens (cold / neutral):**

| Variable | Light | Dark |
|----------|-------|------|
| `--openrich-bg` | `#ffffff` | `#1a1a1a` |
| `--openrich-surface` | `#f5f5f5` | `#2a2a2a` |
| `--openrich-primary` | `#4f5b66` | `#a0aec0` |
| `--openrich-border` | `#d1d5db` | `#3a3a3a` |
| `--openrich-text` | `#1f2937` | `#e5e5e5` |
| `--openrich-radius` | `0px` | `0px` |

**System font stack:**
```css
font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**No font packages loaded.** No glassmorphism (`backdrop-filter`, `rgba(255,255,255,0.1)` patterns). No gradients.

**Agent:** `frontend-specialist` (design)
**Verification:**
- Visual inspection confirms cold, neutral palette
- No `backdrop-filter`, `linear-gradient`, `radial-gradient`, or `blur()` in any CSS file
- Font stack does not load any external font files

---

### Phase 6 — Verification & Hardening

**Goal:** Run all verifications, fix issues, mark complete.

**Tasks:**
1. `npm run lint` — Biome check on all packages
2. `npx tsc --noEmit` — type-check entire monorepo
3. `npx turbo run build` — build all packages in dependency order
4. Verify CJS + ESM output for each package
5. Verify bundle size of `@openrich/core` (target < 30KB gzip with minimal extensions)
6. Verify tree-shaking: bundle a script that imports only `Bold` from extensions — check output excludes other extensions
7. Verify playground runs: `cd playground && npm run dev`
8. Verify SSR: `renderStatic` produces valid HTML without DOM APIs
9. Verify RTL: set `locale="ar"`, confirm `dir="rtl"` on editor wrapper
10. Verify all 11 locale files load without errors

**Agent:** `test-engineer` + `performance-optimizer`
**Verification:**
- All checks pass (listed above)
- Phase X marker added to this plan file

---

## 7. Agent Assignments Summary

| Phase | Scope | Primary Agent | Support Agent |
|-------|-------|---------------|---------------|
| 0 | Monorepo scaffold | `backend-specialist` | — |
| 1 | `@openrich/core` | `frontend-specialist` | `backend-specialist` |
| 2a | Extensions | `frontend-specialist` | — |
| 2b | Starter kit | `frontend-specialist` | — |
| 2c | SSR utils | `backend-specialist` | — |
| 3a | React binding | `frontend-specialist` | — |
| 3b | Vue binding | `frontend-specialist` | — |
| 3c | Svelte binding | `frontend-specialist` | — |
| 3d | Solid binding | `frontend-specialist` | — |
| 3e | Vanilla binding | `frontend-specialist` | — |
| 4 | Playground | `frontend-specialist` | — |
| 5 | CSS & theme polish | `frontend-specialist` | — |
| 6 | Verification | `test-engineer` | `performance-optimizer` |

---

## 8. Verification Checklist (Phase X)

### P0 — Lint & Type Check
- [ ] `npx biome check packages/*/src` passes
- [ ] `npx tsc --noEmit` passes (no `any` escapes where strict expects types)
- [ ] `npx turbo run build` succeeds

### P1 — Build Outputs
- [ ] Each package has `dist/index.mjs` and `dist/index.cjs`
- [ ] `node -e "require('./packages/core/dist/index.cjs')"` does not throw
- [ ] `node -e "require('./packages/extensions/dist/index.cjs')"` does not throw

### P2 — Core Features
- [ ] `new OpenRichEditor({ content: '<p>test</p>' })` creates editable editor
- [ ] `editor.getHTML()` returns `<p>test</p>`
- [ ] `editor.getJSON()` returns valid ProseMirror JSON
- [ ] `editor.getText()` returns `"test"`
- [ ] `renderStatic(doc, extensions)` returns HTML string (no DOM)
- [ ] `isClient` is `false` in Node.js
- [ ] Theme switching applies/removes `.dark` class on editor container
- [ ] Locale switching updates editor UI strings

### P3 — Framework Bindings
- [ ] React `<Editor>` mounts and unmounts without memory leaks
- [ ] Vue `<Editor>` mounts and unmounts without memory leaks
- [ ] Svelte `<Editor>` mounts and unmounts without memory leaks
- [ ] Solid `<Editor>` mounts and unmounts without memory leaks
- [ ] Vanilla `mount()`/`unmount()` works in plain HTML page

### P4 — Extensions
- [ ] `import { Bold } from '@openrich/extensions'` works
- [ ] `import { StarterKit } from '@openrich/starter-kit'` returns array of 20+ extensions
- [ ] Tree-shaking confirmed: unused extensions are not in final bundle

### P5 — Design Compliance
- [ ] No purple/violet hex codes in any CSS
- [ ] No `backdrop-filter`, `blur()`, `linear-gradient`, `radial-gradient`
- [ ] System font stack — no `@font-face` or font imports
- [ ] CSS variables use `--openrich-*` naming
- [ ] Default radius is `0px`

### P6 — Playground
- [ ] `npm run dev` in playground starts without errors
- [ ] Theme toggle cycles light/dark/system
- [ ] Locale selector switches between 11 locales
- [ ] Editable toggle disables/re-enables editing
- [ ] Content typed in editor persists on page (no data loss)

### P7 — RTL / i18n
- [ ] `locale="ar"` sets `dir="rtl"` on editor wrapper
- [ ] `locale="en"` sets `dir="ltr"`
- [ ] ProseMirror bidi cursor handling is active (default)
- [ ] All 11 locale message files load without errors

### P8 — Security & Supply Chain
- [ ] No hardcoded secrets or tokens
- [ ] All deps use `@latest` per requirement
- [ ] `.npmrc` sets `legacy-peer-deps=true` (handles TipTap peer deps)

---

## 9. Rollback Strategy

| Failure | Recovery |
|---------|----------|
| Build fails in Phase 1 | Check TipTap peer deps compatibility; verify `@tiptap/core` import works in isolation |
| Framework binding doesn't render | Verify the framework version (React 18/19, Vue 3, Svelte 5, Solid 1.8+); check JSX config |
| Locale messages missing keys | Add missing keys to all 11 files before marking Phase 1 complete |
| Turborepo cache poisoning | `rm -rf .turbo node_modules/.cache/turbo` |
| Playground not starting | Check path aliases in `vite.config.ts` — `@openrich/*` must resolve to local packages |

---

## ✅ PHASE X COMPLETE

(Fill when all checks pass)

- Lint: [ ] Pass
- Type check: [ ] Pass
- Build: [ ] Pass
- Playground: [ ] Running
- All 8 verification blocks: [ ] Pass
- Date: [ ]
