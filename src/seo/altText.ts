import type { CategoryId, Vehicle } from '@/data/vehicles';

/**
 * Tipo legible para alt de imágenes y copy de vehículos (fuente: category,
 * campo limpio de vehicles.ts). Compartido entre VehicleHero.tsx y Fleet.tsx
 * para no duplicar el mapeo (ver plan de copy SEO, secciones 5-7).
 */
export const ALT_TYPE_LABEL: Record<CategoryId, string> = {
  'suv-coupe': 'camioneta SUV Coupé',
  'suv-compacta': 'camioneta SUV Compacta',
  sedan: 'sedán',
  'hatchback-compacto': 'auto compacto',
};

export const vehicleTypeLabel = (category: CategoryId): string => ALT_TYPE_LABEL[category];

/** "{marca} {modelo} {año} {color}" (color en minúscula, omitido si no existe). */
export const vehicleAltBase = (v: Pick<Vehicle, 'brand' | 'model' | 'year' | 'color'>): string => {
  const color = v.color?.toLowerCase();
  return `${v.brand} ${v.model} ${v.year}${color ? ' ' + color : ''}`;
};
