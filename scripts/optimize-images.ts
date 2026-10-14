/**
 * scripts/optimize-images.ts
 * Variantes WebP responsive (240, 480, 800 y 1200 px de ANCHO; 240 = miniaturas de la ficha) de las fotos de la flota.
 * - Entrada: originales en src/imports/ (no se modifican ni se mueven).
 * - Salida: src/imports/vehicles/<nombre>-<ancho>.webp + manifest.json (dimensiones reales).
 * - Sin recorte (las vistas usan object-contain) y sin agrandar (si el original es más
 *   angosto que el ancho pedido, la variante conserva el ancho del original).
 * - Calidad 78 (240 px: 75); si la variante de 1200 pasa de 200 KB se baja la calidad hasta cumplir.
 * Run: npm run make:vehicles
 */
import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SOURCES = [
  'citroen-azul-lateral.jpg', 'citroen-azul-detras.webp', 'citroen-azul-interior.webp',
  'cheri-blanco-lateral.jpg', 'cheri-blanco-detras.jpg', 'cheri-blanco-interior.jpg', 'cheri-blanco-baul.jpg',
  'citroen-dark-lateral.webp', 'citroen-dark-detras.jpg', 'citroen-dark-interior.jpg', 'citroen-dark-baul.jpg',
  'citroen-blanco-lateral.webp', 'citroen-blanco-detras.webp', 'citroen-blanco-interior.webp', 'citroen-blanco-baul.webp',
  'cheri-rojo-lateral.webp', 'cheri-rojo-detras.webp', 'cheri-rojo-interior.jpg', 'cheri-rojo-baul.jpg',
  'accord-lateral.jpg', 'accord-frontal.webp', 'accord-detras.webp', 'accord-baul.webp',
  'fox-lateral.jpg', 'fox-detras.webp',
  'kia-rio-lateral.webp', 'kia-rio-detras.webp', 'kia-rio-interior.webp', 'kia-rio-baul.jpg',
];
const WIDTHS = [240, 480, 800, 1200] as const;
const START_QUALITY = 78;
const MAX_1200_BYTES = 200 * 1024;

mkdirSync('src/imports/vehicles', { recursive: true });
const manifest: Record<string, Record<string, { width: number; height: number }>> = {};
const rows: string[] = [];

for (const file of SOURCES) {
  const name = file.replace(/\.[^.]+$/, '');
  const input = `src/imports/${file}`;
  const meta = await sharp(input).metadata();
  manifest[name] = {};
  const sizes: string[] = [];
  for (const w of WIDTHS) {
    const out = `src/imports/vehicles/${name}-${w}.webp`;
    let quality = w === 240 ? 75 : START_QUALITY;
    let info = await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality }).toFile(out);
    while (w === 1200 && statSync(out).size > MAX_1200_BYTES && quality > 40) {
      quality -= 5;
      info = await sharp(input).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality }).toFile(out);
    }
    manifest[name][String(w)] = { width: info.width, height: info.height };
    sizes.push(`${w}:${info.width}x${info.height} ${Math.round(statSync(out).size / 1024)}KB${w !== 240 && quality !== START_QUALITY ? ` q${quality}` : ''}`);
  }
  rows.push(`${file} (${meta.width}x${meta.height} ${Math.round(statSync(input).size / 1024)}KB) -> ${sizes.join(' | ')}`);
}

writeFileSync('src/imports/vehicles/manifest.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(rows.join('\n'));
