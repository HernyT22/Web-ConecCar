import { useTranslation } from 'react-i18next';
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";

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
        <div className="space-y-5 text-navy-700/85 text-[17px] leading-relaxed">
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          <div className="pt-2 flex flex-wrap gap-2">
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
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {FEATURE_IDS.map((id) => (
            <div
              key={id}
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
            </div>
          ))}
        </div>
      </div>

      {/* franja de beneficios incluidos — full width, adaptada a mobile */}
      <div className="mt-12 md:mt-16">
        <div className="flex items-center gap-2 text-amber-600 mb-3">
          <span className="h-px w-8 bg-amber-500" />
          <span className="mono uppercase tracking-widest">
            {t('about.benefitsEyebrow')}
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mb-6">
          {t('about.benefitsTitle')}
        </h3>

        <div className="rounded-2xl overflow-hidden border border-amber-500/40 bg-amber-500/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {BENEFIT_IDS.map((id) => (
              <div
                key={id}
                className="group flex items-center gap-3 bg-white px-4 py-5 hover:bg-amber-500/5 transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/55 group-hover:bg-amber-500/15 group-hover:scale-[1.04] transition-transform">
                  <span className="w-5 h-5">{BENEFIT_ICONS[id]}</span>
                </span>
                <span className="text-[15px] font-medium text-navy-900 leading-tight">
                  {t(`about.benefits.${id}`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
