/**
 * scripts/make-hero.ts
 * Variantes responsive del hero (Home) y fondo liviano de la ficha, en src/imports/.
 * El original (hero-cordillera-mendoza.webp) no se modifica.
 * Run: npm run make:hero
 */
import { statSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'src/imports/hero-cordillera-mendoza.webp';

for (const w of [640, 1024, 1600]) {
  const out = `src/imports/hero-${w}.webp`;
  await sharp(SRC).resize({ width: w }).webp({ quality: 75 }).toFile(out);
  console.log(`${out}  ${Math.round(statSync(out).size / 1024)} KB`);
}

// Fondo decorativo de la ficha (va bajo un overlay navy al 85 %): ≤1024 px y ≤80 KB.
const BG = 'src/imports/hero-bg-lite.webp';
const MAX = 80 * 1024;
for (const quality of [60, 50, 40, 30, 22]) {
  await sharp(SRC).resize({ width: 1024 }).webp({ quality }).toFile(BG);
  if (statSync(BG).size <= MAX) break;
}
console.log(`${BG}  ${Math.round(statSync(BG).size / 1024)} KB`);
