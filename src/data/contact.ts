/**
 * Single source of truth para todos los datos de contacto de ConecCar.
 * Cualquier componente que muestre número, email, dirección o redes
 * sociales debe consumir de este archivo. NO hardcodear nada en componentes.
 */

export const WHATSAPP_NUMBERS = {
  /** Número operativo principal. Default para todos los CTAs de WhatsApp. */
  primary: '5492615346953',
  /** Operativo paralelo, se ofrece como alternativa cuando el primario no responde. */
  secondary: '5492617596871',
} as const;

export type WhatsAppLine = keyof typeof WHATSAPP_NUMBERS;

/** Formato de display para los números (con prefijo internacional legible). */
export const WHATSAPP_DISPLAY = {
  primary: '+54 9 261 534-6953',
  secondary: '+54 9 261 759-6871',
} as const;

/** Mismo número que WhatsApp, formateado para tel: links. */
export const PHONE_DISPLAY = {
  primary: '+54 9 261 534-6953',
  secondary: '+54 9 261 759-6871',
} as const;

export const PHONE_TEL_LINKS = {
  primary: 'tel:+5492615346953',
  secondary: 'tel:+5492617596871',
} as const;

export const EMAIL = 'contacto@coneccar-rent.com';
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

export const ADDRESS = 'Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza';
export const ADDRESS_MAPS_URL =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent('Primitivo de la Reta 928, Local 4, Mendoza, Argentina');

export const SOCIAL = {
  instagram: 'https://instagram.com/coneccar.rent',
  facebook: 'https://facebook.com/coneccar.rent',
  linkedin: 'https://linkedin.com/company/coneccar-rent',
} as const;

/** Convenience export para consumidores existentes (Nav, Help, VehicleHero). */
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBERS.primary}`;
