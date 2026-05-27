import { OpenRichEditor, isClient } from '@openrich/core';
import type { OpenRichOptions } from '@openrich/core';
import '@openrich/core/src/theme/variables.css';

export interface MountOptions extends Partial<OpenRichOptions> {
  content?: string | Record<string, unknown>;
  extensions?: any[];
  editable?: boolean;
  locale?: string | { dir: 'ltr' | 'rtl'; messages: Record<string, string> };
  theme?: 'light' | 'dark' | 'system';
  placeholder?: string;
}

export function mount(
  element: HTMLElement,
  options: MountOptions = {},
): OpenRichEditor | null {
  if (!isClient) return null;

  const editor = new OpenRichEditor(options);
  element.appendChild(editor.tiptapEditor.view.dom);

  return editor;
}

export function unmount(editor: OpenRichEditor | null): void {
  editor?.destroy();
}
