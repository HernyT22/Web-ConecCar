import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={staggerContainer}
          >
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <motion.span
                variants={drawLine}
                className="h-px w-8 bg-amber-500 origin-left"
              />
              <motion.span variants={slideUpItem} className="mono uppercase tracking-widest">
                {t('included.eyebrow')}
              </motion.span>
            </div>
            <motion.h2
              variants={slideUpItem}
              className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-[1.1]"
            >
              {t('included.title')}
            </motion.h2>
            <motion.p variants={slideUpItem} className="text-navy-700/70 text-lg mt-5 max-w-md">
              {t('included.subtitle')}
            </motion.p>
            <motion.div
              variants={slideUpItem}
              className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 max-w-md"
            >
              <span className="w-5 h-5 text-amber-600 mt-0.5 shrink-0">{I.info}</span>
              <p className="text-sm text-navy-700/80">
                {t('included.requirements')}
              </p>
            </motion.div>
          </motion.div>

          {/* Columna derecha: 6 cards */}
          <motion.div
            className="grid sm:grid-cols-2 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_CONFIG}
            variants={staggerContainer}
          >
            {items.map((c, i) => (
              <motion.div
                key={i}
                variants={slideUpItem}
                className="group rounded-2xl border border-navy-100 bg-white p-5 lift hover:border-amber-500/50 hover:shadow-[0_8px_30px_-12px_rgba(201,161,74,0.35)] transition"
              >
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/60 mb-4 group-hover:scale-[1.04] transition-transform">
                  {icons[i]}
                </div>
                <div className="font-medium text-navy-900">{c.t}</div>
                <div className="text-sm text-navy-700/70 mt-1">{c.s}</div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Included;
