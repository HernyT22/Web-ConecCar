/**
 * scripts/make-og.ts
 * Genera public/og/home.jpg y public/og/<slug>.jpg (1200x630, JPG, <=300 KB).
 * Fuente de cada ficha: primera imagen en src/data/vehicles.ts.
 * Run: npm run make:og
 */
import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';
import { vehicles } from '../src/data/vehicles';

const W = 1200;
const H = 630;
const NAVY = '#091628';
const MAX_BYTES = 300 * 1024;

// Fichas cuyo recorte 'cover' corta el vehículo (revisado a ojo): se encuadran enteras.
const CONTAIN_SLUGS = new Set(['citroen-basalt-shine-2026-a']);

mkdirSync('public/og', { recursive: true });

// vehicles.ts expone variantes ("/src/imports/vehicles/<nombre>-1200.webp"); el OG se genera
// siempre desde el ORIGINAL de src/imports/<nombre>.<ext>, no desde las variantes.
const originalOf = (variantUrl: string) => {
  const name = variantUrl.split('/').pop()!.replace(/-\d+\.webp$/, '');
  const file = readdirSync('src/imports').find((f) => f.replace(/\.[^.]+$/, '') === name);
  if (!file) throw new Error(`make-og: no se encontró el original de ${name}`);
  return join('src/imports', file);
};

async function render(input: string, out: string, mode: 'cover' | 'contain') {
  for (const quality of [82, 75, 68, 60, 52]) {
    const img = sharp(input).resize(
      mode === 'cover'
        ? { width: W, height: H, fit: 'cover', position: sharp.strategy.attention }
        : { width: W, height: H, fit: 'contain', background: NAVY },
    );
    await img.jpeg({ quality, mozjpeg: true }).toFile(out);
    if (statSync(out).size <= MAX_BYTES) break;
  }
  console.log(`${out}  ${Math.round(statSync(out).size / 1024)} KB  (${mode})`);
}

await render('src/imports/hero-cordillera-mendoza.webp', 'public/og/home.jpg', 'cover');
for (const v of vehicles) {
  const src = originalOf(v.images[0].src);
  const meta = await sharp(src).metadata();
  // Fuentes verticales (alto > ancho) se encuadran enteras sobre fondo navy.
  const vertical = (meta.height ?? 0) > (meta.width ?? 0);
  await render(src, `public/og/${v.slug}.jpg`, vertical || CONTAIN_SLUGS.has(v.slug) ? 'contain' : 'cover');
}
