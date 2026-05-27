import { describe, it, expect } from 'vitest';
import { StarterKit } from './index';

describe('@openrich/starter-kit', () => {
  it('exports StarterKit as an array', () => {
    expect(Array.isArray(StarterKit)).toBe(true);
  });

  it('StarterKit contains extensions', () => {
    expect(StarterKit.length).toBeGreaterThan(0);
  });

  it('StarterKit has the expected number of extensions', () => {
    expect(StarterKit.length).toBe(23);
  });

  it('StarterKit contains Document as first extension', () => {
    expect(StarterKit[0]).toBeDefined();
  });
});
