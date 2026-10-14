import { vehicleImage, type VehicleImage } from './vehicleImages';

export type TransmissionId = 'automatic' | 'manual';
export type FuelId = 'gasoline' | 'diesel' | 'electric' | 'hybrid';
export type ClimateId = 'ac' | 'dualClimate' | 'none';
export type CategoryId = 'suv-coupe' | 'suv-compacta' | 'sedan' | 'hatchback-compacto';
export type BodyTypeId = 'sedan-4d' | 'hatchback-5d' | 'suv-5d';
export type BadgeId = 'new' | 'corporate' | 'mostBooked' | 'family' | 'MostRentedCar' | null;
export type CurrencyId = 'USD' | 'ARS';

const CURRENCY_SYMBOLS: Record<CurrencyId, string> = {
  USD: 'US$',
  ARS: '$',
};

export const formatPrice = (pricePerDay: number, currency: CurrencyId): string => {
  const amount = pricePerDay.toLocaleString('es-AR');
  const suffix = currency === 'ARS' ? ' ARS' : '';
  return `${CURRENCY_SYMBOLS[currency]} ${amount}${suffix}`;
};

export interface Vehicle {
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: CategoryId;
  badge: BadgeId;
  bodyType: BodyTypeId;
  pricePerDay: number;
  currency: CurrencyId;
  seats: number;
  bags: number;
  transmission: TransmissionId;
  fuel: FuelId;
  climate: ClimateId;
  description: string;       // ES por ahora — Fase 2.B
  shortDescription: string;  // ES por ahora — Fase 2.B
  images: VehicleImage[];
  imageLabels: string[];     // ES por ahora — Fase 2.B
}

export const vehicles: Vehicle[] = [
  {
    slug: 'citroen-basalt-shine-2026-a',
    brand: 'Citroën',
    model: 'Basalt Shine',
    year: 2026,
    category: 'suv-coupe',
    badge: 'MostRentedCar',
    bodyType: 'suv-5d',
    pricePerDay: 110000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Diseño innovador, gran espacio interior y una conducción pensada para el confort. Perfecto para quienes buscan viajar con estilo, ya sea por trabajo o para descubrir nuevos paisajes.',
    shortDescription: 'SUV Coupé — Azul Cosmo',
    images: [vehicleImage('citroen-azul-lateral'), vehicleImage('citroen-azul-detras'), vehicleImage('citroen-azul-interior')],
    imageLabels: [
      'citroën basalt · 3/4 frontal',
      'citroën basalt · trasera',
      'citroën basalt · interior',
      'citroën basalt · tablero',
    ],
  },
  {
    slug: 'chery-tiggo-2-2026-a',
    brand: 'Chery',
    model: 'Tiggo 2',
    year: 2026,
    category: 'suv-compacta',
    badge: 'new',
    bodyType: 'suv-5d',
    pricePerDay: 100000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Versátil y aventurero, con una posición de manejo elevada que brinda seguridad y comodidad en cada recorrido. Ideal para explorar Mendoza con más espacio y una vista privilegiada del camino.',
    shortDescription: 'SUV Compacta — Blanco',
    images: [vehicleImage('cheri-blanco-lateral'), vehicleImage('cheri-blanco-detras'), vehicleImage('cheri-blanco-interior'), vehicleImage('cheri-blanco-baul')],
    imageLabels: [
      'chery tiggo 2 · 3/4 frontal',
      'chery tiggo 2 · trasera',
      'chery tiggo 2 · interior',
      'chery tiggo 2 · baúl',
    ],
  },
  {
    slug: 'citroen-basalt-shine-2026-c',
    brand: 'Citroën',
    model: 'Basalt Shine',
    year: 2026,
    category: 'suv-coupe',
    badge: 'new',
    bodyType: 'suv-5d',
    pricePerDay: 110000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Diseño innovador, gran espacio interior y una conducción pensada para el confort. Perfecto para quienes buscan viajar con estilo, ya sea por trabajo o para descubrir nuevos paisajes.',
    shortDescription: 'SUV Coupé — Sting Grey',
    images: [vehicleImage('citroen-dark-lateral'), vehicleImage('citroen-dark-detras'), vehicleImage('citroen-dark-interior'), vehicleImage('citroen-dark-baul')],
    imageLabels: [
      'citroën basalt dark · 3/4 frontal',
      'citroën basalt dark · trasera',
      'citroën basalt dark · interior',
      'citroën basalt dark · baúl',
    ],
  },
  {
    slug: 'citroen-basalt-shine-2026-b',
    brand: 'Citroën',
    model: 'Basalt Shine',
    year: 2026,
    category: 'suv-coupe',
    badge: null,
    bodyType: 'suv-5d',
    pricePerDay: 110000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Diseño innovador, gran espacio interior y una conducción pensada para el confort. Perfecto para quienes buscan viajar con estilo, ya sea por trabajo o para descubrir nuevos paisajes.',
    shortDescription: 'SUV Coupé — Blanco Nacarado',
    images: [vehicleImage('citroen-blanco-lateral'), vehicleImage('citroen-blanco-detras'), vehicleImage('citroen-blanco-interior'), vehicleImage('citroen-blanco-baul')],
    imageLabels: [
      'citroën basalt · 3/4 frontal',
      'citroën basalt · trasera',
      'citroën basalt · interior',
      'citroën basalt · baúl',
    ],
  },
  {
    slug: 'chery-tiggo-2-2026-b',
    brand: 'Chery',
    model: 'Tiggo 2',
    year: 2026,
    category: 'suv-compacta',
    badge: null,
    bodyType: 'suv-5d',
    pricePerDay: 100000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Versátil y aventurero, con una posición de manejo elevada que brinda seguridad y comodidad en cada recorrido. Ideal para explorar Mendoza con más espacio y una vista privilegiada del camino.', 
    shortDescription: 'SUV Compacta — Rojo',
    images: [vehicleImage('cheri-rojo-lateral'), vehicleImage('cheri-rojo-detras'), vehicleImage('cheri-rojo-interior'), vehicleImage('cheri-rojo-baul')],
    imageLabels: [
      'chery tiggo 2 · 3/4 frontal',
      'chery tiggo 2 · trasera',
      'chery tiggo 2 · interior',
      'chery tiggo 2 · baúl',
    ],
  },
  {
    slug: 'honda-accord-2022',
    brand: 'Honda',
    model: 'Accord',
    year: 2022,
    category: 'sedan',
    badge: 'corporate',
    bodyType: 'sedan-4d',
    pricePerDay: 280000,
    currency: 'ARS',
    seats: 5,
    bags: 3,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'dualClimate',
    description: 'Confort y prestancia para reuniones, traslados de directivos y rutas largas con la cordillera de fondo. Manejo silencioso, butacas amplias y baúl generoso.',
    shortDescription: 'Sedán ejecutivo',
    images: [vehicleImage('accord-lateral'), vehicleImage('accord-frontal'), vehicleImage('accord-detras'), vehicleImage('accord-baul')],
    imageLabels: [
      'honda accord · 3/4 frontal',
      'honda accord · perfil lateral',
      'honda accord · trasera',
      'honda accord · tablero',
    ],
  },
  {
    slug: 'vw-fox-2022',
    brand: 'Volkswagen',
    model: 'Fox',
    year: 2022,
    category: 'hatchback-compacto',
    badge: null,
    bodyType: 'hatchback-5d',
    pricePerDay: 80000,
    currency: 'ARS',
    seats: 5,
    bags: 2,
    transmission: 'manual',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Práctico, confiable y cómodo para el día a día. Un compañero ideal para moverse con soltura por la ciudad y disfrutar cada trayecto sin complicaciones.', 
    shortDescription: 'Hatchback compacto',
    images: [vehicleImage('fox-lateral'), vehicleImage('fox-detras')],
    imageLabels: [
      'vw fox · 3/4 frontal',
      'vw fox · trasera',
      'vw fox · interior',
      'vw fox · tablero',
    ],
  },
  {
    slug: 'kia-rio-2022',
    brand: 'Kia',
    model: 'Rio',
    year: 2022,
    category: 'sedan',
    badge: null,
    bodyType: 'sedan-4d',
    pricePerDay: 120000,
    currency: 'ARS',
    seats: 5,
    bags: 2,
    transmission: 'automatic',
    fuel: 'gasoline',
    climate: 'ac',
    description: 'Ágil, moderno y eficiente. Ideal para recorrer la ciudad o emprender escapadas por Mendoza con el equilibrio justo entre confort, economía y tecnología.', // TODO: confirmar con cliente
    shortDescription: 'Sedán urbano',
    images: [vehicleImage('kia-rio-lateral'), vehicleImage('kia-rio-detras'), vehicleImage('kia-rio-interior'), vehicleImage('kia-rio-baul')],
    imageLabels: [
      'kia rio · 3/4 frontal',
      'kia rio · trasera',
      'kia rio · interior',
      'kia rio · baúl',
    ],
  },
];

export const getVehicleBySlug = (slug: string): Vehicle | undefined =>
  vehicles.find((v) => v.slug === slug);

export const getSimilarVehicles = (slug: string, limit = 3): Vehicle[] =>
  vehicles.filter((v) => v.slug !== slug).slice(0, limit);
