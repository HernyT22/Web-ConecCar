import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC_DIR = 'src/imports';
const QUALITY = 80;
const MAX_WIDTH = 1920;
const SKIP = new Set(['whatsapp.png']);

const entries = await readdir(SRC_DIR, { withFileTypes: true });
const images = entries
  .filter((e) => e.isFile() && /\.(jpe?g|png)$/i.test(e.name) && !SKIP.has(e.name))
  .map((e) => e.name);

console.log(`Convirtiendo ${images.length} imágenes a WebP...`);

let totalBefore = 0;
let totalAfter = 0;
const converted = [];

for (const file of images) {
  const inPath = join(SRC_DIR, file);
  const { name } = parse(file);
  const outPath = join(SRC_DIR, `${name}.webp`);

  // skip if webp already exists (re-run safety)
  try { await stat(outPath); console.log(`  SKIP (exists): ${name}.webp`); converted.push(inPath); continue; } catch {}


  const before = (await stat(inPath)).size;
  totalBefore += before;

  await sharp(inPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(outPath);

  const after = (await stat(outPath)).size;
  totalAfter += after;

  const ratio = ((1 - after / before) * 100).toFixed(1);
  console.log(`  ${file} → ${name}.webp  (${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB, -${ratio}%)`);

  converted.push(inPath);
}

console.log(`\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB → ${(totalAfter / 1024 / 1024).toFixed(2)}MB`);
console.log(`Reducción: ${((1 - totalAfter / totalBefore) * 100).toFixed(1)}%`);

console.log('\nEliminando originales...');
let deleted = 0;
for (const p of converted) {
  try {
    await unlink(p);
    deleted++;
  } catch (e) {
    console.warn(`  SKIP (locked): ${p}`);
  }
}
console.log(`  ${deleted}/${converted.length} originales eliminados.`);
