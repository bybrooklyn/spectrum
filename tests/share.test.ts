import { describe, test, expect } from 'bun:test';
import { encodeValues, decodeCode, applySfw, convertBase, CODE_LENGTH } from '../src/lib/share.js';
import { axisIds } from '../src/lib/config.js';

describe('share encoding (vanilla base62 scheme)', () => {
  test(`code length is fixed (${CODE_LENGTH} chars for ${axisIds.length} axes)`, () => {
    expect(axisIds.length).toBe(11);
    expect(CODE_LENGTH).toBe(7);
  });

  test('round-trips default values', () => {
    const values = Object.fromEntries(axisIds.map((id) => [id, 5]));
    const code = encodeValues(values);
    expect(code).toMatch(/^[0-9A-Za-z]{7}$/);
    expect(decodeCode(code)).toEqual(values);
  });

  test('round-trips mixed values including unset', () => {
    const values = Object.fromEntries(axisIds.map((id, i) => [id, i % 10]));
    const code = encodeValues(values);
    expect(code).toMatch(/^[0-9A-Za-z]{7}$/);
    expect(decodeCode(code)).toEqual(values);
  });

  test('all-unset encodes to zeros and back', () => {
    const values = Object.fromEntries(axisIds.map((id) => [id, 0]));
    expect(encodeValues(values)).toBe('0'.repeat(CODE_LENGTH));
    expect(decodeCode('0'.repeat(CODE_LENGTH))).toEqual(values);
  });

  test('rejects bad codes (incl. old v1 4-char links)', () => {
    expect(() => decodeCode('wbWN')).toThrow();
    expect(() => decodeCode('1234')).toThrow();
    expect(() => decodeCode('abcdefghijk')).toThrow();
    expect(() => decodeCode('')).toThrow();
    expect(() => decodeCode('ab!defg')).toThrow();
  });

  test('rejects out-of-range values', () => {
    const values = Object.fromEntries(axisIds.map((id) => [id, 5]));
    expect(() => encodeValues({ ...values, [axisIds[0]]: 10 })).toThrow();
    expect(() => encodeValues({ ...values, [axisIds[0]]: -1 })).toThrow();
  });

  test('SFW mode forces NSFW axes to 0', () => {
    const values = Object.fromEntries(axisIds.map((id) => [id, 7]));
    const sfw = applySfw(values, true);
    const code = encodeValues(sfw);
    const decoded = decodeCode(code);
    // genderIdentity is SFW, sexualOrientation is NSFW
    expect(decoded.genderIdentity).toBe(7);
    expect(decoded.sexualOrientation).toBe(0);
    expect(decoded.kinkRole).toBe(0);
    expect(decoded.sexualExploration).toBe(0);
  });

  test('overflow codes that decode past 11 digits are rejected', () => {
    // 'zzzzzzz' is valid base62 but decodes beyond the 11-digit space.
    expect(convertBase('zzzzzzz', 62, 10).length).toBeGreaterThan(11);
    expect(() => decodeCode('zzzzzzz')).toThrow();
  });

  test('convertBase rejects invalid digits', () => {
    expect(() => convertBase('!', 10, 62)).toThrow();
    expect(() => convertBase('abc', 10, 62)).toThrow();
  });

  test('missing keys encode as unset, applySfw(false) copies', () => {
    expect(decodeCode(encodeValues({}))).toEqual(Object.fromEntries(axisIds.map((id) => [id, 0])));
    const values = Object.fromEntries(axisIds.map((id) => [id, 4]));
    const out = applySfw(values, false);
    expect(out).toEqual(values);
    expect(out).not.toBe(values);
  });
});
