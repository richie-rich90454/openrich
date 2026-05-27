export abstract class Node {
  abstract name: string;

  abstract schema: Record<string, unknown>;

  parseDOM?: import('prosemirror-model').ParseRule[];

  toDOM?: (node: import('prosemirror-model').Node) => [string, Record<string, string>, number];
}
