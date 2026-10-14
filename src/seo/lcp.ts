import hero640 from '@/imports/hero-640.webp';
import hero1024 from '@/imports/hero-1024.webp';
import hero1600 from '@/imports/hero-1600.webp';
import type { VehicleImage } from '@/data/vehicleImages';

/**
 * Imagen LCP de cada página: srcset/sizes compartidos entre el componente y el
 * <link rel="preload"> del head prerenderizado, para que no puedan desincronizarse
 * (si difieren, el navegador descarga la imagen dos veces).
 */
export const HERO_HOME = {
  src: hero1024,
  srcSet: `${hero640} 640w, ${hero1024} 1024w, ${hero1600} 1600w`,
  sizes: '100vw',
  width: 1920,
  height: 1279,
} as const;

// Ancho real de la foto principal de la ficha: contenedor max-w-7xl con px-5/md:px-8;
// desde lg grid [1.05fr_1fr] con gap-14.
export const VEHICLE_MAIN_SIZES =
  '(min-width: 1280px) 566px, (min-width: 1024px) 44vw, (min-width: 768px) calc(100vw - 64px), calc(100vw - 40px)';

export const heroPreload = () => ({
  href: HERO_HOME.src,
  imagesrcset: HERO_HOME.srcSet,
  imagesizes: HERO_HOME.sizes,
});

export const vehiclePreload = (img: VehicleImage) => ({
  href: img.midSrc,
  imagesrcset: img.srcSet,
  imagesizes: VEHICLE_MAIN_SIZES,
});
