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
  /** Clave de color (fleet:colors.<key>), solo variantes que comparten brand+model. */
  color?: string;
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
    color: 'azulCosmo',
    images: [vehicleImage('citroen-azul-lateral'), vehicleImage('citroen-azul-detras'), vehicleImage('citroen-azul-interior')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior'],
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
    color: 'blanco',
    images: [vehicleImage('cheri-blanco-lateral'), vehicleImage('cheri-blanco-detras'), vehicleImage('cheri-blanco-interior'), vehicleImage('cheri-blanco-baul')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior', 'baúl'],
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
    color: 'stingGrey',
    images: [vehicleImage('citroen-dark-lateral'), vehicleImage('citroen-dark-detras'), vehicleImage('citroen-dark-interior'), vehicleImage('citroen-dark-baul')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior', 'baúl'],
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
    color: 'blancoNacarado',
    images: [vehicleImage('citroen-blanco-lateral'), vehicleImage('citroen-blanco-detras'), vehicleImage('citroen-blanco-interior'), vehicleImage('citroen-blanco-baul')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior', 'baúl'],
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
    color: 'rojo',
    images: [vehicleImage('cheri-rojo-lateral'), vehicleImage('cheri-rojo-detras'), vehicleImage('cheri-rojo-interior'), vehicleImage('cheri-rojo-baul')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior', 'baúl'],
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
    images: [vehicleImage('accord-lateral'), vehicleImage('accord-frontal'), vehicleImage('accord-detras'), vehicleImage('accord-baul')],
    imageLabels: ['vista lateral', 'vista frontal', 'vista trasera', 'baúl'],
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
    images: [vehicleImage('fox-lateral'), vehicleImage('fox-detras')],
    imageLabels: ['vista lateral', 'vista trasera'],
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
    images: [vehicleImage('kia-rio-lateral'), vehicleImage('kia-rio-detras'), vehicleImage('kia-rio-interior'), vehicleImage('kia-rio-baul')],
    imageLabels: ['vista lateral', 'vista trasera', 'interior', 'baúl'],
  },
];

export const getVehicleBySlug = (slug: string): Vehicle | undefined =>
  vehicles.find((v) => v.slug === slug);

export const getSimilarVehicles = (slug: string, limit = 3): Vehicle[] =>
  vehicles.filter((v) => v.slug !== slug).slice(0, limit);
