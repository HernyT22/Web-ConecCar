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

// gtag/js (175 KiB) se carga recién en la primera interacción: el stub de
// index.html ya define window.gtag y encola en dataLayer, así que trackLead()
// y el page_view de gtag('config', ...) funcionan igual una vez que la
// librería real drena la cola.
const GTAG_SRC = 'https://www.googletagmanager.com/gtag/js?id=G-9FQJMTJM51';
const FIRST_INTERACTION_EVENTS = ['pointerdown', 'keydown', 'scroll', 'touchstart'] as const;

export function initGtagOnFirstInteraction() {
  if (typeof window === 'undefined') return;
  let loaded = false;
  const load = () => {
    if (loaded) return;
    loaded = true;
    FIRST_INTERACTION_EVENTS.forEach((ev) => window.removeEventListener(ev, load));
    const script = document.createElement('script');
    script.async = true;
    script.src = GTAG_SRC;
    document.head.appendChild(script);
  };
  FIRST_INTERACTION_EVENTS.forEach((ev) => window.addEventListener(ev, load, { once: true, passive: true }));
}
