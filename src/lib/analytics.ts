declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type LeadMethod = 'phone_call' | 'whatsapp' | 'whatsapp_alt' | 'contact_form';

export function trackLead(method: LeadMethod, extra?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'generate_lead', { method, ...extra });
}
