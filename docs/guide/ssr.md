# Server-Side Rendering

OpenRich is SSR-safe. All framework bindings delay editor initialization to the client and render a static placeholder during SSR.

## `renderStatic()`

```typescript
import { renderStatic } from '@openrich/ssr-utils';

// From HTML
const html = renderStatic('<p>Hello, world!</p>');
// → <div data-openrich-editor><p>Hello, world!</p></div>

// From ProseMirror JSON
const json = { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Hello' }] }] };
const html = renderStatic(json);
// → <div data-openrich-editor><p>Hello</p></div>
```

## `isClient`

```typescript
import { isClient } from '@openrich/ssr-utils';

if (isClient) {
  // Browser-only code
}
```
