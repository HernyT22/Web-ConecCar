import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { I } from '@/app/components/ConecCar/Icons';
import LanguageSwitcher from '@/app/components/ConecCar/LanguageSwitcher';
import logoConeccar from '@/imports/coneccar-logo.webp';
import { WHATSAPP_URL } from '@/data/contact';
import { useActiveSection } from '@/app/hooks/useActiveSection';

const SECTION_IDS = ['about', 'fleet', 'destinations', 'reviews', 'contact'];

const NAV_KEYS = [
  { key: 'about',        href: '/#about',        id: 'about' },
  { key: 'fleet',        href: '/#fleet',         id: 'fleet' },
  { key: 'destinations', href: '/#destinations',  id: 'destinations' },
  { key: 'reviews',      href: '/#reviews',       id: 'reviews' },
  { key: 'contact',      href: '/#contact',       id: 'contact' },
] as const;

const Nav = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const activeId = useActiveSection(isHome ? SECTION_IDS : []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-24 md:h-28 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3.5 group">
            <span className="relative h-16 md:h-20 aspect-square rounded-2xl overflow-hidden ring-1 ring-amber-500/50 shadow-[0_4px_18px_-6px_rgba(201,161,74,0.55),0_2px_6px_rgba(9,22,40,0.18)] bg-navy-950 transition-transform group-hover:scale-[1.03]">
              <ImageWithFallback src={logoConeccar} alt="ConecCar.rent" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/10 to-transparent pointer-events-none" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="sr-only">ConecCar.rent</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_KEYS.map((link) => {
              const isActive = isHome && activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={[
                    'relative text-[15px] transition',
                    "after:content-[''] after:absolute after:left-0 after:bottom-[-6px]",
                    'after:h-[2px] after:w-full after:bg-amber-500',
                    'after:origin-left after:transition-transform after:duration-300',
                    isActive
                      ? 'text-navy-900 after:scale-x-100'
                      : 'text-navy-700 hover:text-navy-900 after:scale-x-0 hover:after:scale-x-100',
                  ].join(' ')}
                >
                  {t(`nav.${link.key}`)}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-navy-900 hover:bg-amber-500 hover:text-navy-950 text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
            >
              {t('nav.bookCta')} {I.arrow}
            </a>
          </div>

          <button className="md:hidden text-navy-900 p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? I.close : I.menu}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-navy-100 bg-white">
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_KEYS.map((link) => (
                <a key={link.id} href={link.href} onClick={() => setOpen(false)} className="py-2.5 text-navy-800">
                  {t(`nav.${link.key}`)}
                </a>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-amber-500 hover:text-navy-950 text-white py-3 rounded-full text-sm font-medium transition-colors duration-300"
              >
                {t('nav.bookCta')} {I.arrow}
              </a>
              <div className="mt-3 flex justify-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="h-24 md:h-28" aria-hidden="true" />
    </>
  );
};

export default Nav;
