import type { ThemeMode } from '@openrich/core';

export interface EditorProps {
  content?: string | Record<string, unknown>;
  extensions?: any[];
  editable?: boolean;
  onUpdate?: (props: { editor: any; content: string }) => void;
  onFocus?: (props: { editor: any }) => void;
  onBlur?: (props: { editor: any }) => void;
  locale?: string | { dir: 'ltr' | 'rtl'; messages: Record<string, string> };
  theme?: ThemeMode;
  placeholder?: string;
  className?: string;
  style?: Record<string, string>;
}
