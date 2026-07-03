/**
 * Estructura de IDs para la página /ayuda. Todo el texto vive en
 * src/i18n/locales/<lang>/help.json bajo claves indexadas por estos IDs.
 */

export type HelpSection =
  | { id: 'seguro'; kind: 'paragraphs'; paragraphCount: 4 }
  | { id: 'cancelacion'; kind: 'paragraphs'; paragraphCount: 5 }
  | { id: 'manejar-en-argentina'; kind: 'subsections'; subsectionIds: readonly string[] }
  | { id: 'terminos'; kind: 'paragraphs'; paragraphCount: 6 }
  | { id: 'privacidad'; kind: 'paragraphs'; paragraphCount: 5 };

export const HELP_SECTIONS: readonly HelpSection[] = [
  { id: 'seguro', kind: 'paragraphs', paragraphCount: 4 },
  { id: 'cancelacion', kind: 'paragraphs', paragraphCount: 5 },
  {
    id: 'manejar-en-argentina',
    kind: 'subsections',
    subsectionIds: [
      'documentacion',
      'requisitos',
      'normas',
      'peajes',
      'combustible',
      'chile',
      'seguridad',
      'telefonos',
    ] as const,
  },
  { id: 'terminos', kind: 'paragraphs', paragraphCount: 6 },
  { id: 'privacidad', kind: 'paragraphs', paragraphCount: 5 },
] as const;

/** IDs de las 12 FAQs, en orden de aparición. */
export const FAQ_IDS = [
  'faq1', 'faq2', 'faq3', 'faq4', 'faq5', 'faq6',
  'faq7', 'faq8', 'faq9', 'faq10', 'faq11', 'faq12',
] as const;
