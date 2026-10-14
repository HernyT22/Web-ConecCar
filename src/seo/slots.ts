/**
 * Slots de copy SEO (title / description / H1). Se completan en la fase de
 * keywords (S12). Mientras valgan PENDING, head.ts usa un fallback provisorio.
 * Los h1 están declarados pero NO conectados (ver plan D6).
 */
export const PENDING = '[KW-PENDIENTE]';

type VehicleSlot = { title: string; description: string; h1: null };

const pendingVehicle = (): VehicleSlot => ({ title: PENDING, description: PENDING, h1: null });

export const SLOTS = {
  home: {
    title: PENDING,
    description: PENDING,
    h1: { line1: PENDING, line2: PENDING },
  },
  vehicles: {
    'citroen-basalt-shine-2026-a': pendingVehicle(),
    'chery-tiggo-2-2026-a': pendingVehicle(),
    'citroen-basalt-shine-2026-c': pendingVehicle(),
    'citroen-basalt-shine-2026-b': pendingVehicle(),
    'chery-tiggo-2-2026-b': pendingVehicle(),
    'honda-accord-2022': pendingVehicle(),
    'vw-fox-2022': pendingVehicle(),
    'kia-rio-2022': pendingVehicle(),
  } as Record<string, VehicleSlot>,
};
