import { describe, it, expect } from 'vitest';
import { isClient } from './is-client';

describe('isClient', () => {
  it('should be true in test environment (happy-dom)', () => {
    expect(isClient).toBe(true);
  });

  it('should return a boolean', () => {
    expect(typeof isClient).toBe('boolean');
  });
});
