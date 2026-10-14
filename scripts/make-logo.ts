/**
 * scripts/make-logo.ts
 * Variantes del logo que usan Nav y Footer (se muestra a 64-80 px): 128 y 256 px, q80.
 * Se parte de coneccar-logo.webp (el que importan los componentes); la transparencia
 * se conserva tal cual venga en el original. El original no se modifica.
 * Run: npm run make:logo
 */
import { statSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'src/imports/coneccar-logo.webp';
for (const w of [128, 256]) {
  const out = `src/imports/logo-${w}.webp`;
  await sharp(SRC).resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(out);
  console.log(`${out}  ${(statSync(out).size / 1024).toFixed(1)} KB`);
}
