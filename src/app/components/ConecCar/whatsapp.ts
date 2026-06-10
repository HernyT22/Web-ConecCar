// ConecCar.rent — WhatsApp helpers
// Punto único de configuración para todos los deep links a WhatsApp.

export const WHATSAPP_PHONE = "5492615346953";

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
