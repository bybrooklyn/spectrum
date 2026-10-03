import { writable, type Writable } from 'svelte/store';
import type { Translation, TranslateFn } from './locale-types.js';
import en from './translations/en.js';
import pl from './translations/pl.js';
import de from './translations/de.js';
import ar from './translations/ar.js';
import pt from './translations/pt.js';

export const locales: Record<string, Translation> = { en, pl, de, ar, pt };

export const locale: Writable<string> = writable('en');

function lookup(translations: unknown, key: string): string {
  let cur: unknown = translations;
  for (const k of key.split('.')) {
    if (typeof cur !== 'object' || cur === null || !(k in cur)) return '';
    cur = (cur as Record<string, unknown>)[k];
  }
  return typeof cur === 'string' ? cur : '';
}

export function translateFor(loc: string, key: string): string {
  return lookup(locales[loc] ?? {}, key) || lookup(en, key) || '';
}

/** Clean a raw `?l=` value: known locales pass, anything else becomes 'en'. */
export function normalizeLocale(raw: string | null | undefined): string {
  const loc = (raw ?? '').trim().toLowerCase();
  return locales[loc] !== undefined ? loc : 'en';
}

export function isRtl(loc: string): boolean {
  return Boolean(locales[loc]?.rtl);
}

/** Human words for a slider value: anchor label, or unset. */
export function axisValueText(t: TranslateFn, id: string, value: number): string {
  if (value === 0) return t('scale.unset');
  if (value <= 2) return t(`axes.${id}.farLeft`);
  if (value <= 4) return t(`axes.${id}.left`);
  if (value === 5) return t(`axes.${id}.middle`);
  if (value <= 7) return t(`axes.${id}.right`);
  return t(`axes.${id}.farRight`);
}
