// ConecCar.rent — Opiniones
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";
import { staggerContainer, slideUpItem, VIEWPORT_CONFIG } from '@/animations/variants';

const REVIEW_IDS = ['review1', 'review2', 'review3', 'review4', 'review5'] as const;

const Reviews = () => {
  const { t } = useTranslation('reviews');

  return (
    <Section
      id="reviews"
      eyebrow={t('section.eyebrow')}
      title={t('section.title')}
      kicker={t('section.kicker')}
      className="bg-white"
    >
      <motion.div
        className="grid md:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerContainer}
      >
        {REVIEW_IDS.map((id) => (
          <motion.article
            key={id}
            variants={slideUpItem}
            className="relative rounded-2xl border border-navy-100 bg-white p-6 md:p-7 lift flex flex-col hover:border-amber-500/50 hover:shadow-[0_10px_30px_-12px_rgba(201,161,74,0.35)] transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4 relative">
              <span className="inline-flex items-center gap-1.5 mono uppercase tracking-widest text-amber-600 text-[10px]">
                <span className="w-3.5 h-3.5">{I.check}</span>
                {t('badges.verified')}
              </span>
            </div>
            <div className="flex text-amber-500 mb-3">
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} className="w-4 h-4">
                  {I.star}
                </span>
              ))}
            </div>
            <p className="text-navy-800 text-[17px] leading-relaxed flex-1">
              {t(`items.${id}.text`)}
            </p>
            <div className="mt-6 pt-5 border-t border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 font-semibold grid place-items-center border-2 border-amber-500/50 text-sm">
                {t(`items.${id}.name`)
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="leading-tight">
                <div className="text-navy-900 font-medium">
                  {t(`items.${id}.name`)}
                </div>
                <div className="text-sm text-navy-700/70">
                  {t(`items.${id}.role`)}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </Section>
  );
};

export default Reviews;
