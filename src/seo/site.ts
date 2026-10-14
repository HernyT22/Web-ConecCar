import { BRAND_NAME, SITE_URL } from '@/data/contact';

export { BRAND_NAME, SITE_URL };

/** Head global de index.html (lo conservan /ayuda y el fallback de Home). */
export const DEFAULT_TITLE = `${BRAND_NAME} — Alquiler de vehículos premium en Mendoza, Argentina`;
export const DEFAULT_DESCRIPTION =
  'Alquiler de vehículos premium en Mendoza para viajeros de negocios y visitantes de todo el mundo. Atención bilingüe, precios transparentes, sin sorpresas.';

export const THEME_COLOR = '#091628';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

export const ogImageUrl = (slug?: string): string =>
  `${SITE_URL}/og/${slug ?? 'home'}.jpg`;

export const OG_DEFAULT = ogImageUrl();
