# ConecCar.rent — Sitio Corporativo

Sitio estático para empresa de alquiler de vehículos en Mendoza, AR.
Cliente: Natalia Lepez. Migrado desde Figma Make a Vite local en junio 2026.

## Stack

- **Vite 6** + **React 18** + **TypeScript** (strict mode)
- **Tailwind CSS v4** (config en CSS via `@theme`, NO en `tailwind.config.js`)
- **shadcn/ui** sobre Radix, base mínima (ver "UI components" abajo)
- Sin backend. Todo el contenido es estático en el código.

## Comandos

- `npm run dev` — servidor de desarrollo (puerto 5173)
- `npm run build` — build de producción
- `npm run preview` — testear build localmente

## Estructura

- `src/main.tsx` — entry point
- `src/app/App.tsx` — root component
- `src/app/components/ConecCar/` — componentes de negocio (Hero, Fleet, About, Contact, Destinations, Footer, Nav, Payments, PlaceholderImg, Reviews, Section, Icons)
- `src/app/components/ui/` — librería shadcn (solo 5 archivos activos)
- `src/app/components/figma/ImageWithFallback.tsx` — wrapper de imagen con fallback
- `src/styles/index.css` — único archivo de estilos globales
- `src/imports/` — assets (imágenes de vehículos, destinos, logos)
- `docs/referencias/` — exports HTML del boceto original (referencia, no parte del build)

## Paleta de marca

- **Navy**: `navy-50` a `navy-950` (usar `bg-navy-900` para hero, navs)
- **Amber**: `amber-300` a `amber-700` (CTAs, acentos)
- Tipografías: `font-display` (Libre Baskerville, títulos), default (Plus Jakarta Sans, body)

## UI Components

Solo hay 5 archivos en `src/app/components/ui/`, conservados estratégicamente:

- `button.tsx`, `input.tsx`, `dialog.tsx`, `label.tsx`, `utils.ts`

Si se necesita un componente shadcn adicional (ej. `card`, `tabs`, `tooltip`), reinstalarlo con: