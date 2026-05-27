# Solid

## `<OpenRichEditor>`

```tsx
import { OpenRichEditor } from "@openrich/solid";
import { StarterKit } from "@openrich/starter-kit";

function App() {
    return (
        <OpenRichEditor
            content="<p>Start typing...</p>"
            extensions={StarterKit}
            editable={true}
            theme="system"
            locale="en"
            placeholder="Type here..."
            className="my-editor"
            style={{ height: "400px" }}
        />
    );
}
```

## `createEditor()` primitive

```tsx
import { createEditor } from "@openrich/solid";
const editor = createEditor({ content: "<p>Hello</p>" });
```
