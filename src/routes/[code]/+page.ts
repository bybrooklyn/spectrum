import { decodeCode } from '$lib/share.js';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, url }) => {
  try {
    const values = decodeCode(params.code);
    return {
      code: params.code,
      values,
      locale: url.searchParams.get('l') || 'en',
      sfw: url.searchParams.get('sfw') === '1'
    };
  } catch {
    throw error(404, 'Not found');
  }
};
