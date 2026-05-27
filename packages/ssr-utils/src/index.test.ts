import { describe, it, expect } from 'vitest';
import { renderStatic, isClient } from './index';

describe('@openrich/ssr-utils', () => {
  it('exports renderStatic', () => {
    expect(typeof renderStatic).toBe('function');
  });

  it('exports isClient', () => {
    expect(typeof isClient).toBe('boolean');
  });

  it('isClient is true in happy-dom', () => {
    expect(isClient).toBe(true);
  });
});
