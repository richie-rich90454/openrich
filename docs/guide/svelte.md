# Svelte

## `<OpenRichEditor>`

```svelte
<script>
  import { OpenRichEditor } from '@openrich/svelte';
  import { StarterKit } from '@openrich/starter-kit';
</script>

<OpenRichEditor
  content="<p>Start typing...</p>"
  extensions={StarterKit}
  editable={true}
  theme="system"
  locale="en"
  placeholder="Type here..."
  class="my-editor"
  style="height: 400px"
/>
```

## Props

Same props as the [React binding](/guide/react#props), using Svelte naming conventions.
