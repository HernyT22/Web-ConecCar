import { useTranslation } from 'react-i18next';
import { m } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import { staggerContainer, slideUpItem, drawLine, VIEWPORT_CONFIG } from '@/animations/variants';

const icons = [I.shield, I.clock, I.road, I.pin, I.check, I.globe];

const Included = () => {
  const { t } = useTranslation('vehicle');
  const items = t('included.items', { returnObjects: true }) as Array<{ t: string; s: string }>;

  return (
    <section className="py-20 md:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">

          {/* Columna izquierda: eyebrow + título + subtitle + requirements */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <m.span
                variants={drawLine}
                className="h-px w-8 bg-amber-500 origin-left"
              />
              <m.span variants={slideUpItem} className="mono uppercase tracking-widest">
                {t('included.eyebrow')}
              </m.span>
            </div>
            <m.h2
              variants={slideUpItem}
              className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-[1.1]"
            >
              {t('included.title')}
            </m.h2>
            <m.p variants={slideUpItem} className="text-navy-700/70 text-lg mt-5 max-w-md">
              {t('included.subtitle')}
            </m.p>
            <m.div
              variants={slideUpItem}
              className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 max-w-md"
            >
              <span className="w-5 h-5 text-amber-600 mt-0.5 shrink-0">{I.info}</span>
              <p className="text-sm text-navy-700/80">
                {t('included.requirements')}
              </p>
            </m.div>
          </m.div>

          {/* Columna derecha: 6 cards */}
          <m.div
            className="grid sm:grid-cols-2 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={staggerContainer}
          >
            {items.map((c, i) => (
              <m.div
                key={i}
                variants={slideUpItem}
                className="group rounded-2xl border border-navy-100 bg-white p-5 lift hover:border-amber-500/50 hover:shadow-[0_8px_30px_-12px_rgba(201,161,74,0.35)] transition"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/60 mb-4 group-hover:scale-[1.04] transition-transform">
                  {icons[i]}
                </div>
                <h3 className="font-medium text-navy-900 text-base">{c.t}</h3>
                <div className="text-sm text-navy-700/70 mt-1">{c.s}</div>
              </m.div>
            ))}
          </m.div>

        </div>
      </div>
    </section>
  );
};

export default Included;
