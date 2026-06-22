import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import PlaceholderImg from '@/app/components/ConecCar/PlaceholderImg';
import { WHATSAPP_URL } from '@/data/contact';
import type { Vehicle } from '@/data/vehicles';
import heroCordillera from '@/imports/hero-cordillera-mendoza.webp';
import whatsappIcon from '@/imports/whatsapp.png';
import { fadeIn } from '@/animations/variants';

interface Props {
  vehicle: Vehicle;
}

const VehicleHero = ({ vehicle }: Props) => {
  const [active, setActive] = useState(0);
  const { t } = useTranslation(['vehicle', 'fleet']);

  const { slug, brand, model, year, badge, category,
          seats, bags, transmission, fuel, climate, pricePerDay, currency,
          images, imageLabels } = vehicle;

  const tDyn = t as (key: string) => string;

  const shortDesc = tDyn(`vehicle:vehicleDescriptions.${slug}.short`);
  const longDesc  = tDyn(`vehicle:vehicleDescriptions.${slug}.long`);

  const quick = [
    { icon: I.users, label: t('vehicle:specs.passenger', { count: seats }) },
    { icon: I.bag,   label: t('vehicle:specs.suitcase',  { count: bags })  },
    { icon: I.gear,  label: tDyn(`fleet:enums.transmission.${transmission}`) },
    { icon: I.fuel,  label: tDyn(`fleet:enums.fuel.${fuel}`) },
    { icon: I.snow,  label: tDyn(`fleet:enums.climate.${climate}`) },
  ];

  const mainImage = images[active];
  const priceDisplay = pricePerDay > 0
    ? `${currency === 'USD' ? 'US$' : currency} ${pricePerDay}`
    : t('vehicle:hero.consult');

  return (
    <section className="relative overflow-hidden text-white">
      {/* Imagen de fondo — cordillera al atardecer */}
      <div className="absolute inset-0">
        <img
          src={heroCordillera}
          alt=""
          aria-hidden="true"
          loading="eager"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Overlay navy al 85 % — subir a /90 si se nota demasiado, bajar a /80 si se nota poco */}
      <div className="absolute inset-0 bg-navy-950/85" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 py-12 md:py-16 grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-center">

        {/* columna texto */}
        <motion.div
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
            {brand} <span className="text-amber-500">{model}</span>
          </h1>
          <div className="flex items-center gap-3 mt-3 text-white/70">
            <span className="text-lg">{year}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-lg">{shortDesc}</span>
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
            <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-medium px-6 py-3.5 rounded-full transition"
              >
                {t('vehicle:hero.book')} {I.arrow}
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-medium px-6 py-3.5 rounded-full transition backdrop-blur"
              >
                <img src={whatsappIcon} alt="" aria-hidden="true" className="w-5 h-5" />{t('vehicle:hero.consult')}
              </a>
            </div>
          </div>
        </motion.div>

        {/* columna galería */}
        <div className="order-1 lg:order-2">
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]">
            {mainImage
              ? <img src={mainImage} alt={`${brand} ${model}`} className="aspect-[4/3] w-full object-contain" />
              : <PlaceholderImg label={imageLabels[active] ?? imageLabels[0]} tone="dark" className="aspect-[4/3] w-full" />
            }
            <span className="absolute top-4 left-4 bg-navy-950/70 text-white mono uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur">
              {active + 1} / {images.length}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3 mt-3">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative rounded-xl overflow-hidden border transition ${
                  active === i
                    ? 'border-amber-500 ring-2 ring-amber-500/40'
                    : 'border-white/10 hover:border-white/30'
                }`}
              >
                <img
                  src={src}
                  alt={imageLabels[i] ?? `${brand} ${model}`}
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
