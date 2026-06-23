// ConecCar.rent — Contacto
import { useState, FormEvent } from 'react';
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

type FormState = {
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  notes: string;
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  phone: '',
  pickupDate: '',
  notes: '',
};

const Contact = () => {
  const { t, i18n } = useTranslation('contact');
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const validate = (data: FormState): Partial<Record<keyof FormState, string>> => {
    const errs: Partial<Record<keyof FormState, string>> = {};
    if (!data.name.trim()) errs.name = t('form.validation.required');
    if (!data.email.trim()) {
      errs.email = t('form.validation.required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errs.email = t('form.validation.invalidEmail');
    }
    if (!data.phone.trim()) errs.phone = t('form.validation.required');
    if (!data.pickupDate.trim()) errs.pickupDate = t('form.validation.required');
    if (!data.notes.trim()) errs.notes = t('form.validation.required');
    return errs;
  };

  const handleChange = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `ConecCar — Nueva solicitud de contacto de ${formData.name}`,
          from_name: 'ConecCar Web',
          botcheck: '',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          pickup_date: formData.pickupDate,
          notes: formData.notes,
          language: i18n.language,
          page_url: window.location.href,
        }),
      });
      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData(INITIAL_FORM);
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        console.error('Web3Forms error:', result);
        setStatus('error');
      }
    } catch (err) {
      console.error('Network error submitting form:', err);
      setStatus('error');
    }
  };

  const minPickupDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  })();

  const inputClass = (field: keyof FormState) =>
    `mt-1.5 w-full bg-white/10 border rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-amber-500 text-white ${
      errors[field] ? 'border-red-500' : 'border-white/15'
    }`;

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
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
              <div>
                <label htmlFor="contact-name" className="block">
                  <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                    {t('form.fields.name.label')}
                  </span>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange('name')}
                    placeholder={t('form.fields.name.placeholder')}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    className={inputClass('name')}
                  />
                </label>
                {errors.name && (
                  <p id="contact-name-error" className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block">
                  <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                    {t('form.fields.email.label')}
                  </span>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    placeholder={t('form.fields.email.placeholder')}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    className={inputClass('email')}
                  />
                </label>
                {errors.email && (
                  <p id="contact-email-error" className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-phone" className="block">
                  <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                    {t('form.fields.phone.label')}
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange('phone')}
                    placeholder={t('form.fields.phone.placeholder')}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    className={inputClass('phone')}
                  />
                </label>
                {errors.phone && (
                  <p id="contact-phone-error" className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-pickup-date" className="block">
                  <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                    {t('form.fields.pickupDate.label')}
                  </span>
                  <input
                    id="contact-pickup-date"
                    type="date"
                    value={formData.pickupDate}
                    onChange={handleChange('pickupDate')}
                    min={minPickupDate}
                    aria-invalid={!!errors.pickupDate}
                    aria-describedby={errors.pickupDate ? 'contact-pickup-date-error' : undefined}
                    className={inputClass('pickupDate')}
                  />
                </label>
                {errors.pickupDate && (
                  <p id="contact-pickup-date-error" className="text-red-400 text-xs mt-1">{errors.pickupDate}</p>
                )}
              </div>
            </div>
            <div className="mt-3">
              <label htmlFor="contact-notes" className="block">
                <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                  {t('form.fields.notes.label')}
                </span>
                <textarea
                  id="contact-notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange('notes')}
                  placeholder={t('form.fields.notes.placeholder')}
                  aria-invalid={!!errors.notes}
                  aria-describedby={errors.notes ? 'contact-notes-error' : undefined}
                  className={inputClass('notes')}
                ></textarea>
              </label>
              {errors.notes && (
                <p id="contact-notes-error" className="text-red-400 text-xs mt-1">{errors.notes}</p>
              )}
            </div>

            {status === 'success' && (
              <div
                role="status"
                className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{t('form.feedback.success')}</span>
              </div>
            )}
            {status === 'error' && (
              <div
                role="alert"
                className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
              >
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{t('form.feedback.error')}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-5 w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? t('form.submitting') : <>{t('form.submit')} {I.arrow}</>}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Contact;
