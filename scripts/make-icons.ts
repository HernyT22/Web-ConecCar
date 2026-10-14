/**
 * scripts/make-icons.ts
 * Genera favicons y site.webmanifest en public/ desde el logo transparente.
 * Run: npm run make:icons
 */
import { writeFileSync } from 'node:fs';
import sharp from 'sharp';

const SRC = 'src/imports/coneccar-logo-transparent.webp';
const NAVY = '#091628';

const square = (size: number) =>
  sharp(SRC).resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

await square(48).png().toFile('public/favicon-48.png');
await square(192).png().toFile('public/favicon-192.png');
// iOS no admite transparencia: se aplana sobre el navy de marca.
await square(180).flatten({ background: NAVY }).png().toFile('public/apple-touch-icon.png');

writeFileSync(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Coneccar Rent',
      short_name: 'Coneccar',
      start_url: '/',
      display: 'browser',
      theme_color: NAVY,
      background_color: NAVY,
      icons: [{ src: '/favicon-192.png', sizes: '192x192', type: 'image/png' }],
    },
    null,
    2,
  ) + '\n',
);
console.log('icons OK');
