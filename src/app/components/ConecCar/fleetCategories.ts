import type { CategoryId } from '@/data/vehicles';

export const CATEGORY_IDS: readonly CategoryId[] = [
  'suv-coupe',
  'suv-compacta',
  'sedan',
  'hatchback-compacto',
] as const;

export function parseCatFromHash(hash: string): CategoryId | null {
  if (!hash.startsWith('#fleet')) return null;
  const m = hash.match(/\?cat=([^&]+)/);
  if (!m) return null;
  const slug = m[1];
  return (CATEGORY_IDS as readonly string[]).includes(slug) ? (slug as CategoryId) : null;
}
