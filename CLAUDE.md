# ConecCar.rent — Sitio Corporativo

Sitio estático para empresa de alquiler de vehículos en Mendoza, AR.
Cliente: Natalia Lepez. Migrado desde Figma Make a Vite local en junio 2026.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (config en CSS, no en `tailwind.config.js`)
- **shadcn/ui** sobre Radix (en `src/app/components/ui/`)
- Sin backend. Todo el contenido es estático en el código.

## Comandos

- `npm run dev` — servidor de desarrollo
- `npm run build` — build de producción
- `npm run preview` — testear build localmente

## Estructura

- `src/main.tsx` — entry point
- `src/app/App.tsx` — root component
- `src/app/components/ConecCar/` — componentes de negocio (Hero, Fleet, etc.)
- `src/app/components/ui/` — librería shadcn (NO modificar a mano)
- `src/styles/index.css` — único archivo de estilos globales
- `src/imports/` — assets de imágenes (vehículos, destinos, logos)

## Paleta de marca

- **Navy**: `navy-50` a `navy-950` (usar `bg-navy-900` para hero, navs)
- **Amber**: `amber-300` a `amber-700` (CTAs, acentos)
- Tipografías: `font-display` (Libre Baskerville, títulos), default (Plus Jakarta Sans, body)

## Reglas de código

- TypeScript estricto. Tipá props de componentes.
- Imports absolutos con `@/` (alias configurado en `vite.config.ts`).
- Componentes en PascalCase, archivos `.tsx`.
- No instalar dependencias nuevas sin consultar — el bundle ya está cargado.

## Pendientes conocidos

- Honda Accord no tiene foto en `src/imports/`
- Falta limpiar componentes UI de shadcn no usados
- Pendiente integrar Google Translate API para reseñas
- WhatsApp link en Contact: `+54 9 261 555 0123`

## Qué NO hacer

- No agregar archivos de configuración de Tailwind v3 (no aplica en v4)
- No modificar componentes individuales de `src/app/components/ui/` para
  cambiarles estilos o lógica (son shadcn estándar, mantener intactos).
  EXCEPCIÓN: tareas explícitas de housekeeping (eliminar componentes no
  usados, auditorías) están permitidas.
- No agregar backend ni base de datos (proyecto es estático por contrato)