import { describe, it, expect } from 'vitest';
import type { ThemeMode, Dir, LocaleConfig, OpenRichOptions, SerializedDoc } from './types';

describe('type exports', () => {
  it('ThemeMode union type allows light, dark, and system', () => {
    const modes: ThemeMode[] = ['light', 'dark', 'system'];
    expect(modes).toHaveLength(3);
  });

  it('Dir union type allows ltr and rtl', () => {
    const dirs: Dir[] = ['ltr', 'rtl'];
    expect(dirs).toHaveLength(2);
  });

  it('LocaleConfig can be constructed', () => {
    const config: LocaleConfig = {
      dir: 'rtl',
      messages: { 'editor.placeholder': 'type here' },
    };
    expect(config.dir).toBe('rtl');
    expect(config.messages['editor.placeholder']).toBe('type here');
  });

  it('LocaleConfig defaults to ltr when dir is ltr', () => {
    const config: LocaleConfig = {
      dir: 'ltr',
      messages: {},
    };
    expect(config.dir).toBe('ltr');
  });

  it('OpenRichOptions can be constructed with partial fields', () => {
    const opts: OpenRichOptions = {
      content: '<p>hello</p>',
      editable: true,
      locale: 'en',
      theme: 'dark',
      placeholder: 'Type...',
    };
    expect(opts.content).toBe('<p>hello</p>');
    expect(opts.editable).toBe(true);
    expect(opts.locale).toBe('en');
    expect(opts.theme).toBe('dark');
    expect(opts.placeholder).toBe('Type...');
  });

  it('OpenRichOptions accepts LocaleConfig for locale', () => {
    const opts: OpenRichOptions = {
      locale: { dir: 'rtl', messages: { key: 'val' } },
    };
    expect(opts.locale).toEqual({ dir: 'rtl', messages: { key: 'val' } });
  });

  it('OpenRichOptions callback fields accept functions', () => {
    const onUpdate = () => {};
    const onFocus = () => {};
    const onBlur = () => {};
    const opts: OpenRichOptions = { onUpdate, onFocus, onBlur };
    expect(typeof opts.onUpdate).toBe('function');
    expect(typeof opts.onFocus).toBe('function');
    expect(typeof opts.onBlur).toBe('function');
  });

  it('SerializedDoc shape has all four format fields', () => {
    const doc: SerializedDoc = {
      html: '<p>a</p>',
      json: { type: 'doc' },
      text: 'a',
      markdown: 'a',
    };
    expect(doc.html).toBe('<p>a</p>');
    expect(doc.json).toEqual({ type: 'doc' });
    expect(doc.text).toBe('a');
    expect(doc.markdown).toBe('a');
  });
});
