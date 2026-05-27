<script lang="ts">
  import { OpenRichEditor, isClient } from '@openrich/core';
  import '@openrich/core/src/theme/variables.css';

  let {
    content = undefined,
    extensions = undefined,
    editable = true,
    onUpdate = undefined,
    onFocus = undefined,
    onBlur = undefined,
    locale = undefined,
    theme = 'system',
    placeholder = undefined,
    class: className = '',
    style = undefined,
  }: {
    content?: string | Record<string, unknown>;
    extensions?: any[];
    editable?: boolean;
    onUpdate?: (props: { editor: any; content: string }) => void;
    onFocus?: (props: { editor: any }) => void;
    onBlur?: (props: { editor: any }) => void;
    locale?: string | { dir: 'ltr' | 'rtl'; messages: Record<string, string> };
    theme?: 'light' | 'dark' | 'system';
    placeholder?: string;
    class?: string;
    style?: string;
  } = $props();

  let container: HTMLDivElement | undefined = $state();
  let editor: OpenRichEditor | null = $state(null);

  $effect(() => {
    if (!isClient || !container) return;
    const instance = new OpenRichEditor({
      content,
      extensions,
      editable,
      locale,
      theme,
      placeholder,
      onUpdate,
      onFocus,
      onBlur,
    });
    container.appendChild(instance.tiptapEditor.view.dom);
    editor = instance;
    return () => {
      instance.destroy();
      editor = null;
    };
  });

  $effect(() => {
    editor?.setEditable(editable);
  });

  $effect(() => {
    editor?.setTheme(theme);
  });

  $effect(() => {
    if (locale) editor?.setLocale(locale);
  });
</script>

{#if !isClient}
  <div data-openrich-editor data-theme={theme} class={className} {style}></div>
{:else}
  <div bind:this={container} class="openrich-editor {className}" {style}></div>
{/if}
