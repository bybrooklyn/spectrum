import { describe, test, expect } from 'bun:test';
import { locales, translateFor, normalizeLocale, isRtl, axisValueText } from '../src/lib/locale.js';

describe('normalizeLocale', () => {
  test('known locales pass through', () => {
    for (const loc of Object.keys(locales)) {
      expect(normalizeLocale(loc)).toBe(loc);
    }
  });

  test('unknown, empty, and sloppy values become en', () => {
    expect(normalizeLocale('xx')).toBe('en');
    expect(normalizeLocale('')).toBe('en');
    expect(normalizeLocale(null)).toBe('en');
    expect(normalizeLocale(undefined)).toBe('en');
    expect(normalizeLocale('EN')).toBe('en');
    expect(normalizeLocale(' pl ')).toBe('pl');
    expect(normalizeLocale('en-US')).toBe('en');
  });
});

describe('translateFor fallback', () => {
  test('unknown locale falls back to en per key', () => {
    expect(translateFor('xx', 'title')).toBe(translateFor('en', 'title'));
  });

  test('partial locales fall back per key', () => {
    // sexualAttraction only exists in en.
    expect(translateFor('pl', 'axes.sexualAttraction.label')).toBe(
      translateFor('en', 'axes.sexualAttraction.label')
    );
  });

  test('missing keys resolve to empty string', () => {
    expect(translateFor('en', 'nope.missing')).toBe('');
  });
});

describe('isRtl', () => {
  test('only ar is RTL', () => {
    expect(isRtl('ar')).toBe(true);
    for (const loc of ['en', 'pl', 'de', 'pt', 'xx']) {
      expect(isRtl(loc)).toBe(false);
    }
  });
});

describe('axisValueText', () => {
  const t = (key: string) => translateFor('en', key);
  test('unset and band mapping', () => {
    expect(axisValueText(t, 'sexualDrive', 0)).toBe(translateFor('en', 'scale.unset'));
    expect(axisValueText(t, 'sexualDrive', 1)).toBe('None');
    expect(axisValueText(t, 'sexualDrive', 3)).toBe('Low');
    expect(axisValueText(t, 'sexualDrive', 5)).toBe('Regular');
    expect(axisValueText(t, 'sexualDrive', 7)).toBe('High');
    expect(axisValueText(t, 'sexualDrive', 9)).toBe('Very high');
  });
});
