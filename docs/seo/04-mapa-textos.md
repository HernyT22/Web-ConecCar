# Mapa de textos — Home y Vehicle Detail (ES)

Generado a partir de `dist/index.html` y `dist/flota/citroen-basalt-shine-2026-a.html` (prerender de `npm run build`, build del 2026-10-16) y de los componentes/i18n fuente. Alcance: solo ES, solo Home y Vehicle Detail. No incluye `/ayuda` ni `help.json`/`helpContent.ts`.

Ficha de ejemplo usada en todo el documento para Vehicle Detail: **`citroen-basalt-shine-2026-a`** (Citroën Basalt Shine 2026), definida en `src/data/vehicles.ts` líneas 44-68. Es la primera ficha del array y la única con `badge: 'MostRentedCar'`.

Convención: "plantilla fija" = mismo texto para todas las fichas/tarjetas (vive en un componente o en un JSON i18n sin interpolar datos del vehículo). "Dato por vehículo" = sale de un campo de `src/data/vehicles.ts` (o de una clave i18n indexada por `slug`, p. ej. `vehicle.json` → `vehicleDescriptions.<slug>`).

---

## PARTE 1 — Árbol de encabezados

### Home (orden de aparición en `dist/index.html`)

| Nivel | Texto literal | Componente/sección | Archivo:línea | Clave i18n |
|---|---|---|---|---|
| H1 | "Conectados" + `<br/>` + "a tu destino." (el DOM concatena sin espacio: "Conectadosa tu destino.", ver Parte 4) | Hero | `src/app/components/ConecCar/Hero.tsx:42-46` | `home:hero.titleLine1` / `home:hero.titleLine2` (`src/i18n/locales/es/home.json:4-5`) |
| H2 | Una rentadora mendocina, pensada para viajar de verdad | About (vía Section) | `src/app/components/ConecCar/Section.tsx:38-40` | `home:about.title` (`home.json:14`) |
| &nbsp;&nbsp;H3 | Todo lo que incluye tu alquiler. | About — benefits | `src/app/components/ConecCar/About.tsx:120-125` | `home:about.benefitsTitle` (`home.json:25`) |
| H2 | Vehículos para cada Mendoza posible. | Fleet (vía Section) | `src/app/components/ConecCar/Section.tsx:38-40` | `fleet:section.title` (`fleet.json:4`) |
| &nbsp;&nbsp;H3 | Citroën Basalt Shine 2026 | Fleet — tarjeta (×3, slugs `-a`,`-b`,`-c`) | `src/app/components/ConecCar/Fleet.tsx:66-68` | literal: `{v.brand} {v.model} {v.year}` (`src/data/vehicles.ts`) |
| &nbsp;&nbsp;H3 | Chery Tiggo 2 2026 | Fleet — tarjeta (×2) | idem | idem |
| &nbsp;&nbsp;H3 | Honda Accord 2022 | Fleet — tarjeta | idem | idem |
| &nbsp;&nbsp;H3 | Volkswagen Fox 2022 | Fleet — tarjeta | idem | idem |
| &nbsp;&nbsp;H3 | Kia Rio 2022 | Fleet — tarjeta | idem | idem |
| H2 | Los destinos que nuestros clientes eligen. | Destinations (vía Section) | `Section.tsx:38-40` | `destinations:section.title` (`destinations.json:4`) |
| &nbsp;&nbsp;H3 | Valle de Uco / San Rafael / Malargüe / Gran Mendoza / Potrerillos / Cañón del Atuel (×6) | Destinations — tarjeta | `src/app/components/ConecCar/Destinations.tsx:120-122` | `destinations:items.<id>.name` (`destinations.json:15,21,27,33,39,45`) |
| H2 | Lo que dicen nuestros clientes cuando devuelven las llaves. | Reviews (vía Section) | `Section.tsx:38-40` | `reviews:section.title` (`reviews.json:4`) |
| H2 | Pagá como prefieras. | Payments | `src/app/components/ConecCar/Payments.tsx:130-132` | `payments.title` (`src/i18n/locales/es/common.json:30`) |
| H2 | A un mensaje de la ruta abierta. | Contact (vía Section) | `Section.tsx:38-40` | `contact:section.title` (`contact.json:4`) |
| H2 | Navegación | Footer — columna | `src/app/components/ConecCar/Footer.tsx:92` | `footer.navigation` (`common.json:36`) |
| H2 | Flota | Footer — columna | `Footer.tsx:106` | `footer.fleet` (`common.json:37`) |
| H2 | Ayuda | Footer — columna | `Footer.tsx:120` | `footer.help` (`common.json:38`) |

No hay H4, H5 ni H6 en Home. Un solo H1.

### Vehicle Detail (ejemplo `citroen-basalt-shine-2026-a`)

| Nivel | Texto literal | Componente/sección | Archivo:línea | Clave i18n |
|---|---|---|---|---|
| H1 | Citroën **Basalt Shine** (sin el año) | VehicleHero | `src/app/sections/vehicle-detail/VehicleHero.tsx:100-102` | literal: `{brand}` + `{model}` (`vehicles.ts` campos `brand`, `model`) |
| H2 | Especificaciones del vehículo. | Specs | `src/app/sections/vehicle-detail/Specs.tsx:40-42` | `vehicle:specs.title` (`vehicle.json:21`) |
| H2 | Todo resuelto antes de subir al auto. | Included | `src/app/sections/vehicle-detail/Included.tsx:33-38` | `vehicle:included.title` (`vehicle.json:39`) |
| H2 | Otros vehículos de la flota. | Similar | `src/app/sections/vehicle-detail/Similar.tsx:40-42` | `vehicle:similar.title` (`vehicle.json:53`) |
| &nbsp;&nbsp;H3 | Chery Tiggo 2 2026 / Citroën Basalt Shine 2026 (×2, variantes `-b` y `-c`) | Similar — tarjeta | `Similar.tsx:69-71` | literal: `{brand} {model} {year}` (otras fichas de `vehicles.ts`) |
| H2 | Navegación | Footer | `Footer.tsx:92` | `footer.navigation` |
| H2 | Flota | Footer | `Footer.tsx:106` | `footer.fleet` |
| H2 | Ayuda | Footer | `Footer.tsx:120` | `footer.help` |

No hay H4, H5 ni H6. Un solo H1. El Breadcrumb (`src/app/sections/vehicle-detail/Breadcrumb.tsx:32-34`) muestra "Citroën Basalt Shine 2026" (con año) pero como `<span>`, no como encabezado.

---

## PARTE 2 — Inventario de textos

### Home — `<title>`, meta, canonical, Open Graph, Twitter Card

| Campo | Valor | Longitud | Archivo:línea (fuente) |
|---|---|---|---|
| `<title>` | "Coneccar Rent — Alquiler de vehículos premium en Mendoza, Argentina" | 67 caracteres | `src/seo/site.ts:6` (`DEFAULT_TITLE`, usado porque `SLOTS.home.title` = `[KW-PENDIENTE]` en `src/seo/slots.ts:14`) |
| meta description | "Alquiler de vehículos premium en Mendoza para viajeros de negocios y visitantes de todo el mundo. Atención bilingüe, precios transparentes, sin sorpresas." | 154 caracteres | `src/seo/site.ts:7-8` (`DEFAULT_DESCRIPTION`, mismo motivo: `SLOTS.home.description` pendiente) |
| canonical | `https://coneccar-rent.com/` | — | `src/seo/head.ts:85` + `src/data/contact.ts:37` (`SITE_URL`) |
| og:title | "Coneccar Rent — Alquiler de vehículos premium en Mendoza, Argentina" | = title | `src/seo/head.ts:90` |
| og:description | = meta description | = meta description | `head.ts:91` |
| og:url | `https://coneccar-rent.com/` | — | `head.ts:92` |
| og:type | website | — | `head.ts:93` |
| og:locale | es_AR | — | `head.ts:94` |
| og:site_name | Coneccar Rent | — | `head.ts:95` (`BRAND_NAME`, `contact.ts:6`) |
| og:image | `https://coneccar-rent.com/og/home.jpg` | 1200×630 | `head.ts:96-98`, `src/seo/site.ts:17-20` |
| twitter:card | summary_large_image | — | `head.ts:99` |
| twitter:title | = title | — | `head.ts:100` |
| twitter:description | = meta description | — | `head.ts:101` |
| twitter:image | = og:image | — | `head.ts:102` |

### Home — JSON-LD (prerenderizado en `dist/index.html`)

Un solo `<script type="application/ld+json">` con `@graph` de 3 nodos (`src/seo/jsonld.ts`, ensamblado en `src/seo/head.ts:69`):

| `@type` | Campos de texto relevantes |
|---|---|
| Organization | `name`: "Coneccar Rent"; `sameAs`: instagram |
| WebSite | `name`: "Coneccar Rent"; `inLanguage`: "es" |
| AutoRental | `name`: "Coneccar Rent"; `address.streetAddress`: "Primitivo de la Reta 928, Local 4"; `address.addressLocality`: "Mendoza"; `areaServed.name`: "Mendoza, Argentina"; `paymentAccepted`: "Visa, Mastercard, Amex, Mercado Pago, Transferencia, Efectivo ARS, Efectivo USD" |

No hay nodo `Product`, `Car` ni `BreadcrumbList` en Home (son exclusivos de Vehicle Detail).

### Home — Inventario de textos visibles (orden de aparición)

| Sección | Tipo | Texto literal | Palabras | Archivo:línea | Clave i18n |
|---|---|---|---|---|---|
| Nav | aria | Navegación principal | 2 | `Nav.tsx:42` | `nav.ariaLabel` (`common.json:10`) |
| Nav | enlace | Nosotros | 1 | `Nav.tsx:59` | `nav.about` (`common.json:3`) |
| Nav | enlace | Flota | 1 | `Nav.tsx:59` | `nav.fleet` (`common.json:4`) |
| Nav | enlace | Destinos | 1 | `Nav.tsx:59` | `nav.destinations` (`common.json:5`) |
| Nav | enlace | Opiniones | 1 | `Nav.tsx:59` | `nav.reviews` (`common.json:6`) |
| Nav | enlace | Contacto | 1 | `Nav.tsx:59` | `nav.contact` (`common.json:7`) |
| Nav | botón | Reservar vehículo | 2 | `Nav.tsx:73` | `nav.bookCta` (`common.json:9`) |
| Nav | aria | Menú | 1 | `Nav.tsx:77` | `nav.menu` (`common.json:11`) |
| Nav | aria | Idioma | 1 | `LanguageSwitcher.tsx` | `language.label` (`common.json:71`) |
| Nav | alt | Coneccar Rent (logo) | 2 | `Nav.tsx:37` | — (`BRAND_NAME`, `contact.ts:6`) |
| Hero | badge | Movilidad premium en Mendoza | 4 | `Hero.tsx:39` | `hero.badge` (`home.json:3`) |
| Hero | H1 | Conectados a tu destino. | 4 | `Hero.tsx:42-46` | `hero.titleLine1`/`titleLine2` (`home.json:4-5`) |
| Hero | p | Movilidad Inteligente para cada destino | 5 | `Hero.tsx:47-49` | `hero.subtitle` (`home.json:6`) |
| Hero | botón | Reservar Ahora | 2 | `Hero.tsx:53-56` | `hero.ctaPrimary` (`home.json:7`) |
| Hero | botón | Hablar con un asesor | 4 | `Hero.tsx:61-64` | `hero.ctaSecondary` (`home.json:8`) |
| Hero | label | Atención 24/7 | 2 | `Hero.tsx:70` | `hero.clockBadge` (`home.json:9`) |
| Hero | p | Entrega en aeropuerto, hoteles y oficina propia. | 7 | `Hero.tsx:74-75` | `hero.deliveryText` (`home.json:10`) |
| Hero | alt | Ruta hacia la cordillera de los Andes en Mendoza | 9 | `Hero.tsx:27` | — (literal, no i18n) |
| About | eyebrow | SOBRE CONECCAR RENT | 3 | `Section.tsx:31-33` | `about.eyebrow` (`home.json:13`) |
| About | H2 | Una rentadora mendocina, pensada para viajar de verdad | 8 | `Section.tsx:38-40` | `about.title` (`home.json:14`) |
| About | p | Coneccar Rent nació en Mendoza con una idea simple: | 9 | `About.tsx:50-52` | `about.paragraph1` (`home.json:15`) |
| About | p | Hacer que alquilar un vehículo sea fácil, rápido y confiable. | 10 | `About.tsx:53-55` | `about.paragraph1Dorado` (`home.json:16`) |
| About | p | Atención personalizada, vehículos cuidados y una experiencia pensada para que disfrutes el viaje desde el primer momento | 17 | `About.tsx:59` | `about.paragraph2` (`home.json:17`) |
| About | badge | Fundada localmente | 2 | `About.tsx:61-71` | `about.chips.localFounded` (`home.json:19`) |
| About | badge | Empresa familiar | 2 | idem | `about.chips.familyOwned` (`home.json:20`) |
| About | badge | Flota seleccionada y cuidada | 4 | idem | `about.chips.bCorp` (`home.json:21`) |
| About | badge | Totalmente asegurado | 2 | idem | `about.chips.carbonOffset` (`home.json:22`) |
| About | p (título card) | Totalmente asegurado | 2 | `About.tsx:92-96` | `features.totallyInsured.title` (`home.json:91`) |
| About | p (desc card) | Cobertura todo incluido en cada alquiler, con pólizas claras. | 9 | idem | `features.totallyInsured.description` (`home.json:92`) |
| About | p (título card) | Equipo trilingüe | 2 | idem | `features.bilingual.title` (`home.json:95`) |
| About | p (desc card) | Atención en ES / EN / PT antes, durante y después de tu viaje. | 14 | idem | `features.bilingual.description` (`home.json:96`) |
| About | p (título card) | Asistencia 24/7 | 2 | idem | `features.support.title` (`home.json:99`) |
| About | p (desc card) | Hablás con una persona real a cualquier hora. | 9 | idem | `features.support.description` (`home.json:100`) |
| About | p (título card) | Transparencia total | 2 | idem | `features.concierge.title` (`home.json:103`) |
| About | p (desc card) | Sin letra chica, con procesos claros y acompañamiento en toda la experiencia. | 12 | idem | `features.concierge.description` (`home.json:104`) |
| About | eyebrow | Beneficios | 1 | `About.tsx:116-118` | `about.benefitsEyebrow` (`home.json:24`) |
| About | H3 | Todo lo que incluye tu alquiler. | 6 | `About.tsx:120-125` | `about.benefitsTitle` (`home.json:25`) |
| About | badge | Sin costos ocultos | 3 | `About.tsx:141-143` | `about.benefits.noHiddenCosts` (`home.json:27`) |
| About | badge | Entrega en aeropuerto | 3 | idem | `about.benefits.airportDelivery` (`home.json:28`) |
| About | badge | Kilometraje libre | 2 | idem | `about.benefits.unlimitedMileage` (`home.json:29`) |
| About | badge | Reserva online en minutos | 4 | idem | `about.benefits.onlineBooking` (`home.json:30`) |
| Fleet | eyebrow | Flota | 1 | `Section.tsx:31-33` | `section.eyebrow` (`fleet.json:3`) |
| Fleet | H2 | Vehículos para cada Mendoza posible. | 5 | `Section.tsx:38-40` | `section.title` (`fleet.json:4`) |
| Fleet | p (kicker) | City cars, sedans y SUVs preparados para moverte por Mendoza con comodidad y confianza. | 14 | `Section.tsx:44-47` | `section.kicker` (`fleet.json:5`) |
| Fleet | placeholder | Buscar por modelo, tipo o característica… | 6 | `Fleet.tsx:181` | `search.placeholder` (`fleet.json:8`) |
| Fleet | aria/label | Buscar vehículos | 2 | `Fleet.tsx:182` | `search.ariaLabel` (`fleet.json:9`) |
| Fleet | label | Ordenar | 1 | `Fleet.tsx:187` | `sort.label` (`fleet.json:12`) |
| Fleet | option | Recomendado / Precio: menor a mayor / Precio: mayor a menor | 1/4/4 | `Fleet.tsx:195` | `sort.recommended`/`priceAsc`/`priceDesc` (`fleet.json:13-15`) |
| Fleet | badge/tab | Todos | 1 | `Fleet.tsx:210` | `tabs.all` (`fleet.json:18`) |
| Fleet | badge/tab | SUV Coupé / SUV Compacta / Sedán / Hatchback Compacto | 2/2/1/2 | `Fleet.tsx:223` | `enums.category.*` (`fleet.json:32-35`) |
| Fleet | p (vacío, **no en SSR**) | No hay vehículos que coincidan con esos filtros. | 8 | `Fleet.tsx:256` | `noResults` (`fleet.json:20`) |
| Fleet | badge (tarjeta) | El más alquilado | 3 | `Fleet.tsx:57-59` | `enums.badge.MostRentedCar` (`fleet.json:62`) — solo en la ficha `-a` |
| Fleet | badge (tarjeta) | Nuevo | 1 | idem | `enums.badge.new` (`fleet.json:58`) — fichas `-c` y `chery…-a` |
| Fleet | badge (tarjeta) | Corporativo | 1 | idem | `enums.badge.corporate` (`fleet.json:59`) — ficha `honda-accord-2022` |
| Fleet | H3 ×3 | Citroën Basalt Shine 2026 | 4 c/u | `Fleet.tsx:66-68` | literal (`vehicles.ts`) — idéntico en 3 fichas |
| Fleet | H3 ×2 | Chery Tiggo 2 2026 | 4 c/u | idem | idéntico en 2 fichas |
| Fleet | H3 | Honda Accord 2022 / Volkswagen Fox 2022 / Kia Rio 2022 | 3 c/u | idem | literal |
| Fleet | span (tarjeta) | SUV Coupé — Azul Cosmo / SUV Compacta — Blanco / SUV Coupé — Sting Grey / SUV Coupé — Blanco Nacarado / SUV Compacta — Rojo / Sedán ejecutivo / Hatchback compacto / Sedán urbano | 5/4/5/5/4/2/2/2 | `Fleet.tsx:70` | `vehicles.ts` campo `shortDescription` |
| Fleet | label (×8) | asientos / valijas | 1/1 | `Fleet.tsx:75-79` | `card.seats`/`card.bags` (`fleet.json:22-23`) |
| Fleet | label (×8) | A/C | 1 | `Fleet.tsx:87` | `card.ac` (`fleet.json:24`) |
| Fleet | label (×8) | Desde | 1 | `Fleet.tsx:92` | `card.from` (`fleet.json:25`) |
| Fleet | label (×8) | día | 1 | `Fleet.tsx:99` | `card.perDay` (`fleet.json:26`) |
| Fleet | botón (×8) | Ver | 1 | `Fleet.tsx:109` | `card.viewDetails` (`fleet.json:28`) |
| Fleet | alt (×3 idénticos) | Citroën Basalt Shine | 3 | `Fleet.tsx:48` | literal `{brand} {model}` — sin diferenciar color/SKU |
| Fleet | alt (×2 idénticos) | Chery Tiggo 2 | 3 | idem | idem |
| Fleet | alt | Honda Accord / Volkswagen Fox / Kia Rio | 2 c/u | idem | idem |
| Destinations | eyebrow | Destinos | 1 | `Section.tsx:31-33` | `section.eyebrow` (`destinations.json:3`) |
| Destinations | H2 | Los destinos que nuestros clientes eligen. | 6 | `Section.tsx:38-40` | `section.title` (`destinations.json:4`) |
| Destinations | p (kicker) | Rutas, paisajes y recomendaciones para disfrutar Mendoza de verdad. | 9 | `Section.tsx:44-47` | `section.kicker` (`destinations.json:5`) |
| Destinations | badge (×6) | Zona de bodegas / Paisajes, espejos de agua, bodegas / Aire libre y centro de ski / Bodegas, hoteles, paisajes / Lago y montaña / Rafting y cañadones | 3/5/6/4/3/3 | `Destinations.tsx:107` | `items.<id>.tag` |
| Destinations | badge (×6) | 80 km · 1h / 250 km · 3h / 330 km · 4h / Radio 20 km / 60 km · 1h / 300 km · 3h 30m | — | `Destinations.tsx:111` | `items.<id>.distance` |
| Destinations | H3 (×6) | Valle de Uco / San Rafael / Malargüe / Gran Mendoza / Potrerillos / Cañón del Atuel | 3/2/1/2/1/3 | `Destinations.tsx:120-122` | `items.<id>.name` |
| Destinations | label (×6, idéntico) | Provincia de Mendoza | 3 | `Destinations.tsx:123-126` | `card.subregion` (`destinations.json:8`) |
| Destinations | aria (×6) | Cerrar | 1 | `Destinations.tsx:151` | `card.closeAriaLabel` (`destinations.json:9`) |
| Destinations | p (panel, ×6) | Entre viñedos y montañas, el Valle de Uco reúne… (y las otras 5 descripciones) | 29 (Valle de Uco) | `Destinations.tsx:161-163` | `items.<id>.description` |
| Destinations | botón (×6, idéntico) | Saber más | 2 | `Destinations.tsx:173` | `card.ctaMore` (`destinations.json:10`) |
| Destinations | alt (×6) | Valle de Uco / San Rafael / Malargüe / Gran Mendoza / Potrerillos / Cañón del Atuel | = nombre | `Destinations.tsx:95` | = `items.<id>.name` |
| Reviews | eyebrow | Opiniones de clientes | 2 | `Section.tsx:31-33` | `section.eyebrow` (`reviews.json:3`) |
| Reviews | H2 | Lo que dicen nuestros clientes cuando devuelven las llaves. | 9 | `Section.tsx:38-40` | `section.title` (`reviews.json:4`) |
| Reviews | p (kicker) | Miles de kilómetros recorridos. Estas son sus experiencias. | 8 | `Section.tsx:44-47` | `section.kicker` (`reviews.json:5`) |
| Reviews | badge (×5, idéntico) | Opinión verificada | 2 | `Reviews.tsx:38` | `badges.verified` (`reviews.json:8`) |
| Reviews | p (testimonio, 5) | "La atención es un 10/10…" (48 palabras) + 4 más (30-45 palabras c/u) | 48 (review1) | `Reviews.tsx:48-50` | `items.review1..5.text` |
| Reviews | nombre (×5) | Agustín Laiseca / Andrea Colamedici / Natalia Mamani / Bastiaan Willers / Magdalena Romero | — | `Reviews.tsx:61-63` | `items.<id>.name` |
| Reviews | rol (×5) | Argentina / De visita desde Italia / Mendoza, Argentina / De visita desde Alemania / De visita desde España | — | `Reviews.tsx:65` | `items.<id>.role` |
| Payments | eyebrow | Medios de pago | 3 | `Payments.tsx:128` | `payments.eyebrow` (`common.json:29`) |
| Payments | H2 | Pagá como prefieras. | 3 | `Payments.tsx:130-132` | `payments.title` (`common.json:30`) |
| Payments | p | Locales e internacionales. Aceptamos pagos en ARS y USD. | 8 | `Payments.tsx:133-135` | `payments.subtitle` (`common.json:31`) |
| Payments | label/alt (×7) | Visa / Mastercard / American Express / Mercado Pago / Transferencia bancaria / Efectivo ARS / Efectivo USD | — | `Payments.tsx:17-120` | `contact.ts:70-78` (`PAYMENT_METHODS`) |
| Contact | eyebrow | Contacto | 1 | `Contact.tsx:129` | `section.eyebrow` (`contact.json:3`) |
| Contact | H2 | A un mensaje de la ruta abierta. | 7 | `Contact.tsx:132-134` | `section.title` (`contact.json:4`) |
| Contact | p (kicker) | Preguntanos lo que necesites — rutas, itinerarios a medida, disponibilidad para una fecha puntual. En horario comercial respondemos en menos de 10 minutos. | 23 | `Contact.tsx:135-137` | `section.kicker` (`contact.json:5`) |
| Contact | botón | Escribinos por WhatsApp | 3 | `Contact.tsx:148` | `whatsapp.primaryLabel` (`contact.json:8`) |
| Contact | botón | Línea alternativa | 2 | `Contact.tsx:158` | `whatsapp.secondaryLabel` (`contact.json:9`) |
| Contact | enlace | contacto@coneccar-rent.com | 1 | `Contact.tsx:164-169` | — (`EMAIL`, `contact.ts:34`) |
| Contact | enlace + aria | +54 9 261 534-6953 / "Teléfono: +54 9 261 534-6953" | 1 / 2 | `Contact.tsx:170-178` | `channels.phoneLabel` (`contact.json:14`) + `contact.ts:25` |
| Contact | enlace + aria | Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza / "Dirección" | 9 / 1 | `Contact.tsx:179-190` | `channels.addressLabel` (`contact.json:15`) + `contact.ts:48` |
| Contact | label | Seguinos | 1 | `Contact.tsx:194-196` | `social.label` (`contact.json:18`) |
| Contact | enlace + aria | @coneccar.rent / "Seguinos en Instagram" | 1 / 3 | `Contact.tsx:197-204` | `social.instagramAria` (`contact.json:19`); `@coneccar.rent` está hardcodeado, no sale de `contact.ts` |
| Contact | p (form title) | Pedinos que te llamemos | 4 | `Contact.tsx:209-211` | `form.title` (`contact.json:24`) |
| Contact | p (form subtitle) | Te contactamos dentro de la próxima hora. | 6 | `Contact.tsx:212-214` | `form.subtitle` (`contact.json:25`) |
| Contact | label/placeholder | Nombre completo / Sofía Méndez | 2/2 | `Contact.tsx:218-227` | `form.fields.name.*` (`contact.json:28-29`) |
| Contact | label/placeholder | Email / vos@ejemplo.com | 1/1 | `Contact.tsx:238-247` | `form.fields.email.*` (`contact.json:32-33`) |
| Contact | label/placeholder | Teléfono (con código de país) / +1 415 555 0199 | 4/4 | `Contact.tsx:258-267` | `form.fields.phone.*` (`contact.json:36-37`) |
| Contact | label | Fecha de retiro | 3 | `Contact.tsx:278-280` | `form.fields.pickupDate.label` (`contact.json:40`) |
| Contact | label/placeholder | Notas / Algo que tengamos que saber sobre tu viaje… | 1/9 | `Contact.tsx:299-308` | `form.fields.notes.*` (`contact.json:43-44`) |
| Contact | botón | Enviar solicitud | 2 | `Contact.tsx:342-348` | `form.submit` (`contact.json:47`) |
| Contact | imgs decorativas | alt="" (×2, ícono WhatsApp) | 0 | `Contact.tsx:147,157` | — |
| Contact | **no en SSR** | Este campo es obligatorio / Ingresá un email válido | — | `contact.json:50-51` | solo tras interacción con el form |
| Contact | **no en SSR** | ¡Mensaje enviado!… / Hubo un problema al enviar… | — | `contact.json:54-55` | solo tras submit |
| Contact | **no en SSR / no usado en ningún lado** | Si no contestamos en la principal | 6 | `contact.json:10` (`whatsapp.secondaryHint`) | clave i18n huérfana (ningún componente la lee) |
| Footer | alt | Coneccar Rent (logo) | 2 | `Footer.tsx:57` | `BRAND_NAME` (`contact.ts:6`) |
| Footer | p | Alquiler de vehículos en Mendoza, operado por gente que vive acá. | 11 | `Footer.tsx:62-65` | `footer.tagline`/`taglineAccent` (`common.json:34-35`) |
| Footer | p | Coneccar Rent | 2 | `Footer.tsx:67` | `BRAND_NAME` |
| Footer | enlace | Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza | 9 | `Footer.tsx:68-75` | `contact.ts:48` (`ADDRESS`) |
| Footer | enlace | +54 9 261 534-6953 | 1 | `Footer.tsx:76-78` | `contact.ts:24` |
| Footer | enlace | contacto@coneccar-rent.com | 1 | `Footer.tsx:79-81` | `contact.ts:34` |
| Footer | p | Oficina lun a sáb 9:00–19:00 | 5 | `Footer.tsx:82` | `footer.nap.office`+`days` (`common.json:55,57-62`) |
| Footer | p | Atención online 24/7 | 3 | `Footer.tsx:83` | `footer.nap.online` (`common.json:56`) |
| Footer | p | © 2026 Coneccar Rent | 3 | `Footer.tsx:86` | `footer.copyright` (`common.json:68`) |
| Footer | H2 | Navegación | 1 | `Footer.tsx:92` | `footer.navigation` (`common.json:36`) |
| Footer | enlaces | Nosotros / Destinos / Opiniones / Contacto | 1 c/u | `Footer.tsx:94-99` | `footer.links.*` (`common.json:40-43`) |
| Footer | H2 | Flota | 1 | `Footer.tsx:106` | `footer.fleet` (`common.json:37`) |
| Footer | enlaces | SUV Coupé / SUV Compacta / Sedán / Hatchback Compacto | 2/2/1/2 | `Footer.tsx:108-114` | `fleet:enums.category.*` |
| Footer | H2 | Ayuda | 1 | `Footer.tsx:120` | `footer.help` (`common.json:38`) |
| Footer | enlaces | Seguro / Política de cancelación / Manejar en Argentina / Preguntas frecuentes | 1/3/3/3 | `Footer.tsx:122-128` | `footer.links.*` (`common.json:44-47`) |
| Footer | enlaces legales | Términos / Privacidad | 1/1 | `Footer.tsx:136-137` | `footer.legal.*` (`common.json:50-51`) |
| Footer | enlace | Hecho por Hernán Guevara | 4 | `Footer.tsx:139-146` | — literal, no i18n |

**Nota sobre `home.json` líneas 33-87:** las claves `destinations`, `reviews`, `payments` y `contact` dentro de `home.json` **no se usan en ningún componente** (Destinations/Reviews/Contact usan sus propios namespaces y Payments usa `common`). Ver Parte 4.

### Vehicle Detail — `<title>`, meta, canonical, Open Graph, Twitter Card (ejemplo `citroen-basalt-shine-2026-a`)

| Campo | Valor | Longitud | Archivo:línea (fuente) |
|---|---|---|---|
| `<title>` | "Citroën Basalt Shine 2026 · Coneccar Rent" | 41 caracteres | `src/seo/head.ts:76` (fallback `${name} · ${BRAND_NAME}`, porque `SLOTS.vehicles['citroen-basalt-shine-2026-a'].title` = `[KW-PENDIENTE]` en `src/seo/slots.ts:19`) |
| meta description | "Citroën Basalt Shine 2026 · SUV Coupé — Azul Cosmo. Tarifa diaria $ 110.000 ARS. Alquiler en Mendoza." | 101 caracteres | `src/seo/head.ts:75,77` (fallback compuesto con `shortDescription` y `pricePerDay`, mismo motivo de slot pendiente) |
| canonical | `https://coneccar-rent.com/flota/citroen-basalt-shine-2026-a` | — | `head.ts:78,85` |
| og:title | = title | — | `head.ts:90` |
| og:description | = meta description | — | `head.ts:91` |
| og:url | = canonical | — | `head.ts:92` |
| og:type | website | — | `head.ts:93` |
| og:locale | es_AR | — | `head.ts:94` |
| og:site_name | Coneccar Rent | — | `head.ts:95` |
| og:image | `https://coneccar-rent.com/og/citroen-basalt-shine-2026-a.jpg` | 1200×630 | `head.ts:79,96-98` |
| twitter:card | summary_large_image | — | `head.ts:99` |
| twitter:title | = title | — | `head.ts:100` |
| twitter:description | = meta description | — | `head.ts:101` |
| twitter:image | = og:image | — | `head.ts:102` |

### Vehicle Detail — JSON-LD

| `@type` | Campos de texto relevantes | Archivo |
|---|---|---|
| Car | `name`: "Citroën Basalt Shine 2026"; `description`: "Diseño innovador, gran espacio interior y una conducción pensada para el confort. Perfecto para quienes buscan viajar con estilo, ya sea por trabajo o para descubrir nuevos paisajes." (= `vehicles.ts` campo `description`); `brand.name`: "Citroën"; `model`: "Basalt Shine"; `bodyType`: "SUV" (en inglés, de `src/seo/jsonld.ts:94-97` `BODY_TYPES`) | `src/seo/jsonld.ts:111-141` |
| BreadcrumbList | item 1 `name`: "Inicio"; item 2 `name`: "Citroën Basalt Shine 2026" | `jsonld.ts:143-149` |

No hay `AggregateRating` ni `Review` en el `Car` (las 5 reseñas de Home no están conectadas al JSON-LD de ninguna ficha).

### Vehicle Detail — Inventario de textos visibles (orden de aparición)

| Sección | Tipo | Texto literal | Palabras | Archivo:línea | Clave i18n / dato |
|---|---|---|---|---|---|
| Nav | (idéntico a Home) | — | — | `Nav.tsx` | — |
| Breadcrumb | enlace | Volver a la flota | 4 | `Breadcrumb.tsx:23-26` | `breadcrumb.back` (`vehicle.json:3`) |
| Breadcrumb | aria | Migas de pan | 3 | `Breadcrumb.tsx:27` | `breadcrumb.ariaLabel` (`vehicle.json:6`) |
| Breadcrumb | enlace | Inicio | 1 | `Breadcrumb.tsx:28` | `breadcrumb.home` (`vehicle.json:4`) |
| Breadcrumb | enlace | Flota | 1 | `Breadcrumb.tsx:30` | `breadcrumb.fleet` (`vehicle.json:5`) |
| Breadcrumb | span (actual) | Citroën Basalt Shine 2026 | 4 | `Breadcrumb.tsx:32-34` | literal `{brand} {model} {year}` (`vehicles.ts`) |
| VehicleHero | badge | El más alquilado | 3 | `VehicleHero.tsx:90-93` | `fleet:enums.badge.MostRentedCar` (`fleet.json:62`) — **plantilla, dato: `vehicle.badge`** |
| VehicleHero | badge | SUV Coupé | 2 | `VehicleHero.tsx:95-97` | `fleet:enums.category.suv-coupe` (`fleet.json:32`) — plantilla, dato: `vehicle.category` |
| VehicleHero | H1 | Citroën Basalt Shine | 3 | `VehicleHero.tsx:100-102` | literal `{brand} {model}` — **dato por vehículo, sin año** |
| VehicleHero | span | 2026 | 1 | `VehicleHero.tsx:104` | dato: `vehicle.year` |
| VehicleHero | span | SUV Coupé — Azul Cosmo | 5 | `VehicleHero.tsx:106` | `vehicle:vehicleDescriptions.citroen-basalt-shine-2026-a.short` (`vehicle.json:74`) — **dato por vehículo** |
| VehicleHero | p (descripción larga) | Diseño innovador, gran espacio interior y una conducción pensada para el confort. Perfecto para quienes buscan viajar con estilo, ya sea por trabajo o para descubrir nuevos paisajes. | 28 | `VehicleHero.tsx:114-116` | `vehicle:vehicleDescriptions.citroen-basalt-shine-2026-a.long` (`vehicle.json:75`) — **dato por vehículo**; único párrafo de cuerpo de toda la página |
| VehicleHero | chip | 5 pasajeros | 2 | `VehicleHero.tsx:119-125` | `vehicle:specs.passenger` (`vehicle.json:33`) — dato: `seats` |
| VehicleHero | chip | 3 valijas | 2 | idem | `vehicle:specs.suitcase` (`vehicle.json:35`) — dato: `bags` |
| VehicleHero | chip | Automática | 1 | idem | `fleet:enums.transmission.automatic` (`fleet.json:43`) |
| VehicleHero | chip | Nafta | 1 | idem | `fleet:enums.fuel.gasoline` (`fleet.json:47`) |
| VehicleHero | chip | Aire acondicionado | 2 | idem | `fleet:enums.climate.ac` (`fleet.json:53`) |
| VehicleHero | label | Tarifa diaria | 2 | `VehicleHero.tsx:130` | `vehicle:hero.dailyRate` (`vehicle.json:9`) |
| VehicleHero | precio | US$ 110.000 ARS (formateado "$ 110.000 ARS") | — | `VehicleHero.tsx:132-134` | dato: `pricePerDay`+`currency`, `formatPrice()` (`vehicles.ts:16-20`) |
| VehicleHero | label | / día | 2 | `VehicleHero.tsx:135` | `vehicle:hero.perDay` (`vehicle.json:11`) |
| VehicleHero | botón | Reservar ahora | 2 | `VehicleHero.tsx:144` | `vehicle:hero.book` (`vehicle.json:12`) |
| VehicleHero | botón | Consultar | 1 | `VehicleHero.tsx:153` | `vehicle:hero.consult` (`vehicle.json:13`) |
| VehicleHero | contador | 1 / 3 | — | `VehicleHero.tsx:167` | literal `{active+1} / {images.length}` — dato: cantidad real de imágenes (3, no 4; ver Parte 4) |
| VehicleHero | alt (imagen principal) | Citroën Basalt Shine | 3 | `VehicleHero.tsx:163` | literal `{brand} {model}` |
| VehicleHero | alt (miniaturas ×3) | citroën basalt · 3/4 frontal / · trasera / · interior | 4/2/2 | `VehicleHero.tsx:188` | dato: `vehicles.ts` campo `imageLabels` (minúsculas, sin año) |
| VehicleHero | aria (×3) | Ver imagen 1 de 3 / 2 de 3 / 3 de 3 | 4 c/u | `VehicleHero.tsx:175` | `vehicle:hero.viewImage` (`vehicle.json:10`) |
| VehicleHero | alt="" (decorativo) | fondo cordillera, ícono WhatsApp | 0 | `VehicleHero.tsx:67,153` | — |
| Specs | eyebrow | Ficha técnica | 2 | `Specs.tsx:38` | `vehicle:specs.eyebrow` (`vehicle.json:20`) |
| Specs | H2 | Especificaciones del vehículo. | 3 | `Specs.tsx:40-42` | `vehicle:specs.title` (`vehicle.json:21`) |
| Specs | label/valor | Categoría / SUV Coupé | 1/2 | `Specs.tsx:16` | `specs.labels.category` (`vehicle.json:23`) + `fleet:enums.category` |
| Specs | label/valor | Año / 2026 | 1/1 | `Specs.tsx:17` | `specs.labels.year` (`vehicle.json:24`) + dato `year` |
| Specs | label/valor | Capacidad / 5 pasajeros | 1/2 | `Specs.tsx:18` | `specs.labels.seats` (`vehicle.json:25`) |
| Specs | label/valor | Equipaje / 3 valijas | 1/2 | `Specs.tsx:19` | `specs.labels.bags` (`vehicle.json:26`) |
| Specs | label/valor | Transmisión / Automática | 1/1 | `Specs.tsx:20` | `specs.labels.transmission` (`vehicle.json:27`) |
| Specs | label/valor | Combustible / Nafta | 1/1 | `Specs.tsx:21` | `specs.labels.fuel` (`vehicle.json:28`) |
| Specs | label/valor | Climatización / Aire acondicionado | 1/2 | `Specs.tsx:22` | `specs.labels.climate` (`vehicle.json:29`) |
| Specs | label/valor | Carrocería / SUV · 5 puertas | 1/3 | `Specs.tsx:23` | `specs.labels.body` (`vehicle.json:30`) + `fleet:enums.bodyType.suv-5d` |
| Included | eyebrow | Incluido en tu alquiler | 4 | `Included.tsx:30` | `included.eyebrow` (`vehicle.json:38`) |
| Included | H2 | Todo resuelto antes de subir al auto. | 7 | `Included.tsx:33-38` | `included.title` (`vehicle.json:39`) |
| Included | p | El precio por día ya contempla lo esencial para que solo te preocupes por el camino. | 16 | `Included.tsx:39-41` | `included.subtitle` (`vehicle.json:40`) |
| Included | p (requisitos) | Requisitos: licencia vigente, tarjeta de crédito a nombre del conductor y edad mínima de 21 años. | 16 | `Included.tsx:47-49` | `included.requirements` (`vehicle.json:41`) |
| Included | card ×6 | Seguro incluido / Cobertura todo riesgo con franquicia clara, sin sorpresas. | 2/9 | `Included.tsx:70-71` | `included.items[0]` (`vehicle.json:43`) |
| Included | card | Asistencia 24/7 / Una persona real al teléfono a cualquier hora del viaje. | 2/11 | idem | `included.items[1]` (`vehicle.json:44`) |
| Included | card | Kilometraje libre / Recorré Mendoza sin límite de kilómetros dentro de la provincia. | 2/10 | idem | `included.items[2]` (`vehicle.json:45`) |
| Included | card | Entrega flexible / Aeropuerto (MDZ), hoteles u oficina propia en Ciudad. | 2/9 | idem | `included.items[3]` (`vehicle.json:46`) |
| Included | card | Vehículo higienizado / Limpieza profunda y revisión mecánica antes de cada entrega. | 2/9 | idem | `included.items[4]` (`vehicle.json:47`) |
| Included | card | Atención trilingüe / Te acompañamos en español, inglés y portugués. | 2/8 | idem | `included.items[5]` (`vehicle.json:48`) |
| Similar | eyebrow | También podría interesarte | 4 | `Similar.tsx:38` | `similar.eyebrow` (`vehicle.json:52`) |
| Similar | H2 | Otros vehículos de la flota. | 4 | `Similar.tsx:40-42` | `similar.title` (`vehicle.json:53`) |
| Similar | enlace | Ver toda la flota | 4 | `Similar.tsx:44-46` | `similar.viewAll` (`vehicle.json:54`) |
| Similar | badge ×3 | SUV Compacta / SUV Coupé / SUV Coupé | 2 c/u | `Similar.tsx:65` | `fleet:enums.category.*` |
| Similar | H3 ×3 | Chery Tiggo 2 2026 / Citroën Basalt Shine 2026 (×2) | 4 c/u | `Similar.tsx:69-71` | literal (`vehicles.ts`) |
| Similar | label | Desde | 1 | `Similar.tsx:86` | `similar.from` (`vehicle.json:55`) |
| Similar | label | / día | 2 | `Similar.tsx:91` | `similar.perDay` (`vehicle.json:57`) |
| Similar | botón ×3 | Ver | 1 | `Similar.tsx:97-99` | `similar.view` (`vehicle.json:58`) |
| Similar | alt ×3 | Chery Tiggo 2 / Citroën Basalt Shine (×2) | 3 c/u | `Similar.tsx:61` | literal `{brand} {model}` |
| Footer | (idéntico a Home) | — | — | `Footer.tsx` | — |

---

## PARTE 3 — Enlaces internos

### Home

| Texto ancla | Destino (href) | Ubicación |
|---|---|---|
| (logo, sin texto — icono/imagen) ⚠️ sin texto accesible propio, pero `alt="Coneccar Rent"` cumple de nombre | `/` | Nav |
| Nosotros | `/#about` | Nav |
| Flota | `/#fleet` | Nav |
| Destinos | `/#destinations` | Nav |
| Opiniones | `/#reviews` | Nav |
| Contacto | `/#contact` | Nav |
| Reservar vehículo | `https://wa.me/5492615346953` (externo) | Nav |
| Reservar Ahora | `#fleet` | Hero |
| Hablar con un asesor | `https://wa.me/5492615346953` (externo) | Hero |
| "El más alquilado SUV Coupé Citroën Basalt Shine 2026 … Ver" (tarjeta completa) | `/flota/citroen-basalt-shine-2026-a` | Fleet |
| (igual, 7 tarjetas más) | `/flota/<slug>` | Fleet |
| Saber más ⚠️ texto genérico, idéntico en las 6 tarjetas de destino (solo el `href` cambia) | `https://wa.me/5492615346953?text=...` (externo, por destino) | Destinations |
| Escribinos por WhatsApp | `https://wa.me/5492615346953?text=...` (externo) | Contact |
| Línea alternativa | `https://wa.me/5492617596871?text=...` (externo) | Contact |
| contacto@coneccar-rent.com | `mailto:contacto@coneccar-rent.com` | Contact |
| +54 9 261 534-6953 | `tel:+5492615346953` | Contact |
| Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza | Google Maps (externo) | Contact |
| @coneccar.rent | `https://instagram.com/coneccar.rent` (externo) | Contact |
| (logo, Footer) ⚠️ sin texto, solo `alt="Coneccar Rent"` | `/` (implícito vía `<Link to="/">`? — en Footer el logo no está envuelto en `<Link>`, es solo imagen sin enlace) | Footer |
| Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza | Google Maps (externo) | Footer |
| +54 9 261 534-6953 | `tel:+5492615346953` | Footer |
| contacto@coneccar-rent.com | `mailto:contacto@coneccar-rent.com` | Footer |
| Nosotros / Destinos / Opiniones / Contacto | `/#about` / `/#destinations` / `/#reviews` / `/#contact` | Footer |
| SUV Coupé / SUV Compacta / Sedán / Hatchback Compacto | `/#fleet?cat=<id>` | Footer |
| Seguro / Política de cancelación / Manejar en Argentina / Preguntas frecuentes | `/ayuda#seguro` / `#cancelacion` / `#manejar-en-argentina` / `#preguntas-frecuentes` | Footer (destino fuera de alcance) |
| Términos / Privacidad | `/ayuda#terminos` / `/ayuda#privacidad` | Footer (destino fuera de alcance) |
| Hecho por Hernán Guevara | LinkedIn (externo) | Footer |

### Vehicle Detail

| Texto ancla | Destino (href) | Ubicación |
|---|---|---|
| (Nav: igual que Home) | — | Nav |
| Volver a la flota | `/#fleet` | Breadcrumb |
| Inicio | `/` | Breadcrumb |
| Flota | `/#fleet` | Breadcrumb |
| Reservar ahora | `tel:+5492617596871` ⚠️ texto dice "Reservar" pero el destino es una llamada telefónica, no un formulario de reserva | VehicleHero |
| Consultar | `https://wa.me/5492615346953?text=...` (externo) | VehicleHero |
| Ver toda la flota | `/#fleet` | Similar |
| "SUV Compacta Chery Tiggo 2 2026 5 3 Automática Desde $ 100.000 ARS / día Ver" (tarjeta completa) | `/flota/chery-tiggo-2-2026-a` | Similar |
| (igual, 2 tarjetas más) | `/flota/citroen-basalt-shine-2026-c`, `/flota/citroen-basalt-shine-2026-b` | Similar |
| (Footer: igual que Home) | — | Footer |

---

## PARTE 4 — Diagnóstico

### Home

- **H1 con texto concatenado sin espacio.** El H1 se compone de dos nodos de texto separados por un `<br/>` sin espacio entre ellos: `<h1>Conectados<br/><span>a tu destino.</span></h1>`. El contenido textual plano del H1 (como lo leería un crawler o lector de pantalla) es "Conectadosa tu destino." — `src/app/components/ConecCar/Hero.tsx:42-46`; claves `hero.titleLine1`/`titleLine2` en `src/i18n/locales/es/home.json:4-5`.
- **El H1 no contiene ninguna keyword transaccional ni geográfica.** "Conectados / a tu destino." no incluye "alquiler", "autos/vehículos" ni "Mendoza". La primera aparición de "Mendoza" en la página es en el badge (texto pequeño sobre el H1, `home.json:3`) y en el alt de la imagen de fondo (`Hero.tsx:27`); la primera aparición de "alquiler" es recién en un párrafo de la sección About (`home.json:16`, nivel párrafo, no encabezado). La combinación más directa de "Vehículos" + "Mendoza" en un encabezado aparece en el H2 de Fleet: "Vehículos para cada Mendoza posible." (`fleet.json:4`).
- **"aeropuerto" solo aparece en texto de nivel párrafo/badge**, nunca en un encabezado: `hero.deliveryText` ("Entrega en aeropuerto, hoteles y oficina propia.", `home.json:10`) y `about.benefits.airportDelivery` ("Entrega en aeropuerto", `home.json:28`).
- **Encabezados visualmente ocultos al pintado inicial (opacity:0).** El H3 "Todo lo que incluye tu alquiler." se renderiza en el HTML prerenderizado con `style="opacity:0;transform:translateY(24px)"` (animación de entrada de `framer-motion` aplicada directamente al tag `<m.h3>`) — `src/app/components/ConecCar/About.tsx:120-125`. El texto está presente en el DOM pero invisible hasta que el `IntersectionObserver` del cliente dispara la animación.
- **`noResults` no existe en el HTML prerenderizado.** "No hay vehículos que coincidan con esos filtros." (`fleet.json:20`) solo se renderiza si `list.length === 0`; con el estado inicial (`cat="all"`, `q=""`) la lista nunca está vacía, por lo que ese texto no está en `dist/index.html` — `src/app/components/ConecCar/Fleet.tsx:254-258`.
- **Los mensajes de validación y feedback del formulario de contacto no existen en el HTML prerenderizado.** "Este campo es obligatorio", "Ingresá un email válido" (`contact.json:50-51`), "¡Mensaje enviado!…" y "Hubo un problema al enviar…" (`contact.json:54-55`) solo se insertan en el DOM tras una interacción del usuario (submit) — `src/app/components/ConecCar/Contact.tsx:319-340`. Verificado: ausentes en `dist/index.html`.
- **Clave i18n huérfana.** `contact.json:10` (`whatsapp.secondaryHint`, "Si no contestamos en la principal") no es leída por ningún componente; `Contact.tsx` solo usa `primaryLabel`/`secondaryLabel` (líneas 148, 158).
- **Bloques enteros de `home.json` sin uso (contenido muerto, casi duplicado del real).** `home.json` líneas 33-48 (`destinations`), 49-62 (`reviews`), 63-67 (`payments`) y 68-87 (`contact`) no son leídos por ningún componente: `Destinations.tsx`/`Reviews.tsx`/`Contact.tsx` usan sus propios namespaces (`destinations.json`, `reviews.json`, `contact.json`) y `Payments.tsx` usa el namespace por defecto (`common.json`). El bloque `payments` de `home.json:63-67` es texto casi idéntico al de `common.json:28-31` (mismo contenido). El bloque `contact` de `home.json:68-70` tiene un título distinto ("Tu vehículo en Mendoza está a un mensaje de distancia") al que realmente se muestra en pantalla ("A un mensaje de la ruta abierta.", `contact.json:4`).
- **Texto de tarjeta idéntico entre fichas distintas.** El H3 y el `alt` de imagen de las tarjetas de Fleet son exactamente "Citroën Basalt Shine 2026" / "Citroën Basalt Shine" para las 3 variantes de color (`citroen-basalt-shine-2026-a/b/c`), y "Chery Tiggo 2 2026" / "Chery Tiggo 2" para las 2 variantes (`chery-tiggo-2-2026-a/b`) — `src/app/components/ConecCar/Fleet.tsx:48,66-68`. Solo el `shortDescription` (p. ej. "SUV Coupé — Azul Cosmo" vs "SUV Coupé — Sting Grey") distingue cada variante, y ese texto no está en el H3 ni en el alt.
- **Badge de reseñas idéntico en las 5 tarjetas.** "Opinión verificada" (`reviews.json:8`) se repite sin variación en las 5 reseñas — `src/app/components/ConecCar/Reviews.tsx:36-39`.
- **Enlaces con texto ancla genérico.** El botón "Saber más" (`destinations.json:10`) es idéntico en las 6 tarjetas de destino; solo el `href` (mensaje de WhatsApp) cambia — `src/app/components/ConecCar/Destinations.tsx:166-174`.
- **Logo sin texto ancla propio.** El logo del header (`Nav.tsx:35-40`) y el del footer (`Footer.tsx:48-61`, que además no está envuelto en un `<Link>`) dependen enteramente del `alt="Coneccar Rent"` de la imagen; no hay texto visible acompañante.
- **Párrafos cortos en secciones de contenido "institucional".** El texto de presentación de la empresa (About) está dividido en `about.paragraph1` (9 palabras, `home.json:15`) + `about.paragraph1Dorado` (10 palabras, `home.json:16`) y `about.paragraph2` (17 palabras, `home.json:17`): en total 3 `<p>` independientes de menos de 20 palabras cada uno para el único bloque de texto "sobre nosotros" de toda la home.
- **Inconsistencia de marca.** El `BRAND_NAME` usado en todo el contenido renderizado (title, OG, JSON-LD, footer, alt de logo) es "Coneccar Rent" (`src/data/contact.ts:6`), mientras que el eyebrow visible de la sección About usa la variante en mayúsculas "SOBRE CONECCAR RENT" (`home.json:13`, mismo texto base pero todo en mayúsculas). El dominio real (`SITE_URL`, canonical, email, Instagram) es `coneccar-rent.com` / `@coneccar.rent` (`contact.ts:34,37,81`), mientras que el nombre del proyecto, las carpetas de componentes (`src/app/components/ConecCar/`) y los comentarios de cabecera de casi todos los archivos fuente (p. ej. `App.tsx:1`, `Fleet.tsx:1`, `styles/index.css:2`) usan la grafía "ConecCar" / "ConecCar.rent" (con "C" intermedia mayúscula). Son tres grafías distintas del mismo nombre coexistiendo en el proyecto: "Coneccar Rent" (contenido visible), "CONECCAR" (variante en mayúsculas, visible en el eyebrow de About) y "ConecCar"/"ConecCar.rent" (identidad del proyecto en código/documentación, no visible en pantalla).
- **NAP:** la dirección, teléfono, email y horario mostrados en Contact y Footer coinciden entre sí y con `src/data/contact.ts` (`ADDRESS`, `PHONE_DISPLAY`, `EMAIL`, `OFFICE_HOURS`) sin discrepancias detectadas.
- **`<title>` y meta description de Home usan el fallback global, no un copy específico.** `SLOTS.home.title`, `SLOTS.home.description` y `SLOTS.home.h1` valen `[KW-PENDIENTE]` en `src/seo/slots.ts:13-17`; por eso el `<title>` (67 caracteres) y la meta description (154 caracteres) que efectivamente se publican son `DEFAULT_TITLE`/`DEFAULT_DESCRIPTION` de `src/seo/site.ts:6-8`, pensados como texto genérico de `index.html`, no como copy optimizado para la home.

### Vehicle Detail (ejemplo `citroen-basalt-shine-2026-a`)

- **El H1 no incluye el año del vehículo.** El H1 solo renderiza `{brand} {model}` → "Citroën Basalt Shine" (`src/app/sections/vehicle-detail/VehicleHero.tsx:100-102`). El año (2026) aparece inmediatamente debajo como `<span>` de texto normal (línea 104), y también en el `<title>`, en la meta description, en el JSON-LD (`Car.name`, `BreadcrumbList`) y en el Breadcrumb visible — pero no dentro de ningún encabezado.
- **El H1 no contiene ninguna keyword transaccional ni geográfica.** "Citroën Basalt Shine" no incluye "alquiler", "Mendoza" ni "aeropuerto". La palabra "Mendoza" no aparece en ningún encabezado de la página (ni H1 ni H2); solo aparece en texto de párrafo/card: `included.items[2].s` ("Recorré Mendoza sin límite de kilómetros…", `vehicle.json:45`) e `included.items[3].s` ("Aeropuerto (MDZ), hoteles u oficina propia en Ciudad.", `vehicle.json:46`, que usa el código "MDZ" en vez de la palabra "aeropuerto" completa en ese caso — "aeropuerto" sí aparece como palabra en el mismo item, al inicio).
- **Único párrafo de cuerpo de toda la página tiene 28 palabras.** La descripción larga del vehículo (`vehicle:vehicleDescriptions.citroen-basalt-shine-2026-a.long`, `vehicle.json:75`, renderizada en `VehicleHero.tsx:114-116`) es el único bloque de texto descriptivo/narrativo de la ficha (el resto son labels, specs y CTAs); tiene 28 palabras.
- **Encabezado visualmente oculto al pintado inicial (opacity:0).** El H2 "Todo resuelto antes de subir al auto." se renderiza con `style="opacity:0;transform:translateY(24px)"` por estar envuelto directamente en `<m.h2 variants={slideUpItem}>` — `src/app/sections/vehicle-detail/Included.tsx:33-38`.
- **Descripción del vehículo (larga y corta) idéntica entre fichas que son variantes de color.** `vehicle:vehicleDescriptions.citroen-basalt-shine-2026-a.long`, `-b.long` y `-c.long` tienen exactamente el mismo texto ("Diseño innovador, gran espacio interior…") — `vehicle.json:75,79,83`. Solo el campo `.short` distingue el color ("Azul Cosmo" / "Blanco Nacarado" / "Sting Grey"). Mismo patrón para las 2 variantes de `chery-tiggo-2-2026-*` (`vehicle.json:87,91`).
- **H3 idéntico entre fichas en la sección Similar.** De las 3 tarjetas "también podría interesarte" de esta ficha, 2 corresponden a variantes de Citroën Basalt Shine con el mismo H3 "Citroën Basalt Shine 2026" (`Similar.tsx:69-71`, fichas `-b` y `-c`), igual que ocurre en Fleet (Home).
- **Alt de imagen sin año ni diferenciador de color.** El `alt` de la imagen principal y de las miniaturas usa `{brand} {model}` sin año (`VehicleHero.tsx:163,188`); sería idéntico al de las otras 2 variantes de color de este mismo modelo si se mostraran en una tabla comparativa.
- **Inconsistencia entre cantidad de imágenes y `imageLabels`.** Para esta ficha, `images` tiene 3 entradas (`citroen-azul-lateral/detras/interior`) pero `imageLabels` tiene 4 (incluye "citroën basalt · tablero", que no corresponde a ninguna imagen cargada) — `src/data/vehicles.ts:61-67`. El contador visible en la galería ("1 / 3", `VehicleHero.tsx:167`) usa el conteo real de `images` (3), no el de `imageLabels` (4).
- **Enlace "Reservar ahora" apunta a una llamada telefónica, no a un formulario de reserva.** El CTA principal del hero usa el texto `vehicle:hero.book` = "Reservar ahora" (`vehicle.json:12`) pero su `href` es `tel:+5492617596871` (número secundario) — `VehicleHero.tsx:139-145`.
- **Inconsistencia de marca:** mismas grafías señaladas en Home ("Coneccar Rent" en title/OG/JSON-LD/footer vs. "ConecCar"/"ConecCar.rent" en el código fuente de los componentes de esta página, p. ej. comentarios en `Breadcrumb.tsx:4`, `Specs.tsx:3`, `VehicleHero.tsx:4-6`, que importan desde `@/app/components/ConecCar/...`).
- **NAP:** el footer de Vehicle Detail reutiliza el mismo componente `Footer.tsx` que Home; mismos datos de `contact.ts`, sin discrepancias.
- **`<title>` y meta description usan el fallback compuesto, no un copy específico por ficha.** `SLOTS.vehicles['citroen-basalt-shine-2026-a']` vale `{title: PENDING, description: PENDING, h1: null}` en `src/seo/slots.ts:19`; por eso el `<title>` (41 caracteres: "Citroën Basalt Shine 2026 · Coneccar Rent") y la meta description (101 caracteres) se generan con la fórmula fija `${name} · ${BRAND_NAME}` / `${name} · ${shortDescription}. Tarifa diaria ${precio}. Alquiler en Mendoza.` (`src/seo/head.ts:75-77`) — la única mención de "Alquiler" y "Mendoza" en los metadatos de esta ficha viene de esa fórmula genérica, no de un copy redactado para este vehículo en particular.
- Este mismo patrón de fallback (`SLOTS.vehicles[slug]` = `PENDING`) se repite para las otras 7 fichas (`src/seo/slots.ts:19-26`): ninguna de las 8 fichas tiene título/descripción/h1 propios todavía.
