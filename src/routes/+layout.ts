import type { LayoutLoad } from './$types';
import { normalizeLocale } from '$lib/locale.js';

export const load: LayoutLoad = async ({ url }) => {
  const locale = normalizeLocale(url.searchParams.get('l'));
  const sfw = url.searchParams.get('sfw') === '1';
  return { locale, sfw };
};
