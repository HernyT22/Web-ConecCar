import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import { staggerContainer, slideUpItem, VIEWPORT_CONFIG } from '@/animations/variants';
import type { Vehicle } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle;
}

const Specs = ({ vehicle }: Props) => {
  const { t } = useTranslation(['vehicle', 'fleet']);
  const tDyn = t as (key: string) => string;

  const specs = [
    { icon: I.sparkle, label: t('vehicle:specs.labels.category'),     value: tDyn(`fleet:enums.category.${vehicle.category}`) },
    { icon: I.calendar, label: t('vehicle:specs.labels.year'),        value: String(vehicle.year) },
    { icon: I.users,   label: t('vehicle:specs.labels.seats'),        value: t('vehicle:specs.passenger', { count: vehicle.seats }) },
    { icon: I.bag,     label: t('vehicle:specs.labels.bags'),         value: t('vehicle:specs.suitcase',  { count: vehicle.bags })  },
    { icon: I.gear,    label: t('vehicle:specs.labels.transmission'), value: tDyn(`fleet:enums.transmission.${vehicle.transmission}`) },
    { icon: I.fuel,    label: t('vehicle:specs.labels.fuel'),         value: tDyn(`fleet:enums.fuel.${vehicle.fuel}`) },
    { icon: I.snow,    label: t('vehicle:specs.labels.climate'),      value: tDyn(`fleet:enums.climate.${vehicle.climate}`) },
    { icon: I.door,    label: t('vehicle:specs.labels.body'),         value: tDyn(`fleet:enums.bodyType.${vehicle.bodyType}`) },
  ];

  return (
    <motion.section
      className="py-20 md:py-24 bg-navy-50/40 border-b border-navy-100"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_CONFIG}
      variants={staggerContainer}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div className="max-w-3xl mb-12" variants={slideUpItem}>
          <div className="flex items-center gap-2 text-amber-600 mb-3">
            <span className="h-px w-8 bg-amber-500" />
            <span className="mono uppercase tracking-widest">{t('vehicle:specs.eyebrow')}</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-[1.1]">
            {t('vehicle:specs.title')}
          </h2>
          <span className="block h-[3px] w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-5" />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          variants={staggerContainer}
        >
          {specs.map((s, i) => (
            <motion.div
              key={i}
              variants={slideUpItem}
              className="rounded-2xl border border-navy-100 bg-white p-5 lift hover:border-amber-500/50 hover:shadow-[0_8px_30px_-12px_rgba(201,161,74,0.35)] transition"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/60 mb-4">
                {s.icon}
              </div>
              <div className="mono uppercase text-navy-500">{s.label}</div>
              <div className="text-navy-900 font-medium mt-1 leading-snug">{s.value}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Specs;
