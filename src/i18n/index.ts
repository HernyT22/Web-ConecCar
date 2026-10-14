import type {} from './types';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esFleet from './locales/es/fleet.json';
import esVehicle from './locales/es/vehicle.json';
import esHelp from './locales/es/help.json';
import esDestinations from './locales/es/destinations.json';
import esContact from './locales/es/contact.json';
import esReviews from './locales/es/reviews.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enFleet from './locales/en/fleet.json';
import enVehicle from './locales/en/vehicle.json';
import enHelp from './locales/en/help.json';
import enDestinations from './locales/en/destinations.json';
import enContact from './locales/en/contact.json';
import enReviews from './locales/en/reviews.json';

import ptCommon from './locales/pt-BR/common.json';
import ptHome from './locales/pt-BR/home.json';
import ptFleet from './locales/pt-BR/fleet.json';
import ptVehicle from './locales/pt-BR/vehicle.json';
import ptHelp from './locales/pt-BR/help.json';
import ptDestinations from './locales/pt-BR/destinations.json';
import ptContact from './locales/pt-BR/contact.json';
import ptReviews from './locales/pt-BR/reviews.json';

export const SUPPORTED_LANGS = ['es', 'en', 'pt-BR'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: esCommon, home: esHome, fleet: esFleet, vehicle: esVehicle, help: esHelp, destinations: esDestinations, contact: esContact, reviews: esReviews },
      en: { common: enCommon, home: enHome, fleet: enFleet, vehicle: enVehicle, help: enHelp, destinations: enDestinations, contact: enContact, reviews: enReviews },
      'pt-BR': { common: ptCommon, home: ptHome, fleet: ptFleet, vehicle: ptVehicle, help: ptHelp, destinations: ptDestinations, contact: ptContact, reviews: ptReviews },
    },
    lng: 'es',
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt-BR'],
    load: 'currentOnly',
    nonExplicitSupportedLngs: false,
    ns: ['common', 'home', 'fleet', 'vehicle', 'help', 'destinations', 'contact', 'reviews'],
    defaultNS: 'common',
    fallbackNS: 'common',
    interpolation: { escapeValue: false },
    returnNull: false,
    react: {
      useSuspense: false,
    },
  });


const STORAGE_KEY = 'i18nextLng';
let restored = false;

/**
 * Restaura el idioma elegido por el visitante. Se llama desde un efecto cliente
 * (después del montaje) para que el primer render sea siempre 'es'.
 */
export function restoreSavedLanguage() {
  if (restored) return;
  restored = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const prefix = saved?.split('-')[0];
    const lang = SUPPORTED_LANGS.find((l) => l === saved) ?? SUPPORTED_LANGS.find((l) => l.split('-')[0] === prefix);
    if (lang && lang !== i18n.language) i18n.changeLanguage(lang);
  } catch {
    /* storage no disponible */
  }
  i18n.on('languageChanged', (lng) => {
    try {
      localStorage.setItem(STORAGE_KEY, lng);
    } catch {
      /* storage no disponible */
    }
  });
}

export default i18n;
