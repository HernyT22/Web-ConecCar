import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { I } from '@/app/components/ConecCar/Icons';
import heroCordillera from '@/imports/hero-cordillera-mendoza.jpg';
import { WHATSAPP_URL } from '@/data/contact';

const Hero = () => {
  const { t } = useTranslation('home');

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-white text-white"
    >
      <div className="absolute inset-0">
        <ImageWithFallback
          src={heroCordillera}
          alt="Ruta hacia la cordillera de los Andes en Mendoza"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-40 md:pb-48">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="mono uppercase tracking-widest">
              {t('hero.badge')}
            </span>
          </div>
          <h1 className="font-display text-[42px] sm:text-6xl md:text-7xl font-semibold leading-[1.02] mt-6">
            {t('hero.titleLine1')}
            <br />
            <span className="text-amber-500">{t('hero.titleLine2')}</span>
          </h1>
          <p className="text-white/75 text-lg md:text-xl mt-6 max-w-xl">
            {t('hero.subtitle')}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#fleet"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-medium px-6 py-3.5 rounded-full transition"
            >
              {t('hero.ctaPrimary')} {I.arrow}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur text-white font-medium px-6 py-3.5 rounded-full transition"
            >
              {t('hero.ctaSecondary')}
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2 text-white">
              <span className="w-4 h-4 text-amber-500">{I.clock}</span>
              <strong>{t('hero.clockBadge')}</strong>
            </div>
            <span className="hidden sm:block w-px h-4 bg-white/20" />
            <span className="hidden sm:block">
              {t('hero.deliveryText')}
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 -mb-10 md:-mb-12 translate-y-10 md:translate-y-12" />
    </section>
  );
};

export default Hero;
