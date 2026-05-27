export abstract class Extension {
  abstract name: string;

  addCommands(): Record<string, (...args: any[]) => any> {
    return {};
  }

  addKeyboardShortcuts(): Record<string, () => boolean> {
    return {};
  }

  addInputRules(): import('prosemirror-inputrules').InputRule[] {
    return [];
  }
}
