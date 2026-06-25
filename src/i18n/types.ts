import 'react-i18next';
import type common from './locales/es/common.json';
import type home from './locales/es/home.json';
import type fleet from './locales/es/fleet.json';
import type vehicle from './locales/es/vehicle.json';
import type help from './locales/es/help.json';
import type destinations from './locales/es/destinations.json';
import type contact from './locales/es/contact.json';
import type reviews from './locales/es/reviews.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      fleet: typeof fleet;
      vehicle: typeof vehicle;
      help: typeof help;
      destinations: typeof destinations;
      contact: typeof contact;
      reviews: typeof reviews;
    };
  }
}
