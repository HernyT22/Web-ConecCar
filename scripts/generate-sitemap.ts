/**
 * scripts/generate-sitemap.ts
 * Genera public/sitemap.xml para coneccar-rent.com.
 *
 * - Rutas: '/', '/flota/:slug', '/ayuda'. Catch-all '*' no se lista (redirect).
 * - El idioma NO va en la URL (i18next resuelve client-side) → una sola
 *   entrada por ruta, sin hreflang.
 * - Los slugs de /flota/:slug salen de src/data/vehicles.ts.
 *
 * Run: npx tsx scripts/generate-sitemap.ts
 */

import { writeFileSync } from 'node:fs';
import { vehicles } from '../src/data/vehicles';

const SITE_URL = 'https://coneccar-rent.com';

type Route = { path: string; changefreq: string; priority: number };

const staticRoutes: Route[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  { path: '/ayuda', changefreq: 'monthly', priority: 0.4 },
];

const vehicleRoutes: Route[] = vehicles.map((v) => ({
  path: `/flota/${v.slug}`,
  changefreq: 'weekly',
  priority: 0.8,
}));

const routes = [...staticRoutes, ...vehicleRoutes];
const today = new Date().toISOString().split('T')[0];

const urlset = routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const outputPath = new URL('../public/sitemap.xml', import.meta.url);
writeFileSync(outputPath, xml, 'utf-8');

console.log(
  `sitemap.xml generado con ${routes.length} URLs (${staticRoutes.length} estáticas + ${vehicleRoutes.length} de flota).`
);
