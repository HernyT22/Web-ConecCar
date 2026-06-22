import { WHATSAPP_NUMBERS, type WhatsAppLine } from '@/data/contact';

/**
 * Construye una URL de wa.me para un número específico.
 * @param message Mensaje pre-rellenado (sin encodear; la función lo encodea).
 * @param line Cuál línea usar. Default: 'primary'.
 */
export function buildWhatsAppUrl(message: string, line: WhatsAppLine = 'primary'): string {
  return `https://wa.me/${WHATSAPP_NUMBERS[line]}?text=${encodeURIComponent(message)}`;
}
