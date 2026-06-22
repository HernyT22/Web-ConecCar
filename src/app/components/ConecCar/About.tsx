import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";
import {
  staggerContainer,
  slideUpItem,
  drawLine,
  VIEWPORT_CONFIG,
} from '@/animations/variants';

const CHIP_IDS = ['localFounded', 'familyOwned', 'bCorp', 'carbonOffset'] as const;
const FEATURE_IDS = ['totallyInsured', 'bilingual', 'support', 'concierge'] as const;
const BENEFIT_IDS = ['noHiddenCosts', 'airportDelivery', 'unlimitedMileage', 'onlineBooking'] as const;

const FEATURE_ICONS = {
  totallyInsured: I.shield,
  bilingual: I.globe,
  support: I.clock,
  concierge: I.users,
} as const;

const BENEFIT_ICONS = {
  noHiddenCosts: I.shield,
  airportDelivery: I.pin,
  unlimitedMileage: I.car,
  onlineBooking: I.clock,
} as const;

const About = () => {
  const { t } = useTranslation('home');

  return (
    <Section
      id="about"
      eyebrow={t('about.eyebrow')}
      title={t('about.title')}
      className="bg-white"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Columna izquierda: texto + chips */}
        <motion.div
          className="space-y-5 text-navy-700/85 text-[17px] leading-relaxed"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={staggerContainer}
        >
          <motion.p variants={slideUpItem}>{t('about.paragraph1')}</motion.p>
          <motion.p variants={slideUpItem}>{t('about.paragraph2')}</motion.p>
          <motion.div className="pt-2 flex flex-wrap gap-2" variants={slideUpItem}>
            {CHIP_IDS.map((id) => (
              <span
                key={id}
                className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-navy-800 px-3 py-1.5 rounded-full border border-amber-500/30"
              >
                <span className="w-3.5 h-3.5 text-amber-600">
                  {I.check}
                </span>
                {t(`about.chips.${id}`)}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna derecha: 4 feature cards */}
        <motion.div
          className="grid sm:grid-cols-2 gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_CONFIG}
          variants={staggerContainer}
        >
          {FEATURE_IDS.map((id) => (
            <motion.div
              key={id}
              variants={slideUpItem}
              className="group rounded-2xl border border-navy-100 bg-white hover:border-amber-500/50 hover:shadow-[0_8px_30px_-12px_rgba(201,161,74,0.35)] p-5 lift transition"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/60 mb-4 group-hover:scale-[1.04] group-hover:bg-amber-500/15 transition-transform">
                {FEATURE_ICONS[id]}
              </div>
              <div className="font-medium text-navy-900">
                {t(`features.${id}.title`)}
              </div>
              <div className="text-sm text-navy-700/70 mt-1">
                {t(`features.${id}.description`)}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Benefits — franja de beneficios incluidos */}
      <motion.div
        className="mt-12 md:mt-16"
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
            {t('about.benefitsEyebrow')}
          </motion.span>
        </div>
        <motion.h3
          variants={slideUpItem}
          className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mb-6"
        >
          {t('about.benefitsTitle')}
        </motion.h3>

        <motion.div
          variants={staggerContainer}
          className="rounded-2xl overflow-hidden border border-amber-500/40 bg-amber-500/40"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {BENEFIT_IDS.map((id) => (
              <motion.div
                key={id}
                variants={slideUpItem}
                className="group flex items-center gap-3 bg-white px-4 py-5 hover:bg-amber-500/5 transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/55 group-hover:bg-amber-500/15 group-hover:scale-[1.04] transition-transform">
                  <span className="w-5 h-5">{BENEFIT_ICONS[id]}</span>
                </span>
                <span className="text-[15px] font-medium text-navy-900 leading-tight">
                  {t(`about.benefits.${id}`)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default About;
