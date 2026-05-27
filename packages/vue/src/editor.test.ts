import { describe, it, expect, vi } from 'vitest';

// Mock the .vue SFC so Vite doesn't need a Vue SFC compiler during tests.
vi.mock('./editor.vue', () => ({ default: {} }));

import * as exports from './index';

describe('@openrich/vue', () => {
  it('exports OpenRichEditor', () => {
    expect(exports.OpenRichEditor).toBeDefined();
  });

  it('exports useEditor', () => {
    expect(exports.useEditor).toBeDefined();
  });
});
