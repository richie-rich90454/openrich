import { describe, it, expect } from 'vitest';
import { useEditor } from './use-editor';

describe('useEditor', () => {
  it('is a function', () => {
    expect(typeof useEditor).toBe('function');
  });
});
