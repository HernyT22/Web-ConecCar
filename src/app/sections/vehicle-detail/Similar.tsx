import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import PlaceholderImg from '@/app/components/ConecCar/PlaceholderImg';
import { getSimilarVehicles, formatPrice } from '@/data/vehicles';
import { staggerContainer, slideUpItem, slideFromLeftItem, VIEWPORT_CONFIG } from '@/animations/variants';

interface Props {
  slug: string;
}

const Similar = ({ slug }: Props) => {
  const { t } = useTranslation(['vehicle', 'fleet']);
  const tDyn = t as (key: string) => string;
  const cars = getSimilarVehicles(slug, 3);

  return (
    <motion.section
      className="py-20 md:py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          className="flex items-end justify-between gap-4 mb-10"
          variants={slideUpItem}
        >
          <div>
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <span className="h-px w-8 bg-amber-500" />
              <span className="mono uppercase tracking-widest">{t('vehicle:similar.eyebrow')}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-navy-900 leading-[1.1]">
              {t('vehicle:similar.title')}
            </h2>
          </div>
          <a href="/#fleet" className="hidden sm:inline-flex items-center gap-2 text-navy-700 hover:text-navy-900 text-sm transition">
            {t('vehicle:similar.viewAll')} {I.arrow}
          </a>
        </motion.div>

        <motion.ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 list-none"
          variants={staggerContainer}
        >
          {cars.map((c) => (
            <motion.li key={c.slug} variants={slideFromLeftItem}>
              <Link
                to={`/flota/${c.slug}`}
                className="bg-white rounded-2xl border border-navy-100 overflow-hidden flex flex-col lift"
              >
                <div className="relative aspect-[4/3] bg-navy-50">
                  {c.images[0]
                    ? <img src={c.images[0]} alt={`${c.brand} ${c.model}`} className="w-full h-full object-contain" loading="lazy" decoding="async" />
                    : <PlaceholderImg label={c.imageLabels[0]} className="w-full h-full" />
                  }
                  <span className="absolute top-3 right-3 bg-white/95 text-navy-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-navy-100">
                    {tDyn(`fleet:enums.category.${c.category}`)}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-display text-xl font-semibold text-navy-900">
                    {c.brand} {c.model} {c.year}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-sm text-navy-700/80 mt-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-navy-400 w-4 h-4">{I.users}</span>{c.seats}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-navy-400 w-4 h-4">{I.bag}</span>{c.bags}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span className="text-navy-400 w-4 h-4">{I.gear}</span>
                      {tDyn(`fleet:enums.transmission.${c.transmission}`)}
                    </span>
                  </div>
                  <div className="mt-5 pt-5 border-t border-navy-100 flex items-end justify-between gap-3">
                    <div>
                      <div className="mono uppercase text-navy-500">{t('vehicle:similar.from')}</div>
                      <div className="flex items-baseline gap-1">
                        {c.pricePerDay > 0
                          ? <>
                              <span className="font-display text-2xl font-semibold text-navy-900">{formatPrice(c.pricePerDay, c.currency)}</span>
                              <span className="text-sm text-navy-500">{t('vehicle:similar.perDay')}</span>
                            </>
                          : <span className="font-display text-xl font-semibold text-navy-900">{t('vehicle:similar.inquire')}</span>
                        }
                      </div>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 bg-navy-900 hover:bg-amber-500 hover:text-navy-950 text-white text-sm px-4 py-2.5 rounded-full transition-colors duration-300">
                      {t('vehicle:similar.view')} {I.arrow}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </motion.section>
  );
};

export default Similar;
