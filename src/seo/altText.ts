import type { Vehicle } from '@/data/vehicles';

/**
 * "{marca} {modelo} {año} {color}" (color ya traducido y en minúscula, omitido
 * si no se pasa). El color se resuelve con fleet:colors.<key> en el llamador
 * (i18n), no acá: este helper es puro y no depende del idioma activo.
 */
export const vehicleAltBase = (
  v: Pick<Vehicle, 'brand' | 'model' | 'year'>,
  colorLabel?: string,
): string => {
  const color = colorLabel?.toLowerCase();
  return `${v.brand} ${v.model} ${v.year}${color ? ' ' + color : ''}`;
};
