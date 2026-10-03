import { axisIds, nsfwAxisIds, UNSET_VALUE, type AxisValues } from './config.js';

/**
 * Share-code format, same scheme as the original (vanilla) site:
 * the 11 axis values (each 0-9, 0 = unset) are joined into one decimal
 * string, then base-converted to base62. Codes are always CODE_LENGTH
 * chars long (padded with leading zeros), e.g. "wbWN"-style short codes.
 *
 * Breaking change vs v1: v1 encoded 7 axes into 4 chars; v2 encodes
 * 11 axes into 7 chars, so old 4-char links 404 instead of decoding
 * to wrong values.
 */

export const CODE_LENGTH = 7;

/** Alphabet identical to the vanilla site (first 62 chars are emitted). */
const RANGE = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split('');

// https://stackoverflow.com/a/32480941 (as in the original helpers.js)
export const convertBase = function (value: string | number, fromBase: number, toBase: number): string {
  const fromRange = RANGE.slice(0, fromBase);
  const toRange = RANGE.slice(0, toBase);

  const decValue = `${value}`.split('').reverse().reduce(function (carry, digit, index) {
    if (fromRange.indexOf(digit) === -1) {
      throw new Error(`Invalid digit "${digit}" for base ${fromBase}.`);
    }

    return (carry += fromRange.indexOf(digit) * Math.pow(fromBase, index));
  }, 0);

  let newValue = '';
  let rest = decValue;
  while (rest > 0) {
    newValue = toRange[rest % toBase] + newValue;
    rest = (rest - (rest % toBase)) / toBase;
  }

  return newValue || '0';
};

export function encodeValues(valuesById: AxisValues): string {
  const digits = axisIds
    .map((id) => {
      const v = valuesById[id] ?? UNSET_VALUE;
      if (!Number.isInteger(v) || v < 0 || v > 9) {
        throw new Error(`Invalid value "${v}" for axis "${id}"`);
      }
      return String(v);
    })
    .join('');
  return convertBase(digits, 10, 62).padStart(CODE_LENGTH, '0');
}

export function decodeCode(code: string): AxisValues {
  if (typeof code !== 'string' || !/^[0-9A-Za-z]{7}$/.test(code)) {
    throw new Error(`Invalid code "${code}"`);
  }
  const digits = convertBase(code, 62, 10).padStart(axisIds.length, '0');
  if (!new RegExp(`^[0-9]{${axisIds.length}}$`).test(digits)) {
    throw new Error(`Invalid code "${code}"`);
  }
  const out: AxisValues = {};
  axisIds.forEach((id, i) => {
    out[id] = parseInt(digits[i] as string, 10);
  });
  return out;
}

/** SFW mode: NSFW axes are forced to 0 so they carry no information. */
export function applySfw(valuesById: AxisValues, sfw: boolean): AxisValues {
  if (!sfw) return { ...valuesById };
  const out: AxisValues = { ...valuesById };
  for (const id of nsfwAxisIds) out[id] = UNSET_VALUE;
  return out;
}
