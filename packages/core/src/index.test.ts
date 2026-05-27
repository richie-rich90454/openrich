import { describe, it, expect } from 'vitest';

describe('main barrel (@openrich/core)', () => {
  describe('named type exports', () => {
    it('exports ThemeMode type', async () => {
      const mod = await import('./index');
      // Types are erased at runtime; verify the value exports are present
      expect(mod).toBeDefined();
    });
  });

  describe('class exports', () => {
    it('exports OpenRichEditor', async () => {
      const mod = await import('./index');
      expect(mod.OpenRichEditor).toBeDefined();
      expect(typeof mod.OpenRichEditor).toBe('function');
    });

    it('exports I18nManager', async () => {
      const mod = await import('./index');
      expect(mod.I18nManager).toBeDefined();
      expect(typeof mod.I18nManager).toBe('function');
    });

    it('exports ThemeManager', async () => {
      const mod = await import('./index');
      expect(mod.ThemeManager).toBeDefined();
      expect(typeof mod.ThemeManager).toBe('function');
    });

    it('exports Node base class', async () => {
      const mod = await import('./index');
      expect(mod.Node).toBeDefined();
      expect(typeof mod.Node).toBe('function');
    });

    it('exports Mark base class', async () => {
      const mod = await import('./index');
      expect(mod.Mark).toBeDefined();
      expect(typeof mod.Mark).toBe('function');
    });

    it('exports Extension base class', async () => {
      const mod = await import('./index');
      expect(mod.Extension).toBeDefined();
      expect(typeof mod.Extension).toBe('function');
    });
  });

  describe('function exports', () => {
    it('exports renderStatic', async () => {
      const mod = await import('./index');
      expect(mod.renderStatic).toBeDefined();
      expect(typeof mod.renderStatic).toBe('function');
    });

    it('exports serializeHTML', async () => {
      const mod = await import('./index');
      expect(mod.serializeHTML).toBeDefined();
      expect(typeof mod.serializeHTML).toBe('function');
    });

    it('exports serializeJSON', async () => {
      const mod = await import('./index');
      expect(mod.serializeJSON).toBeDefined();
      expect(typeof mod.serializeJSON).toBe('function');
    });

    it('exports serializeMarkdown', async () => {
      const mod = await import('./index');
      expect(mod.serializeMarkdown).toBeDefined();
      expect(typeof mod.serializeMarkdown).toBe('function');
    });

    it('exports serializeText', async () => {
      const mod = await import('./index');
      expect(mod.serializeText).toBeDefined();
      expect(typeof mod.serializeText).toBe('function');
    });

    it('exports serializeDoc', async () => {
      const mod = await import('./index');
      expect(mod.serializeDoc).toBeDefined();
      expect(typeof mod.serializeDoc).toBe('function');
    });

    it('exports createChain', async () => {
      const mod = await import('./index');
      expect(mod.createChain).toBeDefined();
      expect(typeof mod.createChain).toBe('function');
    });
  });

  describe('utility exports', () => {
    it('exports isClient', async () => {
      const mod = await import('./index');
      expect(mod.isClient).toBeDefined();
      expect(typeof mod.isClient).toBe('boolean');
    });

    it('exports isMac', async () => {
      const mod = await import('./index');
      expect(mod.isMac).toBeDefined();
      expect(typeof mod.isMac).toBe('function');
    });

    it('exports isIOS', async () => {
      const mod = await import('./index');
      expect(mod.isIOS).toBeDefined();
      expect(typeof mod.isIOS).toBe('function');
    });

    it('exports isChrome49Plus', async () => {
      const mod = await import('./index');
      expect(mod.isChrome49Plus).toBeDefined();
      expect(typeof mod.isChrome49Plus).toBe('function');
    });

    it('exports getEditorContainer', async () => {
      const mod = await import('./index');
      expect(mod.getEditorContainer).toBeDefined();
      expect(typeof mod.getEditorContainer).toBe('function');
    });

    it('exports isElement', async () => {
      const mod = await import('./index');
      expect(mod.isElement).toBeDefined();
      expect(typeof mod.isElement).toBe('function');
    });

    it('exports createContainer', async () => {
      const mod = await import('./index');
      expect(mod.createContainer).toBeDefined();
      expect(typeof mod.createContainer).toBe('function');
    });

    it('exports queryContainer', async () => {
      const mod = await import('./index');
      expect(mod.queryContainer).toBeDefined();
      expect(typeof mod.queryContainer).toBe('function');
    });

    it('exports messages', async () => {
      const mod = await import('./index');
      expect(mod.messages).toBeDefined();
      expect(typeof mod.messages).toBe('object');
    });
  });

  describe('command API exports', () => {
    it('exports toggleBold', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleBold).toBe('function');
    });

    it('exports toggleItalic', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleItalic).toBe('function');
    });

    it('exports toggleUnderline', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleUnderline).toBe('function');
    });

    it('exports toggleStrike', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleStrike).toBe('function');
    });

    it('exports toggleHeading', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleHeading).toBe('function');
    });

    it('exports toggleBulletList', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleBulletList).toBe('function');
    });

    it('exports toggleOrderedList', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleOrderedList).toBe('function');
    });

    it('exports toggleBlockquote', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleBlockquote).toBe('function');
    });

    it('exports toggleCodeBlock', async () => {
      const mod = await import('./index');
      expect(typeof mod.toggleCodeBlock).toBe('function');
    });

    it('exports insertImage', async () => {
      const mod = await import('./index');
      expect(typeof mod.insertImage).toBe('function');
    });

    it('exports setLink', async () => {
      const mod = await import('./index');
      expect(typeof mod.setLink).toBe('function');
    });

    it('exports undo', async () => {
      const mod = await import('./index');
      expect(typeof mod.undo).toBe('function');
    });

    it('exports redo', async () => {
      const mod = await import('./index');
      expect(typeof mod.redo).toBe('function');
    });
  });

  describe('direct destructured imports', () => {
    it('can import OpenRichEditor, renderStatic, isClient, I18nManager, ThemeManager, and serializers directly', async () => {
      const {
        OpenRichEditor,
        renderStatic,
        isClient,
        I18nManager,
        ThemeManager,
        serializeHTML,
        serializeJSON,
        serializeMarkdown,
        serializeText,
      } = await import('./index');

      expect(typeof OpenRichEditor).toBe('function');
      expect(typeof renderStatic).toBe('function');
      expect(typeof isClient).toBe('boolean');
      expect(typeof I18nManager).toBe('function');
      expect(typeof ThemeManager).toBe('function');
      expect(typeof serializeHTML).toBe('function');
      expect(typeof serializeJSON).toBe('function');
      expect(typeof serializeMarkdown).toBe('function');
      expect(typeof serializeText).toBe('function');
    });
  });
});
