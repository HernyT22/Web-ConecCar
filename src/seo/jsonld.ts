import {
  ADDRESS_MAPS_URL,
  ADDRESS_STRUCTURED,
  EMAIL,
  GEO,
  OFFICE_DAYS,
  OFFICE_HOURS,
  PAYMENT_METHODS,
  PHONE_TEL_LINKS,
  SOCIAL,
} from '@/data/contact';
import type { Vehicle } from '@/data/vehicles';
import { BRAND_NAME, SITE_URL, absoluteUrl, ogImageUrl } from './site';

type Json = Record<string, unknown>;

export const ids = {
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
  business: `${SITE_URL}/#business`,
};

const TELEPHONE = PHONE_TEL_LINKS.primary.replace('tel:', '');
const LOGO_URL = `${SITE_URL}/apple-touch-icon.png`;
const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const organization = (): Json => ({
  '@type': 'Organization',
  '@id': ids.organization,
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: LOGO_URL },
  email: EMAIL,
  telephone: TELEPHONE,
  sameAs: [SOCIAL.instagram],
});

export const website = (): Json => ({
  '@type': 'WebSite',
  '@id': ids.website,
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'es',
  publisher: { '@id': ids.organization },
});

export const autoRental = (): Json => ({
  '@type': 'AutoRental',
  '@id': ids.business,
  name: BRAND_NAME,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: ogImageUrl(),
  telephone: TELEPHONE,
  email: EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: ADDRESS_STRUCTURED.streetAddress,
    addressLocality: ADDRESS_STRUCTURED.addressLocality,
    addressRegion: ADDRESS_STRUCTURED.addressRegion,
    postalCode: ADDRESS_STRUCTURED.postalCode,
    addressCountry: ADDRESS_STRUCTURED.addressCountry,
  },
  geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
  hasMap: ADDRESS_MAPS_URL,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...OFFICE_DAYS],
      opens: OFFICE_HOURS.opens,
      closes: OFFICE_HOURS.closes,
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    telephone: TELEPHONE,
    email: EMAIL,
    availableLanguage: ['es', 'en', 'pt'],
    hoursAvailable: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ALL_DAYS,
      opens: '00:00',
      closes: '23:59',
    },
  },
  paymentAccepted: PAYMENT_METHODS.join(', '),
  areaServed: { '@type': 'AdministrativeArea', name: 'Mendoza, Argentina' },
  parentOrganization: { '@id': ids.organization },
  sameAs: [SOCIAL.instagram],
});

const BODY_TYPES: Record<Vehicle['bodyType'], string> = {
  'sedan-4d': 'Sedan',
  'hatchback-5d': 'Hatchback',
  'suv-5d': 'SUV',
};
const FUEL_TYPES: Record<Vehicle['fuel'], string> = {
  gasoline: 'Gasoline',
  diesel: 'Diesel',
  electric: 'Electric',
  hybrid: 'Hybrid',
};
const TRANSMISSIONS: Record<Vehicle['transmission'], string> = {
  automatic: 'Automatic',
  manual: 'Manual',
};

export const vehicleName = (v: Vehicle) => `${v.brand} ${v.model} ${v.year}`;

export const car = (v: Vehicle, canonical: string): Json => ({
  '@type': 'Car',
  '@id': `${canonical}#vehicle`,
  name: vehicleName(v),
  url: canonical,
  description: v.description,
  brand: { '@type': 'Brand', name: v.brand },
  model: v.model,
  vehicleModelDate: String(v.year),
  vehicleSeatingCapacity: v.seats,
  vehicleTransmission: TRANSMISSIONS[v.transmission],
  fuelType: FUEL_TYPES[v.fuel],
  bodyType: BODY_TYPES[v.bodyType],
  image: v.images.map(absoluteUrl),
  ...(v.pricePerDay > 0 && {
    offers: {
      '@type': 'Offer',
      url: canonical,
      price: v.pricePerDay,
      priceCurrency: v.currency,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: v.pricePerDay,
        priceCurrency: v.currency,
        unitCode: 'DAY',
      },
      businessFunction: 'http://purl.org/goodrelations/v1#LeaseOut',
      seller: { '@id': ids.business },
    },
  }),
});

export const breadcrumb = (v: Vehicle, canonical: string): Json => ({
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: vehicleName(v), item: canonical },
  ],
});

export const graph = (nodes: Json[]): Json => ({ '@context': 'https://schema.org', '@graph': nodes });
