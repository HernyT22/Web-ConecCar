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

export const SUPPORTED_LANGS = ['es', 'en', 'pt-BR'] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

const NAMESPACES = ['common', 'home', 'fleet', 'vehicle', 'help', 'destinations', 'contact', 'reviews'] as const;

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: { common: esCommon, home: esHome, fleet: esFleet, vehicle: esVehicle, help: esHelp, destinations: esDestinations, contact: esContact, reviews: esReviews },
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

// EN y PT-BR bajo demanda: ES queda síncrono/bundleado (siempre es el primer
// render, SSR incluido); los otros 2 idiomas (8 namespaces c/u) se piden
// recién cuando el visitante los elige, y Vite los separa en su propio chunk.
type LazyLang = Exclude<SupportedLang, 'es'>;

const enModules = import.meta.glob<{ default: Record<string, unknown> }>('./locales/en/*.json');
const ptModules = import.meta.glob<{ default: Record<string, unknown> }>('./locales/pt-BR/*.json');
const LAZY_LOCALE_MODULES: Record<LazyLang, Record<string, () => Promise<{ default: Record<string, unknown> }>>> = {
  en: enModules,
  'pt-BR': ptModules,
};

const localeLoadPromises = new Map<LazyLang, Promise<void>>();

function loadLazyLocale(lang: LazyLang): Promise<void> {
  const cached = localeLoadPromises.get(lang);
  if (cached) return cached;
  const modules = LAZY_LOCALE_MODULES[lang];
  const promise = Promise.all(
    NAMESPACES.map(async (ns) => {
      const importer = modules[`./locales/${lang}/${ns}.json`];
      const mod = await importer();
      i18n.addResourceBundle(lang, ns, mod.default, true, true);
    }),
  ).then(() => undefined);
  localeLoadPromises.set(lang, promise);
  return promise;
}

/**
 * Cambia de idioma esperando a que sus namespaces estén cargados
 * (addResourceBundle) antes de aplicar el cambio — evita el flash de claves
 * sin traducir que daría un changeLanguage a un idioma todavía sin recursos.
 */
export async function changeLanguageSafely(lang: SupportedLang) {
  if (lang !== 'es') await loadLazyLocale(lang);
  await i18n.changeLanguage(lang);
}


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
    if (lang && lang !== i18n.language) void changeLanguageSafely(lang);
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
