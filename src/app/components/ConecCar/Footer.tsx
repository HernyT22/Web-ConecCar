import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import logoConeccar from '@/imports/coneccar-logo.webp';
import { CATEGORY_IDS } from './fleetCategories';

const NAV_LINKS = [
  { key: 'about',        href: '/#about' },
  { key: 'destinations', href: '/#destinations' },
  { key: 'reviews',      href: '/#reviews' },
  { key: 'contact',      href: '/#contact' },
] as const;

const HELP_LINKS = [
  { key: 'insurance',   href: '/ayuda#seguro' },
  { key: 'cancellation',href: '/ayuda#cancelacion' },
  { key: 'driving',     href: '/ayuda#manejar-en-argentina' },
  { key: 'faqs',        href: '/ayuda#preguntas-frecuentes' },
] as const;

const Footer = () => {
  const { t } = useTranslation();
  const { t: tFleet } = useTranslation('fleet');

  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">

        {/* Columna marca */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="h-16 aspect-square rounded-xl overflow-hidden ring-1 ring-amber-500/40 bg-navy-950">
              <ImageWithFallback
                src={logoConeccar}
                alt="ConecCar.rent"
                className="w-full h-full object-cover"
              />
            </span>
          </div>
          <p className="font-display text-base md:text-lg leading-snug text-white max-w-sm">
            {t('footer.tagline')}{' '}
            <span className="text-amber-500">{t('footer.taglineAccent')}</span>
          </p>
          <div className="mt-5 mono uppercase text-white/40 tracking-widest">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>

        {/* Navegación */}
        <div>
          <div className="text-white font-medium mb-4">{t('footer.navigation')}</div>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((li) => (
              <li key={li.key}>
                <Link to={li.href} className="hover:text-white transition">
                  {t(`footer.links.${li.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Flota */}
        <div>
          <div className="text-white font-medium mb-4">{t('footer.fleet')}</div>
          <ul className="space-y-2.5 text-sm">
            {CATEGORY_IDS.map((id) => (
              <li key={id}>
                <Link to={`/#fleet?cat=${id}`} className="hover:text-white transition">
                  {tFleet(`enums.category.${id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <div className="text-white font-medium mb-4">{t('footer.help')}</div>
          <ul className="space-y-2.5 text-sm">
            {HELP_LINKS.map((li) => (
              <li key={li.key}>
                <Link to={li.href} className="hover:text-white transition">
                  {t(`footer.links.${li.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <div className="flex items-center gap-5">
            <Link to="/ayuda#terminos" className="hover:text-white transition">{t('footer.legal.terms')}</Link>
            <Link to="/ayuda#privacidad" className="hover:text-white transition">{t('footer.legal.privacy')}</Link>
          </div>
          <a
            href="https://www.linkedin.com/in/hern%C3%A1n-guevara-6b75ba25a/"
            target="_blank"
            rel="noopener noreferrer"
            className="mono uppercase tracking-widest"
          >
            Hecho por Hernán Guevara
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
