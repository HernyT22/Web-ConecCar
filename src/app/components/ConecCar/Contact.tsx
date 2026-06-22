// ConecCar.rent — Contacto
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";
import {
  EMAIL,
  EMAIL_MAILTO,
  ADDRESS,
  ADDRESS_MAPS_URL,
  SOCIAL,
} from '@/data/contact';
import { buildWhatsAppUrl } from './whatsapp';
import whatsappIcon from '@/imports/whatsapp.png';
import { slideFromLeftItem, slideFromRightItem, VIEWPORT_CONFIG } from '@/animations/variants';

const FORM_FIELDS = [
  ['name',        'contact-name'],
  ['email',       'contact-email'],
  ['phone',       'contact-phone'],
  ['pickupDate',  'contact-pickup-date'],
] as const;

const Contact = () => {
  const { t } = useTranslation('contact');

  return (
    <Section id="contact" className="bg-navy-900 text-white">
      <motion.div
        className="grid md:grid-cols-[1.1fr_1fr] gap-12 items-center"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
      >
        <motion.div variants={slideFromLeftItem}>
          <div className="flex items-center gap-2 text-amber-500 mb-3">
            <span className="h-px w-8 bg-amber-500" />
            <span className="mono uppercase tracking-widest">
              {t('section.eyebrow')}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
            {t('section.title')}
          </h2>
          <p className="text-white/70 text-lg mt-5 max-w-lg">
            {t('section.kicker')}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={buildWhatsAppUrl(t('whatsappTemplate'), 'primary')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] hover:brightness-110 text-navy-950 font-semibold px-6 py-4 rounded-full transition shadow-lg"
            >
              <img src={whatsappIcon} alt="" aria-hidden="true" className="w-6 h-6" />
              {t('whatsapp.primaryLabel')}
            </a>
            <a
              href={buildWhatsAppUrl(t('whatsappTemplate'), 'secondary')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-4 rounded-full transition backdrop-blur"
            >
              <img src={whatsappIcon} alt="" aria-hidden="true" className="w-5 h-5" />
              {t('whatsapp.secondaryLabel')}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={EMAIL_MAILTO}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full text-sm hover:text-amber-500 transition-colors duration-300"
            >
              <span className="text-amber-500">{I.mail}</span>
              {EMAIL}
            </a>
            <a
              href={ADDRESS_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('channels.addressLabel')}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full text-sm hover:text-amber-500 transition-colors duration-300"
            >
              <span className="text-amber-500">{I.pin}</span>
              {ADDRESS}
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <span className="mono uppercase text-white/50 tracking-widest mr-2">
              {t('social.label')}
            </span>
            <a
              href={SOCIAL.instagram}
              aria-label={t('social.instagramAria')}
              className="inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition text-sm"
            >
              <span className="w-5 h-5">{I.instagram}</span>
              @coneccar.rent
            </a>
          </div>
        </motion.div>

        <motion.div variants={slideFromRightItem} className="bg-white/5 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur">
          <div className="font-display text-xl font-semibold">
            {t('form.title')}
          </div>
          <p className="text-sm text-white/60 mt-1">
            {t('form.subtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {FORM_FIELDS.map(([field, id]) => (
              <label key={id} htmlFor={id} className="block">
                <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                  {t(`form.fields.${field}.label`)}
                </span>
                <input
                  id={id}
                  className="mt-1.5 w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-amber-500 text-white"
                  placeholder={t(`form.fields.${field}.placeholder`)}
                />
              </label>
            ))}
          </div>
          <label htmlFor="contact-notes" className="block mt-3">
            <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
              {t('form.fields.notes.label')}
            </span>
            <textarea
              id="contact-notes"
              rows={3}
              className="mt-1.5 w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-amber-500 text-white"
              placeholder={t('form.fields.notes.placeholder')}
            ></textarea>
          </label>
          <button className="mt-5 w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition">
            {t('form.submit')} {I.arrow}
          </button>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Contact;
