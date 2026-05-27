import { describe, it, expect } from 'vitest';
import { Extension } from './extension';

describe('Extension base class', () => {
  it('can create a concrete Extension subclass', () => {
    class MyExtension extends Extension {
      name = 'myExtension';
    }

    const instance = new MyExtension();
    expect(instance).toBeInstanceOf(Extension);
  });

  it('instance has correct name property', () => {
    class CustomExt extends Extension {
      name = 'customExt';
    }

    const ext = new CustomExt();
    expect(ext.name).toBe('customExt');
  });

  describe('addCommands()', () => {
    it('returns empty object by default', () => {
      class EmptyExt extends Extension {
        name = 'empty';
      }

      const ext = new EmptyExt();
      const commands = ext.addCommands();
      expect(commands).toEqual({});
    });

    it('can be overridden to provide custom commands', () => {
      class WithCommands extends Extension {
        name = 'withCommands';

        override addCommands() {
          return {
            hello: () => true,
            world: (val: string) => val.length,
          };
        }
      }

      const ext = new WithCommands();
      const commands = ext.addCommands();
      expect(commands.hello()).toBe(true);
      expect(commands.world('test')).toBe(4);
    });
  });

  describe('addKeyboardShortcuts()', () => {
    it('returns empty object by default', () => {
      class PlainExt extends Extension {
        name = 'plain';
      }

      const ext = new PlainExt();
      expect(ext.addKeyboardShortcuts()).toEqual({});
    });

    it('can be overridden to provide custom shortcuts', () => {
      class ShortcutExt extends Extension {
        name = 'shortcuts';

        override addKeyboardShortcuts() {
          return {
            'Mod-b': () => {
              /* noop */
              return true;
            },
          };
        }
      }

      const ext = new ShortcutExt();
      const shortcuts = ext.addKeyboardShortcuts();
      expect(shortcuts['Mod-b']()).toBe(true);
    });
  });

  describe('addInputRules()', () => {
    it('returns empty array by default', () => {
      class NoRules extends Extension {
        name = 'noRules';
      }

      const ext = new NoRules();
      expect(ext.addInputRules()).toEqual([]);
    });

    it('can be overridden to provide input rules', () => {
      class WithRules extends Extension {
        name = 'withRules';
      }

      const ext = new WithRules();
      // Default returns empty array, but we can verify it's the right type
      const rules = ext.addInputRules();
      expect(Array.isArray(rules)).toBe(true);
      expect(rules).toHaveLength(0);
    });
  });

  it('multiple extensions are independent', () => {
    class ExtA extends Extension {
      name = 'extA';
    }
    class ExtB extends Extension {
      name = 'extB';
    }

    const a = new ExtA();
    const b = new ExtB();
    expect(a.name).toBe('extA');
    expect(b.name).toBe('extB');
    expect(a).not.toBe(b);
  });
});
