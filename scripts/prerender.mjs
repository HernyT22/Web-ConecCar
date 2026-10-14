/**
 * scripts/prerender.mjs
 * SSG propio: toma dist/index.html (plantilla del build cliente) y el bundle SSR
 * (dist-ssr/entry-server.js) y genera un HTML por ruta + 404.html.
 *
 *   /            -> dist/index.html
 *   /ayuda       -> dist/ayuda.html
 *   /flota/<slug>-> dist/flota/<slug>.html
 *   (404)        -> dist/404.html
 *
 * No carga GA ni usa red. Las aserciones finales hacen fallar el build.
 * Variables opcionales: DIST_DIR (default "dist"), SSR_DIR (default "dist-ssr").
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const DIST = resolve(process.env.DIST_DIR ?? 'dist');
const SSR = resolve(process.env.SSR_DIR ?? 'dist-ssr');
const SITE_URL = 'https://coneccar-rent.com';

const { render, headFor, ROUTES } = await import(pathToFileURL(join(SSR, 'entry-server.js')).href);

const template = readFileSync(join(DIST, 'index.html'), 'utf8');
if (!template.includes('<div id="root"></div>')) {
  throw new Error('dist/index.html no es la plantilla CSR (¿falta correr "vite build"?)');
}

const NOSCRIPT =
  '<noscript><style>[style*="opacity:0"]{opacity:1!important;transform:none!important}</style></noscript>';

const escAttr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const escText = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const attrs = (o) => Object.entries(o).map(([k, v]) => `${k}="${escAttr(v)}"`).join(' ');

const stripTitle = (html) => html.replace(/\s*<title>[\s\S]*?<\/title>/, '');
const stripDescription = (html) => html.replace(/\s*<meta name="description"[^>]*>/, '');
const inHead = (html, extra) => html.replace('</head>', `${extra}\n    </head>`);

function headMarkup(head) {
  return [
    `<title data-seo="1">${escText(head.title)}</title>`,
    ...head.meta.map((m) => `<meta ${attrs(m)} data-seo="1">`),
    ...head.link.map((l) => `<link ${attrs(l)} data-seo="1">`),
    ...head.jsonLd.map(
      (j) =>
        `<script type="application/ld+json" data-seo="1">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`,
    ),
  ]
    .map((l) => `      ${l}`)
    .join('\n');
}

function outPath(url) {
  if (url === '/') return join(DIST, 'index.html');
  return join(DIST, `${url.slice(1)}.html`);
}

// Preload de las 2 fuentes críticas (Libre Baskerville 700 = títulos, Plus Jakarta
// Sans 400 = cuerpo), resolviendo el nombre hasheado real en dist/assets.
const PRELOAD_FONTS = ['libre-baskerville-latin-700-normal', 'plus-jakarta-sans-latin-400-normal'].map((base) => {
  const file = readdirSync(join(DIST, 'assets')).find((f) => f.startsWith(`${base}-`) && f.endsWith('.woff2'));
  if (!file) throw new Error(`prerender: no se encontró el woff2 de ${base} en dist/assets`);
  return `/assets/${file}`;
});
const preloadMarkup = PRELOAD_FONTS.map(
  (href) => `<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`,
).join('\n      ');
const withPreload = (html) => html.replace('<script type="module"', `${preloadMarkup}\n      <script type="module"`);

const pages = [];

for (const url of ROUTES) {
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
  const head = headFor(url);
  if (head) {
    html = inHead(stripDescription(stripTitle(html)), headMarkup(head));
  } else {
    // /ayuda: conserva title/description de index.html; solo suma canonical.
    const canonical = { rel: 'canonical', href: `${SITE_URL}${url}` };
    html = inHead(html, `      <link ${attrs(canonical)} data-seo="1">`);
  }
  html = inHead(html, `      ${NOSCRIPT}`);
  html = withPreload(html);
  pages.push({ url, file: outPath(url), html, kind: 'page' });
}

// 404: sin app (no se carga el JS, que redirigiría a "/"), noindex y sin canonical.
{
  let html = template.replace('<div id="root"></div>', `<main class="min-h-screen bg-navy-950 text-white flex items-center justify-center p-8">
        <div class="text-center max-w-md">
          <h1 class="font-display text-3xl mb-3">Página no encontrada</h1>
          <p class="text-white/70 mb-6">La página que buscás no existe o cambió de lugar.</p>
          <p class="flex gap-6 justify-center">
            <a href="/" class="underline">Ir al inicio</a>
            <a href="/#fleet" class="underline">Ver la flota</a>
          </p>
        </div>
      </main>`);
  html = html.replace(/\s*<script[\s\S]*?<\/script>/g, '');
  html = stripDescription(stripTitle(html));
  html = inHead(
    html,
    [
      '      <title>Página no encontrada · Coneccar Rent</title>',
      '      <meta name="robots" content="noindex,follow">',
    ].join('\n'),
  );
  pages.push({ url: '/404', file: join(DIST, '404.html'), html, kind: '404' });
}

for (const p of pages) {
  mkdirSync(dirname(p.file), { recursive: true });
  writeFileSync(p.file, p.html);
}

// ---------------------------------------------------------------- aserciones
const errors = [];
const fail = (page, msg) => errors.push(`${page.url}: ${msg}`);
const count = (html, re) => (html.match(re) ?? []).length;

if (pages.length !== 11) errors.push(`se esperaban 11 HTML y hay ${pages.length}`);

for (const p of pages) {
  const { html } = p;
  const is404 = p.kind === '404';
  if (!existsSync(p.file)) fail(p, 'archivo no generado');
  if (!/<html lang="es"/.test(html)) fail(p, 'falta <html lang="es">');
  if (count(html, /<title[\s>]/g) !== 1) fail(p, `<title> = ${count(html, /<title[\s>]/g)} (se espera 1)`);
  if (!is404 && count(html, /<meta name="description"/g) !== 1)
    fail(p, `meta description = ${count(html, /<meta name="description"/g)} (se espera 1)`);
  if (!is404 && count(html, /<h1[\s>]/g) !== 1) fail(p, `<h1> = ${count(html, /<h1[\s>]/g)} (se espera 1)`);
  if (is404) {
    if (/rel="canonical"/.test(html)) fail(p, '404 no debe tener canonical');
    if (!/<meta name="robots" content="noindex,follow">/.test(html)) fail(p, '404 sin noindex,follow');
    if (!html.includes('href="/"') || !html.includes('href="/#fleet"')) fail(p, '404 sin enlaces a Home y flota');
  } else {
    const expected = `${SITE_URL}${p.url === '/' ? '/' : p.url}`;
    const canon = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
    if (canon.length !== 1 || canon[0] !== expected) fail(p, `canonical ${JSON.stringify(canon)} != ${expected}`);
  }
  // fuentes precargadas (solo páginas con app)
  if (!is404) {
    for (const href of PRELOAD_FONTS) {
      if (!html.includes(`<link rel="preload" as="font" type="font/woff2" href="${href}" crossorigin>`))
        fail(p, `falta preload de ${href}`);
    }
  }
  // assets referenciados
  const assets = new Set([...html.matchAll(/\/assets\/[^"'\s,)<>]+/g)].map((m) => m[0]));
  for (const a of assets) {
    if (!existsSync(join(DIST, decodeURI(a.split('?')[0])))) fail(p, `asset inexistente: ${a}`);
  }
  // JSON-LD parseable
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      fail(p, `JSON-LD inválido: ${e.message}`);
    }
  }
  // imágenes con alt
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt=/.test(m[0])) fail(p, `<img> sin alt: ${m[0].slice(0, 100)}`);
  }
  if (html.includes('[KW-PENDIENTE]')) fail(p, 'contiene [KW-PENDIENTE] literal');
}

if (errors.length) {
  console.error(`prerender: ${errors.length} aserción(es) fallida(s):\n - ${errors.join('\n - ')}`);
  process.exit(1);
}
console.log(`prerender OK: ${pages.length} HTML (${pages.map((p) => p.url).join(', ')})`);
