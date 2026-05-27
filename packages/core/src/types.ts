export type ThemeMode = 'light' | 'dark' | 'system';
export type Dir = 'ltr' | 'rtl';

export interface LocaleConfig {
  dir: Dir;
  messages: Record<string, string>;
}

export interface OpenRichOptions {
  content?: string | Record<string, unknown>;
  extensions?: any[];
  editable?: boolean;
  locale?: string | LocaleConfig;
  theme?: ThemeMode;
  placeholder?: string;
  onUpdate?: (props: { editor: any; content: string }) => void;
  onFocus?: (props: { editor: any }) => void;
  onBlur?: (props: { editor: any }) => void;
}

export interface SerializedDoc {
  html: string;
  json: Record<string, unknown>;
  text: string;
  markdown: string;
}
