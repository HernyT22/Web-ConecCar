# Plan — Jerarquía de encabezados (Home y Vehicle Detail, ES)

**Solo plan. Nada de este documento fue aplicado al código.** Alcance: Home y Vehicle Detail, solo ES. No incluye `/ayuda` ni `help.json`/`helpContent.ts`. Basado en los hallazgos de [04-mapa-textos.md](./04-mapa-textos.md) (Parte 1 y Parte 4).

Objetivo: que ambas páginas queden con jerarquía `H1 > H2 > H3` sin saltos de nivel, sin cambiar el aspecto visual actual. Para eso, todos los diffs propuestos **mantienen las clases Tailwind existentes en el elemento** (no se reescribe el diseño, solo el tag HTML y, donde el análisis lo exige, se agrega una clase puntual para neutralizar un reset de tipografía — ver Cambio 3 y Cambio 5).

## Por qué hace falta cuidar las clases: el reset de `h1`–`h4`

`src/styles/index.css:180-183` define un reset propio dentro de `@layer base`:

```css
h1 { font-size: var(--text-2xl); font-weight: var(--font-weight-medium); line-height: 1.5; }
h2 { font-size: var(--text-xl);  font-weight: var(--font-weight-medium); line-height: 1.5; }
h3 { font-size: var(--text-lg);  font-weight: var(--font-weight-medium); line-height: 1.5; }
h4 { font-size: var(--text-base); font-weight: var(--font-weight-medium); line-height: 1.5; }
```

Como el proyecto usa `@import 'tailwindcss' source(none)` (`index.css:16`), este bloque vive en la capa `base` de Tailwind v4. Las clases de utilidad (`text-xl`, `font-semibold`, etc.) viven en la capa `utilities`, que tiene prioridad sobre `base` en el cascade de capas CSS. **Conclusión práctica: si el elemento ya trae una clase explícita de tamaño/peso de fuente, convertirlo en `<h3>` no cambia nada visualmente — la clase gana. Si el elemento NO trae una clase de tamaño explícita (hoy hereda el tamaño por defecto del body, 1rem), pasar a `<h3>` sí lo agranda a `1.125rem` (`--text-lg`) porque el reset de arriba queda sin competencia.** Esto afecta puntualmente a los Cambios 3 y 5 (ver detalle ahí).

---

## Cambio 1 — Home: espacio en el H1 (Hero)

**Archivo:línea actual:** `src/app/components/ConecCar/Hero.tsx:42-46`

```tsx
<h1 className="font-display text-[42px] sm:text-6xl md:text-7xl font-semibold leading-[1.02] mt-6">
  {t('hero.titleLine1')}
  <br />
  <span className="text-amber-500">{t('hero.titleLine2')}</span>
</h1>
```

Hoy el `textContent` plano de este H1 (lo que lee un crawler o lector de pantalla) es `"Conectadosa tu destino."` porque `<br/>` no inserta un carácter de espacio en el texto plano, solo un salto visual.

**Diff propuesto (sin aplicar):**

```diff
  <h1 className="font-display text-[42px] sm:text-6xl md:text-7xl font-semibold leading-[1.02] mt-6">
    {t('hero.titleLine1')}
+   {' '}
    <br />
    <span className="text-amber-500">{t('hero.titleLine2')}</span>
  </h1>
```

**Clases a preservar:** ninguna cambia; el `<h1>` conserva su className completo.

**Riesgo de regresión visual:** bajo. Un espacio inmediatamente antes de un salto de línea forzado (`<br/>`) no se renderiza como hueco visible (es un espacio de fin de línea, se colapsa en el layout). No cambia tamaño, color ni posición del salto de línea.

**Decisión que requiere tu aprobación:** ninguna técnica alternativa evaluada (ej. usar ` ` en el string de i18n en vez de `{' '}` en JSX) — lo dejo para que elijas si preferís el espacio en el componente (como arriba) o en la clave i18n `home:hero.titleLine1` (`src/i18n/locales/es/home.json:4`, agregando el espacio al final del string traducido). Ambas opciones logran el mismo resultado; la del componente es más visible en el diff y no depende de que las otras 2 locales (EN/PT-BR) repliquen el espacio a mano.

---

## Cambio 2 — Footer: los 3 `<h2>` pasan a elementos no-encabezado

**Archivo:líneas actuales:** `src/app/components/ConecCar/Footer.tsx:90-130` (bloques "Navegación" línea 92, "Flota" línea 106, "Ayuda" línea 120)

```tsx
<div>
  <h2 className="text-white font-medium mb-4 text-base">{t('footer.navigation')}</h2>
  <ul className="space-y-2.5 text-sm">
    {NAV_LINKS.map(...)}
  </ul>
</div>
```
(mismo patrón en las otras dos columnas, con `t('footer.fleet')` y `t('footer.help')`)

**Diff propuesto (sin aplicar), aplicado igual a las 3 columnas:**

```diff
- <div>
-   <h2 className="text-white font-medium mb-4 text-base">{t('footer.navigation')}</h2>
+ <nav aria-label={t('footer.navigation')}>
+   <div className="text-white font-medium mb-4 text-base">{t('footer.navigation')}</div>
    <ul className="space-y-2.5 text-sm">
      {NAV_LINKS.map((li) => (
        <li key={li.key}>
          <Link to={li.href} className="hover:text-white transition">
            {t(`footer.links.${li.key}`)}
          </Link>
        </li>
      ))}
    </ul>
- </div>
+ </nav>
```

Repetir el mismo patrón para el bloque "Flota" (`Footer.tsx:104-116`, `aria-label={tFleet... o t('footer.fleet')}`) y "Ayuda" (`Footer.tsx:118-130`, `aria-label={t('footer.help')}`).

**Clases a preservar:** `text-white font-medium mb-4 text-base` se mueven intactas del `<h2>` al `<div>` de reemplazo. El `<div>` no heading no tiene reset en `@layer base` (solo `h1`–`h4`, `label`, `button`, `input` lo tienen), así que el tamaño/peso visual queda exactamente igual.

**Riesgo de regresión visual:** muy bajo. `<div>` no tiene reset de tamaño/peso propio y las clases explícitas quedan iguales. El único cambio estructural es envolver la columna en `<nav>`, que es un elemento de layout neutro (no añade estilos por defecto que Tailwind preflight no haya ya resuelto a `display: block`).

**Decisiones que requieren tu aprobación:**
1. **Tag de reemplazo:** propongo `<div>` (cero riesgo, cero carga semántica nueva) en vez de `<p>` (que implicaría tratar "Navegación" / "Flota" / "Ayuda" como párrafos, semánticamente raro para una etiqueta de una palabra). Confirmame si preferís `<p>`.
2. **Granularidad del `<nav>`:** propongo **un `<nav aria-label>` por columna** (3 `<nav>` independientes, cada uno describiendo su propia lista de enlaces) en vez de un único `<nav aria-label="Footer">` envolviendo las 3 columnas. Confirmame cuál preferís.
3. **Texto del `aria-label`:** propongo reusar literalmente las claves i18n ya existentes (`footer.navigation` = "Navegación", `footer.fleet` = "Flota", `footer.help` = "Ayuda") para no crear claves nuevas. Si preferís un texto más descriptivo (ej. "Enlaces de navegación del sitio"), hay que agregar esas claves en los 3 idiomas (`common.json` de `es`/`en`/`pt-BR`), lo cual excede el alcance "sin tocar diseño" solo en el sentido de que toca i18n, no CSS.

---

## Cambio 3 — Home: títulos de las 4 feature cards de About (`<div>` → H3)

**Archivo:línea actual:** `src/app/components/ConecCar/About.tsx:92-94` (dentro del `.map` de `FEATURE_IDS`, líneas 83-99)

```tsx
<div className="font-medium text-navy-900">
  {t(`features.${id}.title`)}
</div>
<div className="text-sm text-navy-700/70 mt-1">
  {t(`features.${id}.description`)}
</div>
```

Estos 4 títulos ("Totalmente asegurado", "Equipo trilingüe", "Asistencia 24/7", "Transparencia total") hoy no tienen tamaño de fuente explícito — heredan 1rem del body. El H2 padre de toda la sección es "Una rentadora mendocina, pensada para viajar de verdad" (vía `Section.tsx:38`), y ya existe un H3 hermano más abajo: "Todo lo que incluye tu alquiler." (`About.tsx:120-125`). Los 4 nuevos H3 quedarían en el mismo nivel, antes en el orden del DOM.

**Diff propuesto (sin aplicar):**

```diff
- <div className="font-medium text-navy-900">
+ <h3 className="font-medium text-navy-900 text-base">
    {t(`features.${id}.title`)}
- </div>
+ </h3>
  <div className="text-sm text-navy-700/70 mt-1">
    {t(`features.${id}.description`)}
  </div>
```

**Clases a preservar + clase nueva necesaria:** `font-medium text-navy-900` se mantienen igual. **Se agrega `text-base`** (explícita) para neutralizar el reset `h3 { font-size: var(--text-lg) }` de `index.css:182` — sin esa clase, el título pasaría de 1rem a 1.125rem (+12.5%) y se vería visiblemente más grande que hoy.

**Riesgo de regresión visual:** medio si se omite `text-base` (el título crecería y podría romper el alineado con la descripción debajo); bajo si se agrega `text-base` como en el diff. También hay un cambio menor de `line-height` (el reset de `h3` fija `line-height: 1.5`; el `<div>` actual no tiene `line-height` explícito y hereda el del body) — en la práctica el título es de una sola línea en la mayoría de los casos, así que el efecto visual esperado es nulo, pero conviene revisarlo en el checklist si algún título se corta a 2 líneas en mobile (ej. "Transparencia total" en pantallas muy angostas).

**Decisión que requiere tu aprobación:** confirmar que agregar la clase `text-base` es aceptable (es la única forma de que el cambio sea 100% neutro visualmente). Si preferís no tocar className en absoluto, la alternativa es dejar estos 4 títulos como `<div>` y resolver la jerarquía de otra forma (por ejemplo, degradando el H3 existente de "Todo lo que incluye tu alquiler" a texto no-encabezado) — pero esto no estaba en el pedido original y cambia el diagnóstico de partida.

---

## Cambio 4 — Home: título del formulario de contacto (`<div>` → H3)

**Archivo:línea actual:** `src/app/components/ConecCar/Contact.tsx:209-211`

```tsx
<div className="font-display text-xl font-semibold">
  {t('form.title')}
</div>
```

Nota: en el pedido se menciona como `<p>`, pero en el código actual es un `<div>` (sin párrafo intermedio); el diff es el mismo cambio de fondo. El H2 de la sección es "A un mensaje de la ruta abierta." (`Contact.tsx:132-134`, hardcodeado en el componente, no vía `Section`'s `title` prop — `Section` se usa aquí solo como contenedor, sin `eyebrow`/`title`/`kicker`). El formulario está en la misma sección (`<Section id="contact">`), en la columna derecha, como hermano de la columna con el H2.

**Diff propuesto (sin aplicar):**

```diff
- <div className="font-display text-xl font-semibold">
+ <h3 className="font-display text-xl font-semibold">
    {t('form.title')}
- </div>
+ </h3>
```

**Clases a preservar:** `font-display text-xl font-semibold` quedan igual. Acá **no hace falta agregar ninguna clase nueva**: `text-xl` ya es explícito y gana sobre el reset `h3 { font-size: var(--text-lg) }`; `.font-display` (`index.css:191-195`) fija `font-weight: 700` por su cuenta y `font-semibold` también es explícito, así que el peso tampoco cambia.

**Riesgo de regresión visual:** bajo. Única diferencia no cubierta por clases explícitas es `line-height: 1.5` del reset de `h3`, contra el `line-height` heredado actual del `<div>` (probablemente similar, ya que el título es corto y de una sola línea en todos los idiomas/anchos probables).

**Decisión que requiere tu aprobación:** ninguna especial — es el cambio de menor riesgo de los cinco.

---

## Cambio 5 — Vehicle Detail: títulos de las 6 cards de Included (`<div>` → H3)

**Archivo:línea actual:** `src/app/sections/vehicle-detail/Included.tsx:70-71`

```tsx
<div className="font-medium text-navy-900">{c.t}</div>
<div className="text-sm text-navy-700/70 mt-1">{c.s}</div>
```

Mismo patrón que el Cambio 3: sin tamaño de fuente explícito hoy (hereda 1rem). El H2 padre es "Todo resuelto antes de subir al auto." (`Included.tsx:33-38`).

**Diff propuesto (sin aplicar):**

```diff
- <div className="font-medium text-navy-900">{c.t}</div>
+ <h3 className="font-medium text-navy-900 text-base">{c.t}</h3>
  <div className="text-sm text-navy-700/70 mt-1">{c.s}</div>
```

**Clases a preservar + clase nueva necesaria:** igual que el Cambio 3: `font-medium text-navy-900` se mantienen, y se agrega `text-base` para neutralizar el reset de `h3` y evitar que el título pase de 1rem a 1.125rem.

**Riesgo de regresión visual:** medio si se omite `text-base` (mismo motivo que el Cambio 3); bajo si se incluye. Los 6 títulos ("Seguro incluido", "Asistencia 24/7", "Kilometraje libre", "Entrega flexible", "Vehículo higienizado", "Atención trilingüe") son cortos y de una sola línea en los anchos de card actuales, por lo que el riesgo de `line-height` es igual de bajo que en el Cambio 3.

**Decisión que requiere tu aprobación:** misma que el Cambio 3 (confirmar que agregar `text-base` es aceptable).

---

## Cambio 6 — Verificación final (no es un cambio de código)

Después de aplicar y aprobar los Cambios 1-5, confirmar en el HTML prerenderizado de ambas páginas:

- Un solo `<h1>` por página, sin cambios de contenido salvo el espacio del Cambio 1.
- Sin saltos de nivel: todo `<h3>` debe tener un `<h2>` ancestro dentro de la misma sección (no debe haber un `<h3>` "suelto" cuyo ancestro de encabezado más cercano sea un `<h1>` o no exista ninguno).
- Cero `<h2>` dentro de `<footer>` en ambas páginas (hoy hay 3 por página).
- Los 4 nuevos `<h3>` de About y los 6 de Included aparecen en el orden correcto respecto a los `<h3>` que ya existían (benefits en Home, no hay otro H3 en Included hoy).
- Ningún encabezado quedó vacío o con texto repetido sin sentido por un error de copy-paste del diff.

---

## Checklist de verificación (DOM prerenderizado + inspección visual)

Por cada tanda aprobada, en este orden:

1. Aplicar únicamente los cambios de esa tanda.
2. `npm run build` (sin deploy) para refrescar `dist/index.html` y `dist/flota/<slug>.html`.
3. Extraer la lista de encabezados del HTML generado (por ejemplo, grep de `<h[1-6]` en orden de aparición) y confirmar:
   - Un solo `<h1>` por página.
   - Sin saltos de nivel (ningún `<h2>` seguido de `<h4>` sin `<h3>` intermedio, etc.).
   - Ningún `<h1>`–`<h3>` vacío.
4. Si la tanda es el Cambio 1: confirmar que el `textContent` plano del `<h1>` de Home sea exactamente `"Conectados a tu destino."` (con un solo espacio, sin dobles espacios).
5. Si la tanda es el Cambio 2: confirmar 0 coincidencias de `<h2` dentro del bloque `<footer>` en ambas páginas, y que cada `<nav>` nuevo tenga un `aria-label` no vacío.
6. Si la tanda es el Cambio 3 o el Cambio 5: confirmar que los nuevos `<h3>` tengan la clase `text-base` en el HTML generado (o inspeccionar el tamaño computado con dev tools: debe seguir siendo 16px, no 18px).
7. Inspección visual manual (navegador, no solo HTML): capturar la sección afectada en desktop (~1440px) y mobile (~375px), antes y después del cambio, y confirmar a simple vista que tamaño de fuente, peso, color y espaciado no cambiaron. Prestar atención particular a:
   - Cambio 1: que no aparezca un espacio visible al final de la primera línea del H1 ni se mueva el salto de línea.
   - Cambios 3 y 5: que los títulos de las cards no se vean más grandes ni se corten a una línea adicional en mobile.
8. Recién después de validar 2-7, pasar a la siguiente tanda. No acumular cambios sin verificar.

---

## Tandas propuestas (aprobables una por una)

| Tanda | Contenido | Riesgo | Depende de |
|---|---|---|---|
| 1 | Cambio 1 (espacio en H1 de Home) | Bajo | — |
| 2 | Cambio 2 (3 `<h2>` del Footer → no-encabezado), aplica igual en Home y Vehicle Detail porque es el mismo componente | Muy bajo | Decisiones 1-3 del Cambio 2 |
| 3 | Cambio 3 (4 feature cards de About → H3) | Medio (mitigado con `text-base`) | Decisión del Cambio 3 |
| 4 | Cambio 4 (título del form de Contact → H3) | Bajo | — |
| 5 | Cambio 5 (6 cards de Included en Vehicle Detail → H3) | Medio (mitigado con `text-base`) | Decisión del Cambio 3 (mismo criterio) |
| 6 | Verificación cruzada final en ambas páginas | — | Tandas 1-5 aplicadas |

El Footer es un componente compartido por Home y Vehicle Detail, así que la Tanda 2 corrige ambas páginas en un solo cambio.

## Resumen de decisiones que requieren tu aprobación antes de implementar

1. **Cambio 1:** ¿espacio agregado en el JSX del componente (`Hero.tsx`) o en la clave i18n `home:hero.titleLine1`?
2. **Cambio 2:** ¿tag de reemplazo `<div>` o `<p>`? ¿un `<nav>` por columna o uno solo envolviendo las 3? ¿reusar los textos i18n existentes como `aria-label` o redactar uno nuevo (implica tocar `common.json` en ES/EN/PT-BR)?
3. **Cambios 3 y 5:** ¿se aprueba agregar la clase `text-base` a los nuevos `<h3>` para neutralizar el reset de tipografía? (Sin esa clase, el cambio no es visualmente neutro.)
4. **Cambio 4:** sin decisiones pendientes, es el cambio más simple.
5. **General:** ¿aplicar las tandas en el orden 1→2→3→4→5→6, o preferís otro orden (por ejemplo, agrupar 3 y 5 porque comparten el mismo patrón y la misma decisión de `text-base`)?
