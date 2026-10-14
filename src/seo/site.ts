import { BRAND_NAME, SITE_URL } from '@/data/contact';

export { BRAND_NAME, SITE_URL };

export const THEME_COLOR = '#091628';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const absoluteUrl = (path: string): string =>
  /^https?:\/\//.test(path) ? path : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

export const ogImageUrl = (slug?: string): string =>
  `${SITE_URL}/og/${slug ?? 'home'}.jpg`;

export const OG_DEFAULT = ogImageUrl();
