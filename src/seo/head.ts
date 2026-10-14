import { formatPrice, type Vehicle } from '@/data/vehicles';
import { PENDING, SLOTS } from './slots';
import { BRAND_NAME, DEFAULT_DESCRIPTION, DEFAULT_TITLE, OG_HEIGHT, OG_WIDTH, SITE_URL, ogImageUrl } from './site';
import { heroPreload, vehiclePreload } from './lcp';
import { autoRental, breadcrumb, car, graph, organization, vehicleName, website } from './jsonld';

export type SeoPage = { kind: 'home' } | { kind: 'vehicle'; vehicle: Vehicle } | { kind: 'notfound' };

export interface HeadContext {
  /** Ruta actual; si falta se deriva de la página. */
  pathname?: string;
  /** Emite console.warn por cada slot pendiente (solo desarrollo). */
  dev?: boolean;
}

export type HeadTag = Record<string, string>;

export interface HeadSpec {
  title: string;
  description: string;
  meta: HeadTag[];
  link: HeadTag[];
  jsonLd: object[];
  /** Preload de la imagen LCP. Solo lo emite el prerender, sin data-seo; Seo.tsx no lo toca. */
  preload: HeadTag[];
}


const warned = new Set<string>();
const pick = (value: string, fallback: string, label: string, ctx: HeadContext): string => {
  if (value !== PENDING) return value;
  if (ctx.dev && !warned.has(label)) {
    warned.add(label);
    console.warn(`[seo] slot ${label} = ${PENDING}; usando fallback provisorio`);
  }
  return fallback;
};

const normalizePath = (pathname: string): string => {
  const clean = pathname.split(/[?#]/)[0] || '/';
  return clean.length > 1 ? clean.replace(/\/+$/, '') || '/' : '/';
};

export function buildHead(page: SeoPage, ctx: HeadContext = {}): HeadSpec {
  if (page.kind === 'notfound') {
    // Ruta inexistente: noindex, sin canonical, sin JSON-LD ni preload.
    const title = `Página no encontrada · ${BRAND_NAME}`;
    return {
      title,
      description: DEFAULT_DESCRIPTION,
      meta: [{ name: 'robots', content: 'noindex,follow' }],
      link: [],
      jsonLd: [],
      preload: [],
    };
  }
  let title: string;
  let description: string;
  let canonicalPath: string;
  let ogImage: string;
  let jsonLd: object[];
  let lcp: HeadTag;

  if (page.kind === 'home') {
    title = pick(SLOTS.home.title, DEFAULT_TITLE, 'home.title', ctx);
    description = pick(SLOTS.home.description, DEFAULT_DESCRIPTION, 'home.description', ctx);
    canonicalPath = ctx.pathname ? normalizePath(ctx.pathname) : '/';
    ogImage = ogImageUrl();
    jsonLd = [graph([organization(), website(), autoRental()])];
    lcp = heroPreload();
  } else {
    const v = page.vehicle;
    const slot = SLOTS.vehicles[v.slug];
    const name = vehicleName(v);
    const fallbackDescription = `${name} · ${v.shortDescription}. Tarifa diaria ${formatPrice(v.pricePerDay, v.currency)}. Alquiler en Mendoza.`;
    title = pick(slot?.title ?? PENDING, `${name} · ${BRAND_NAME}`, `${v.slug}.title`, ctx);
    description = pick(slot?.description ?? PENDING, fallbackDescription, `${v.slug}.description`, ctx);
    canonicalPath = ctx.pathname ? normalizePath(ctx.pathname) : `/flota/${v.slug}`;
    ogImage = ogImageUrl(v.slug);
    const url = `${SITE_URL}${canonicalPath}`;
    jsonLd = [graph([car(v, url), breadcrumb(v, url)])];
    lcp = vehiclePreload(v.images[0]);
  }

  const canonical = canonicalPath === '/' ? `${SITE_URL}/` : `${SITE_URL}${canonicalPath}`;

  const meta: HeadTag[] = [
    { name: 'description', content: description },
    { name: 'robots', content: 'index,follow,max-image-preview:large' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonical },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'es_AR' },
    { property: 'og:site_name', content: BRAND_NAME },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: String(OG_WIDTH) },
    { property: 'og:image:height', content: String(OG_HEIGHT) },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
  ];

  return {
    title,
    description,
    meta,
    link: [{ rel: 'canonical', href: canonical }],
    jsonLd,
    preload: [{ rel: 'preload', as: 'image', ...lcp, fetchpriority: 'high' }],
  };
}
