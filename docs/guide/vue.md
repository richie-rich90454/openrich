# Vue

## `<OpenRichEditor>`

```vue
<script setup>
import { OpenRichEditor } from "@openrich/vue";
import { StarterKit } from "@openrich/starter-kit";
</script>

<template>
    <OpenRichEditor
        :content="'<p>Start typing...</p>'"
        :extensions="StarterKit"
        :editable="true"
        theme="system"
        locale="en"
        placeholder="Type here..."
        class="my-editor"
        :style="{ height: '400px' }"
    />
</template>
```

## Props

Same props as the [React binding](/guide/react#props), using Vue camelCase convention.

## `useEditor()` composable

```vue
<script setup>
import { useEditor } from "@openrich/vue";
const editor = useEditor({ content: "<p>Hello</p>" });
</script>
```
