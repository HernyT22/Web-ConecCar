export const CATEGORIES = [
  "SUV Coupé",
  "SUV Compacta",
  "Sedán",
  "Hatchback Compacto",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const CAT_TO_SLUG: Record<Category, string> = {
  "SUV Coupé": "suv-coupe",
  "SUV Compacta": "suv-compacta",
  "Sedán": "sedan",
  "Hatchback Compacto": "hatchback-compacto",
};

export const SLUG_TO_CAT: Record<string, Category> = Object.fromEntries(
  Object.entries(CAT_TO_SLUG).map(([cat, slug]) => [slug, cat as Category])
);

export function parseCatFromHash(hash: string): Category | null {
  if (!hash.startsWith("#fleet")) return null;
  const m = hash.match(/\?cat=([^&]+)/);
  if (!m) return null;
  return SLUG_TO_CAT[m[1]] ?? null;
}
