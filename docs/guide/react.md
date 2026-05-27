# React

## `<OpenRichEditor>`

```tsx
import { OpenRichEditor } from '@openrich/react';

function MyEditor() {
  return (
    <OpenRichEditor
      content="<p>Start typing...</p>"
      editable={true}
      theme="system"
      locale="en"
      placeholder="Type here..."
      className="my-editor"
      style={{ height: 400 }}
      onUpdate={({ editor, content }) => console.log(content)}
      onFocus={({ editor }) => console.log('focused')}
      onBlur={({ editor }) => console.log('blurred')}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string \| Record<string, unknown>` | — | Initial content (HTML or ProseMirror JSON) |
| `extensions` | `Extension[]` | — | Array of extensions (use `StarterKit` or custom) |
| `editable` | `boolean` | `true` | Whether the editor is editable |
| `theme` | `'light' \| 'dark' \| 'system'` | `'system'` | Color theme |
| `locale` | `string \| LocaleConfig` | `'en'` | Locale string or `{ dir, messages }` object |
| `placeholder` | `string` | — | Placeholder text when empty |
| `className` | `string` | — | CSS class for the editor container |
| `style` | `CSSProperties` | — | Inline styles for the editor container |
| `onUpdate` | `(props) => void` | — | Called on every content change |
| `onFocus` | `(props) => void` | — | Called when editor gains focus |
| `onBlur` | `(props) => void` | — | Called when editor loses focus |

## Sizing

The editor fills its parent container. Set dimensions via `style` or `className`:

```tsx
<div style={{ height: 300 }}>
  <OpenRichEditor content="<p>Sized by parent</p>" />
</div>

{/* Or via style prop */}
<OpenRichEditor
  content="<p>Fixed size</p>"
  style={{ height: 250, border: '1px solid #ccc' }}
/>
```

## `useEditor()` hook

```tsx
import { useEditor } from '@openrich/react';

function MyComponent() {
  const editor = useEditor({ content: '<p>Hello</p>' });
  return <div ref={(el) => el && editor?.tiptapEditor && el.appendChild(editor.tiptapEditor.view.dom)} />;
}
```

## `EditorProvider`

```tsx
import { EditorProvider, useEditorContext } from '@openrich/react';
```
