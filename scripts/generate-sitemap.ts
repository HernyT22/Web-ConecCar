/**
 * scripts/generate-sitemap.ts
 * Genera dist/sitemap.xml DESPUÉS del prerender (último paso de "build").
 *
 * - Lee los HTML de dist/ (excluye 404.html) y toma el <link rel="canonical">
 *   de cada uno como <loc>: el sitemap y el canonical no pueden divergir.
 * - Sin lastmod, changefreq ni priority; sin hreflang (solo ES indexable).
 *
 * Run: npm run sitemap  (requiere dist/ ya prerenderizado)
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve(process.env.DIST_DIR ?? 'dist');
const SITE_URL = 'https://coneccar-rent.com';

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return name === 'assets' ? [] : htmlFiles(full);
    return name.endsWith('.html') && name !== '404.html' ? [full] : [];
  });
}

const locs = htmlFiles(DIST).map((file) => {
  const html = readFileSync(file, 'utf8');
  const m = html.match(/<link rel="canonical" href="([^"]+)"/);
  if (!m) throw new Error(`sitemap: ${file} no tiene canonical`);
  if (!m[1].startsWith(`${SITE_URL}/`)) throw new Error(`sitemap: canonical fuera del dominio en ${file}: ${m[1]}`);
  return m[1];
});

// "/" primero y el resto en orden alfabético (salida estable entre builds).
locs.sort((a, b) => (a === `${SITE_URL}/` ? -1 : b === `${SITE_URL}/` ? 1 : a.localeCompare(b)));

const urlset = locs.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join('\n');
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

writeFileSync(join(DIST, 'sitemap.xml'), xml, 'utf-8');
console.log(`dist/sitemap.xml generado con ${locs.length} URLs.`);
