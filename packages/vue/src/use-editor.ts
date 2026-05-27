import { shallowRef, onMounted, onUnmounted } from 'vue';
import { OpenRichEditor, isClient } from '@openrich/core';
import type { OpenRichOptions } from '@openrich/core';

export function useEditor(options: Partial<OpenRichOptions> = {}) {
  const editor = shallowRef<OpenRichEditor | null>(null);

  onMounted(() => {
    if (!isClient) return;
    editor.value = new OpenRichEditor(options);
  });

  onUnmounted(() => {
    editor.value?.destroy();
    editor.value = null;
  });

  return editor;
}
