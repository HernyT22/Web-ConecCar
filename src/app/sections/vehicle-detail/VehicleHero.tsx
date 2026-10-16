import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import PlaceholderImg from '@/app/components/ConecCar/PlaceholderImg';
import { buildWhatsAppUrl } from '@/app/components/ConecCar/whatsapp';
import { PHONE_TEL_LINKS } from '@/data/contact';
import { trackLead } from '@/lib/analytics';
import { formatPrice } from '@/data/vehicles';
import type { Vehicle } from '@/data/vehicles';
import heroBgLite from '@/imports/hero-bg-lite.webp';
import { VEHICLE_MAIN_SIZES } from '@/seo/lcp';
import { vehicleAltBase, vehicleTypeLabel } from '@/seo/altText';
import whatsappIcon from '@/imports/whatsapp.png';
import { fadeIn } from '@/animations/variants';

// React 18.3 no soporta fetchPriority (camelCase): se usa el atributo HTML en minúscula.
const PRIORITY_HIGH = { fetchpriority: 'high' } as Record<string, string>;
// Fondo decorativo solo desde lg (1024 px). Bajo ese ancho ningún <source> coincide y el
// navegador usa este GIF transparente de 1x1: no se descarga hero-bg-lite (ni en el HTML prerenderizado).
const BG_PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// sizes de la foto principal: compartido con el preload del head (src/seo/lcp.ts).
const MAIN_IMG_SIZES = VEHICLE_MAIN_SIZES;
const THUMB_IMG_SIZES = '(min-width: 1280px) 132px, (min-width: 1024px) 10vw, 22vw';

interface Props {
  vehicle: Vehicle;
}

const VehicleHero = ({ vehicle }: Props) => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation(['vehicle', 'fleet']);

  const { slug, brand, model, year, badge, category, color,
          seats, bags, transmission, fuel, climate, pricePerDay, currency,
          images, imageLabels } = vehicle;

  const tDyn = t as (key: string, options?: Record<string, unknown>) => string;

  const transmissionLabel = tDyn(`fleet:enums.transmission.${transmission}`).toLowerCase();
  const fuelLabel = tDyn(`fleet:enums.fuel.${fuel}`).toLowerCase();
  const climateLabel = tDyn(`fleet:enums.climate.${climate}`).toLowerCase();
  const colorLower = color?.toLowerCase();

  const descriptionVars = {
    color: colorLower,
    passengers: seats,
    bags,
    transmission: transmissionLabel,
    fuel: fuelLabel,
    climate: climateLabel,
  };

  const shortDesc = tDyn(`vehicle:vehicleDescriptions.${slug}.short`, descriptionVars);
  const longDesc  = tDyn(`vehicle:vehicleDescriptions.${slug}.long`, descriptionVars);

  const quick = [
    { icon: I.users, label: t('vehicle:specs.passenger', { count: seats }) },
    { icon: I.bag,   label: t('vehicle:specs.suitcase',  { count: bags })  },
    { icon: I.gear,  label: tDyn(`fleet:enums.transmission.${transmission}`) },
    { icon: I.fuel,  label: tDyn(`fleet:enums.fuel.${fuel}`) },
    { icon: I.snow,  label: tDyn(`fleet:enums.climate.${climate}`) },
  ];

  const vehicleName = `${brand} ${model} ${year}`;
  const consultUrl = buildWhatsAppUrl(t('vehicle:whatsapp.consult', { vehicleName }));

  const mainImage = images[active];
  const priceDisplay = pricePerDay > 0
    ? formatPrice(pricePerDay, currency)
    : t('vehicle:hero.consult');

  // Alt de imágenes (SEO T4): "{marca} {modelo} {año} {color}, {tipo/vista} de alquiler en Mendoza".
  const altBase = vehicleAltBase(vehicle);
  const mainImageAlt = `${altBase}, ${vehicleTypeLabel(category)} de alquiler en Mendoza`;
  const thumbAlt = (i: number) => {
    const vista = imageLabels[i];
    return vista ? `${altBase}, ${vista}` : `${altBase}, foto ${i + 1}`;
  };

  return (
    <section className="relative overflow-hidden text-white">
      {/* Imagen de fondo — cordillera al atardecer */}
      <div className="absolute inset-0 bg-navy-950">
        <picture className="block w-full h-full">
          <source media="(min-width: 1024px)" srcSet={heroBgLite} />
          <img
            src={BG_PLACEHOLDER}
            alt=""
            aria-hidden="true"
            width={1024}
            height={682}
            loading="eager"
            className="w-full h-full object-cover"
          />
        </picture>
      </div>
      {/* Overlay navy al 85 % — subir a /90 si se nota demasiado, bajar a /80 si se nota poco */}
      <div className="absolute inset-0 bg-navy-950/85" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">

        {/* columna texto */}
        <m.div
          className="order-2 lg:order-1"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div className="flex items-center gap-2.5">
            {badge && (
              <span className="inline-flex items-center gap-1.5 bg-amber-500 text-navy-950 text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
                <span className="w-3.5 h-3.5">{I.sparkle}</span>
                {tDyn(`fleet:enums.badge.${badge}`)}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/80 text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full">
              {tDyn(`fleet:enums.category.${category}`)}
            </span>
          </div>

          <h1 className="font-display text-[40px] sm:text-6xl md:text-7xl font-semibold leading-[1.02] mt-5">
            <span className="block text-lg sm:text-xl font-medium text-white/70 mb-1">{t('vehicle:hero.titlePrefix')}</span>{' '}
            {brand} <span className="text-amber-500">{model}</span>{' '}
            <span className="block text-lg sm:text-xl font-medium text-white/70 mt-1">{year} {t('vehicle:hero.titleSuffix')}</span>
          </h1>
          <div className="flex items-center gap-3 mt-3 text-white/70">
            <span className="text-lg">{shortDesc}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden sm:flex items-center gap-1.5 ml-1">
              <span className="flex text-amber-500">
                {[0,1,2,3,4].map((s) => <span key={s} className="w-4 h-4">{I.star}</span>)}
              </span>
            </span>
          </div>

          {longDesc && (
            <p className="text-white/75 text-lg mt-6 max-w-xl">{longDesc}</p>
          )}

          {/* specs rápidas */}
          <div className="mt-7 flex flex-wrap gap-2.5">
            {quick.map((q, i) => (
              <span key={i} className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 px-3.5 py-2 rounded-full text-sm text-white/90 backdrop-blur">
                <span className="w-4 h-4 text-amber-400">{q.icon}</span>{q.label}
              </span>
            ))}
          </div>

          {/* precio + CTA */}
          <div className="mt-9 flex flex-col sm:flex-row sm:items-end gap-5">
            <div>
              <div className="mono uppercase text-white/50 tracking-widest mb-1">{t('vehicle:hero.dailyRate')}</div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl md:text-5xl font-semibold text-amber-500">
                  {priceDisplay}
                </span>
                {pricePerDay > 0 && <span className="text-white/60">{t('vehicle:hero.perDay')}</span>}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:ml-auto">
              <a
                href={PHONE_TEL_LINKS.secondary}
                onClick={() => trackLead('phone_call', { vehicle: vehicle.slug })}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-amber-500 hover:bg-amber-600 text-navy-950 font-medium px-5 sm:px-6 py-3.5 rounded-full transition"
              >
                {t('vehicle:hero.book')} {I.arrow}
              </a>
              <a
                href={consultUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLead('whatsapp', { vehicle: vehicle.slug })}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-5 sm:px-6 py-3.5 rounded-full transition backdrop-blur"
              >
                <img src={whatsappIcon} alt="" aria-hidden="true" className="w-5 h-5" />{t('vehicle:hero.consult')}
              </a>
            </div>
          </div>
        </m.div>

        {/* columna galería */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            {mainImage
              ? <img src={mainImage.src} srcSet={mainImage.srcSet} sizes={MAIN_IMG_SIZES} alt={mainImageAlt} width={mainImage.width} height={mainImage.height} loading="eager" {...PRIORITY_HIGH} className="aspect-[4/3] w-full object-contain" />
              : <PlaceholderImg label={imageLabels[active] ?? imageLabels[0]} tone="dark" className="aspect-[4/3] w-full" />
            }
            <span className="absolute top-4 left-4 bg-navy-950/70 text-white mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur">
              {active + 1} / {images.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={t('vehicle:hero.viewImage', { n: i + 1, total: images.length })}
                className={`relative rounded-xl overflow-hidden border transition ${
                  active === i
                    ? 'border-amber-500 ring-2 ring-amber-500/40'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={img.thumbSrc}
                  srcSet={img.thumbSrcSet}
                  sizes={THUMB_IMG_SIZES}
                  width={img.width}
                  height={img.height}
                  alt={thumbAlt(i)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VehicleHero;
