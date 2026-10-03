import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  const locale = url.searchParams.get('l') || 'en';
  const sfw = url.searchParams.get('sfw') === '1';
  return { locale, sfw };
};
