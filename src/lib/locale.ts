import { derived, writable, type Writable, type Readable } from 'svelte/store';
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

export const t: Readable<TranslateFn> = derived(locale, ($locale) => (key: string) => translateFor($locale, key));

export function isRtl(loc: string): boolean {
  return Boolean(locales[loc]?.rtl);
}
