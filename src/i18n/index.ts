import type {} from './types';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esFleet from './locales/es/fleet.json';
import esVehicle from './locales/es/vehicle.json';
import esHelp from './locales/es/help.json';
import esDestinations from './locales/es/destinations.json';
import esContact from './locales/es/contact.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enFleet from './locales/en/fleet.json';
import enVehicle from './locales/en/vehicle.json';
import enHelp from './locales/en/help.json';
import enDestinations from './locales/en/destinations.json';
import enContact from './locales/en/contact.json';

import ptCommon from './locales/pt-BR/common.json';
import ptHome from './locales/pt-BR/home.json';
import ptFleet from './locales/pt-BR/fleet.json';
import ptVehicle from './locales/pt-BR/vehicle.json';
import ptHelp from './locales/pt-BR/help.json';
import ptDestinations from './locales/pt-BR/destinations.json';
import ptContact from './locales/pt-BR/contact.json';

export const SUPPORTED_LANGS = ['es', 'en', 'pt-BR'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: esCommon, home: esHome, fleet: esFleet, vehicle: esVehicle, help: esHelp, destinations: esDestinations, contact: esContact },
      en: { common: enCommon, home: enHome, fleet: enFleet, vehicle: enVehicle, help: enHelp, destinations: enDestinations, contact: enContact },
      'pt-BR': { common: ptCommon, home: ptHome, fleet: ptFleet, vehicle: ptVehicle, help: ptHelp, destinations: ptDestinations, contact: ptContact },
    },
    lng: undefined,
    fallbackLng: 'es',
    supportedLngs: ['es', 'en', 'pt-BR'],
    load: 'currentOnly',
    nonExplicitSupportedLngs: false,
    ns: ['common', 'home', 'fleet', 'vehicle', 'help', 'destinations', 'contact'],
    defaultNS: 'common',
    fallbackNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    interpolation: { escapeValue: false },
    returnNull: false,
    react: {
      useSuspense: false,
    },
  });


export default i18n;
