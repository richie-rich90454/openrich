# Theming

## Theme prop

```tsx
<OpenRichEditor theme="light" />   {/* always light */}
<OpenRichEditor theme="dark" />    {/* always dark */}
<OpenRichEditor theme="system" />  {/* follows prefers-color-scheme */}
```

Default is `system`.

## CSS Variables

All colors are controlled via CSS custom properties. Override them in your own stylesheet:

```css
.my-editor {
    --openrich-bg: #ffffff;
    --openrich-surface: #f5f5f5;
    --openrich-primary: #4f5b66;
    --openrich-border: #d1d5db;
    --openrich-text: #1f2937;
    --openrich-radius: 0px;
}

.my-editor.dark {
    --openrich-bg: #1a1a1a;
    --openrich-surface: #2a2a2a;
    --openrich-primary: #a0aec0;
    --openrich-border: #3a3a3a;
    --openrich-text: #e5e5e5;
}
```

## Default cold theme

| Variable             | Light     | Dark      |
| -------------------- | --------- | --------- |
| `--openrich-bg`      | `#ffffff` | `#1a1a1a` |
| `--openrich-surface` | `#f5f5f5` | `#2a2a2a` |
| `--openrich-primary` | `#4f5b66` | `#a0aec0` |
| `--openrich-border`  | `#d1d5db` | `#3a3a3a` |
| `--openrich-text`    | `#1f2937` | `#e5e5e5` |
| `--openrich-radius`  | `0px`     | `0px`     |
