import { decodeCode } from '$lib/share.js';
import { normalizeLocale } from '$lib/locale.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
  try {
    const values = decodeCode(params.code);
    return {
      code: params.code,
      values,
      locale: normalizeLocale(url.searchParams.get('l')),
      sfw: url.searchParams.get('sfw') === '1'
    };
  } catch {
    throw error(404, 'Not found');
  }
};
