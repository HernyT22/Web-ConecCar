import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';

const SRC_DIR = 'src/imports';
const TARGETS = [
  { suffix: '-sm', width: 480 },
  { suffix: '-md', width: 800 },
  { suffix: '-lg', width: 1200 },
];

const files = await readdir(SRC_DIR);
const destFiles = files.filter(
  (f) =>
    /\.(webp|jpe?g|png)$/i.test(f) &&
    !/-(?:sm|md|lg)\./.test(f) &&
    /(valle|san-rafael|malargue|gran-mendoza|potrerillos|atuel)/i.test(f),
);

console.log(`Destinos detectados (${destFiles.length}):`);
destFiles.forEach((f) => console.log(`  ${f}`));

for (const file of destFiles) {
  const { name } = parse(file);
  const inPath = join(SRC_DIR, file);
  const before = (await stat(inPath)).size;
  console.log(`\n${file}  (${(before / 1024).toFixed(0)}KB)`);

  for (const { suffix, width } of TARGETS) {
    const outPath = join(SRC_DIR, `${name}${suffix}.webp`);
    try { await stat(outPath); console.log(`  SKIP ${name}${suffix}.webp (ya existe)`); continue; } catch {}
    await sharp(inPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(outPath);
    const after = (await stat(outPath)).size;
    console.log(`  → ${name}${suffix}.webp  ${width}px  ${(after / 1024).toFixed(0)}KB`);
  }
}

console.log('\nListo.');
