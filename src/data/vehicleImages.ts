import manifest from '@/imports/vehicles/manifest.json';

/**
 * Variantes WebP (480/800/1200 px) generadas por scripts/optimize-images.ts.
 * Los URLs hasheados salen de import.meta.glob; las dimensiones, del manifest.
 */
const urls = import.meta.glob<string>('/src/imports/vehicles/*.webp', { eager: true, import: 'default' });

export interface VehicleImage {
  /** Variante más grande (1200 px de ancho, o el ancho del original si es menor). */
  src: string;
  srcSet: string;
  /** Dimensiones intrínsecas de `src` (se usan solo como proporción). */
  width: number;
  height: number;
}

type Variants = Record<string, { width: number; height: number }>;

export function vehicleImage(name: string): VehicleImage {
  const variants = (manifest as Record<string, Variants>)[name];
  if (!variants) throw new Error(`vehicleImage: sin variantes para "${name}" (¿falta npm run make:vehicles?)`);
  const entries = Object.keys(variants)
    .map(Number)
    .sort((a, b) => a - b)
    .map((w) => ({ url: urls[`/src/imports/vehicles/${name}-${w}.webp`], ...variants[String(w)] }));
  const largest = entries[entries.length - 1];
  const seen = new Set<number>();
  const srcSet = entries
    .filter((e) => (seen.has(e.width) ? false : (seen.add(e.width), true)))
    .map((e) => `${e.url} ${e.width}w`)
    .join(', ');
  return { src: largest.url, srcSet, width: largest.width, height: largest.height };
}
