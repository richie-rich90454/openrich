export abstract class Mark {
  abstract name: string;

  abstract schema: Record<string, unknown>;

  parseDOM?: import('prosemirror-model').ParseRule[];

  toDOM?: (mark: import('prosemirror-model').Mark) => [string, Record<string, string>];
}
