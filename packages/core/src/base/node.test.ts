import { describe, it, expect } from 'vitest';
import { Node } from './node';

describe('Node base class', () => {
  it('can create a concrete Node subclass with name and schema', () => {
    class CustomNode extends Node {
      name = 'customNode';
      schema = {
        content: 'inline*',
        group: 'block',
        parseDOM: [{ tag: 'div.custom' }],
        toDOM: () => ['div', { class: 'custom' }, 0],
      };
    }

    const instance = new CustomNode();
    expect(instance.name).toBe('customNode');
    expect(instance.schema).toEqual({
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'div.custom' }],
      toDOM: expect.any(Function),
    });
  });

  it('instance has correct name property', () => {
    class ParagraphNode extends Node {
      name = 'paragraph';
      schema = {
        content: 'inline*',
        group: 'block',
      };
    }

    const p = new ParagraphNode();
    expect(p.name).toBe('paragraph');
  });

  it('parseDOM is optional and defaults to undefined', () => {
    class SimpleNode extends Node {
      name = 'simple';
      schema = {};
    }

    const instance = new SimpleNode();
    expect(instance.parseDOM).toBeUndefined();
  });

  it('toDOM is optional and defaults to undefined', () => {
    class SimpleNode extends Node {
      name = 'simple';
      schema = {};
    }

    const instance = new SimpleNode();
    expect(instance.toDOM).toBeUndefined();
  });

  it('parseDOM can be set when parsing rules are needed', () => {
    class BlockquoteNode extends Node {
      name = 'blockquote';
      schema = { content: 'block+', group: 'block' };
      parseDOM = [{ tag: 'blockquote' }];
    }

    const instance = new BlockquoteNode();
    expect(instance.parseDOM).toHaveLength(1);
    expect(instance.parseDOM![0]).toEqual({ tag: 'blockquote' });
  });

  it('toDOM can be set as a function', () => {
    class HeadingNode extends Node {
      name = 'heading';
      schema = {
        content: 'inline*',
        group: 'block',
        attrs: { level: { default: 1 } },
      };
      toDOM = () => ['h1', {}, 0] as [string, Record<string, string>, number];
    }

    const instance = new HeadingNode();
    const result = instance.toDOM!({} as any);
    expect(result).toEqual(['h1', {}, 0]);
  });

  it('multiple instances have independent state', () => {
    class CustomNode extends Node {
      name = 'custom';
      schema = { group: 'block' };
    }

    const a = new CustomNode();
    const b = new CustomNode();
    expect(a.name).toBe('custom');
    expect(b.name).toBe('custom');
    // They are separate instances
    expect(a).not.toBe(b);
  });
});
