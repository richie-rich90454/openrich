import { describe, it, expect, vi } from 'vitest';

// Mock the Solid-specific modules to avoid needing a Solid JSX transform.
vi.mock('./editor', () => ({ Editor: {} }));
vi.mock('./create-editor', () => ({ createEditor: {} }));

import * as exports from './index';

describe('@openrich/solid', () => {
  it('exports Editor', () => {
    expect(exports.Editor).toBeDefined();
  });

  it('exports createEditor', () => {
    expect(exports.createEditor).toBeDefined();
  });
});
