import manifest from '@/imports/vehicles/manifest.json';

/**
 * Variantes WebP (480/720/1200 px) generadas por scripts/optimize-images.ts.
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
  /** Variante de 800 px (href del preload de la imagen LCP). */
  midSrc: string;
  /** Miniaturas de la ficha: variantes de 240 y 480 px. */
  thumbSrc: string;
  thumbSrcSet: string;
}

type Variants = Record<string, { width: number; height: number }>;

export function vehicleImage(name: string): VehicleImage {
  const variants = (manifest as Record<string, Variants>)[name];
  if (!variants) throw new Error(`vehicleImage: sin variantes para "${name}" (¿falta npm run make:vehicles?)`);
  const build = (widths: number[]) => {
    const entries = widths
      .filter((w) => variants[String(w)])
      .map((w) => ({ url: urls[`/src/imports/vehicles/${name}-${w}.webp`], ...variants[String(w)] }));
    const seen = new Set<number>();
    const srcSet = entries
      .filter((e) => (seen.has(e.width) ? false : (seen.add(e.width), true)))
      .map((e) => `${e.url} ${e.width}w`)
      .join(', ');
    return { entries, srcSet };
  };
  const main = build([480, 720, 1200]);
  const thumbs = build([240, 480]);
  const largest = main.entries[main.entries.length - 1];
  return {
    src: largest.url,
    srcSet: main.srcSet,
    width: largest.width,
    height: largest.height,
    midSrc: main.entries[1].url,
    thumbSrc: thumbs.entries[thumbs.entries.length - 1].url,
    thumbSrcSet: thumbs.srcSet,
  };
}
