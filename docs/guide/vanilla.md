# Vanilla JS

## `mount()` / `unmount()`

```typescript
import { mount, unmount } from '@openrich/vanilla';

const element = document.getElementById('editor');

// Mount the editor
const editor = mount(element, {
  content: '<p>Start typing...</p>',
  editable: true,
  theme: 'system',
  locale: 'en',
  placeholder: 'Type here...',
  className: 'my-editor',
});

// Destroy it
unmount(editor);
```
