import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { I } from '@/app/components/ConecCar/Icons';
import { fadeIn } from '@/animations/variants';
import type { Vehicle } from '@/data/vehicles';

interface Props {
  vehicle: Vehicle;
}

const Breadcrumb = ({ vehicle }: Props) => {
  const { t } = useTranslation('vehicle');

  return (
    <motion.div
      className="bg-white border-b border-navy-100"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-14 flex items-center justify-between gap-4">
        <a href="/#fleet" className="inline-flex items-center gap-2 text-navy-700 hover:text-navy-900 text-sm transition">
          <span className="w-4 h-4">{I.arrowLeft}</span>
          {t('breadcrumb.back')}
        </a>
        <nav className="hidden sm:flex items-center gap-2 text-sm text-navy-500" aria-label="Migas de pan">
          <a href="/" className="hover:text-navy-900 transition">{t('breadcrumb.home')}</a>
          <span className="w-3.5 h-3.5 text-navy-300">{I.chevronR}</span>
          <a href="/#fleet" className="hover:text-navy-900 transition">{t('breadcrumb.fleet')}</a>
          <span className="w-3.5 h-3.5 text-navy-300">{I.chevronR}</span>
          <span className="text-navy-900 font-medium">
            {vehicle.brand} {vehicle.model} {vehicle.year}
          </span>
        </nav>
      </div>
    </motion.div>
  );
};

export default Breadcrumb;
