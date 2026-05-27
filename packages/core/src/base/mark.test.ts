import { describe, it, expect } from 'vitest';
import { Mark } from './mark';

describe('Mark base class', () => {
  it('can create a concrete Mark subclass', () => {
    class BoldMark extends Mark {
      name = 'bold';
      schema = {};
    }

    const instance = new BoldMark();
    expect(instance).toBeInstanceOf(Mark);
  });

  it('instance has correct name property', () => {
    class ItalicMark extends Mark {
      name = 'italic';
      schema = {};
    }

    const i = new ItalicMark();
    expect(i.name).toBe('italic');
  });

  it('schema is required and accessible', () => {
    class LinkMark extends Mark {
      name = 'link';
      schema = {
        attrs: { href: {}, title: { default: null } },
        inclusive: false,
      };
    }

    const instance = new LinkMark();
    expect(instance.schema).toHaveProperty('attrs');
    expect(instance.schema.attrs).toHaveProperty('href');
  });

  it('parseDOM is optional and defaults to undefined', () => {
    class SimpleMark extends Mark {
      name = 'simple';
      schema = {};
    }

    const instance = new SimpleMark();
    expect(instance.parseDOM).toBeUndefined();
  });

  it('parseDOM can be set', () => {
    class CodeMark extends Mark {
      name = 'code';
      schema = {};
      parseDOM = [{ tag: 'code' }];
    }

    const instance = new CodeMark();
    expect(instance.parseDOM).toHaveLength(1);
    expect(instance.parseDOM![0]).toEqual({ tag: 'code' });
  });

  it('toDOM is optional and defaults to undefined', () => {
    class StrikeMark extends Mark {
      name = 'strike';
      schema = {};
    }

    const instance = new StrikeMark();
    expect(instance.toDOM).toBeUndefined();
  });

  it('toDOM can be set', () => {
    class StrongMark extends Mark {
      name = 'strong';
      schema = {};
      toDOM = () => ['strong', {}] as [string, Record<string, string>];
    }

    const instance = new StrongMark();
    const result = instance.toDOM!({} as any);
    expect(result).toEqual(['strong', {}]);
  });

  it('multiple instances are independent', () => {
    class TestMark extends Mark {
      name = 'test';
      schema = {};
    }

    const a = new TestMark();
    const b = new TestMark();
    expect(a.name).toBe('test');
    expect(b.name).toBe('test');
    expect(a).not.toBe(b);
  });
});
