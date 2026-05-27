import { describe, it, expect } from 'vitest';
import { Schema, DOMParser as ProseMirrorDOMParser } from 'prosemirror-model';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import { serializeJSON } from './to-json';

const testSchema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: {
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM: () => ['p', 0],
    },
    text: { group: 'inline' },
  },
});

function createDoc(html: string): ProseMirrorNode {
  const dom = new globalThis.DOMParser().parseFromString(html, 'text/html');
  return ProseMirrorDOMParser.fromSchema(testSchema).parse(dom);
}

describe('serializeJSON', () => {
  it('returns object with type "doc" and content for a simple document', () => {
    const doc = createDoc('<p>hello</p>');
    const result = serializeJSON(doc);
    expect(result).toHaveProperty('type', 'doc');
    expect(result).toHaveProperty('content');
    expect(Array.isArray(result.content)).toBe(true);
  });

  it('returns content array with paragraph nodes', () => {
    const doc = createDoc('<p>hello</p>');
    const result = serializeJSON(doc);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('paragraph');
  });

  it('contains text content in the JSON output', () => {
    const doc = createDoc('<p>hello world</p>');
    const result = serializeJSON(doc);
    expect(result.content[0].content[0].text).toBe('hello world');
  });

  it('handles multiple paragraphs', () => {
    const doc = createDoc('<p>first</p><p>second</p>');
    const result = serializeJSON(doc);
    expect(result.content).toHaveLength(2);
    expect(result.content[0].content[0].text).toBe('first');
    expect(result.content[1].content[0].text).toBe('second');
  });

  it('handles an empty document', () => {
    const doc = createDoc('<p></p>');
    const result = serializeJSON(doc);
    expect(result.type).toBe('doc');
    expect(result.content).toHaveLength(1);
  });

  it('throws when given invalid input', () => {
    expect(() => serializeJSON(null)).toThrow('serializeJSON');
    expect(() => serializeJSON(undefined)).toThrow('serializeJSON');
    expect(() => serializeJSON({})).toThrow('serializeJSON');
  });

  it('handles a doc-like object with toJSON method (editor-like)', () => {
    const editorLike = {
      state: {
        doc: createDoc('<p>from editor</p>'),
      },
    };
    const result = serializeJSON(editorLike);
    expect(result.type).toBe('doc');
    expect(result.content[0].content[0].text).toBe('from editor');
  });

  it('handles a doc-like object with doc property', () => {
    const wrapper = {
      doc: createDoc('<p>wrapped</p>'),
    };
    const result = serializeJSON(wrapper);
    expect(result.type).toBe('doc');
    expect(result.content[0].content[0].text).toBe('wrapped');
  });
});
