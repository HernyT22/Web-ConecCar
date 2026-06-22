import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { I } from '@/app/components/ConecCar/Icons';
import { SUPPORTED_LANGS, type SupportedLang } from '@/i18n';

const LANG_FLAGS: Record<SupportedLang, string> = {
  'es': '🇦🇷',
  'en': '🇺🇸',
  'pt-BR': '🇧🇷',
};

const LANG_SHORT: Record<SupportedLang, string> = {
  'es': 'ES',
  'en': 'EN',
  'pt-BR': 'PT',
};

function resolveDisplayLang(lang: string | undefined): SupportedLang {
  if (!lang) return 'es';
  if (SUPPORTED_LANGS.includes(lang as SupportedLang)) return lang as SupportedLang;
  const prefix = lang.split('-')[0];
  return SUPPORTED_LANGS.find((l) => l.startsWith(prefix)) ?? 'es';
}

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = resolveDisplayLang(i18n.resolvedLanguage ?? i18n.language);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code: SupportedLang) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t('language.label')}
        aria-expanded={open}
        className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-navy-50 text-navy-700 text-sm transition"
      >
        <span className="w-4 h-4">{I.globe}</span>
        <span>{LANG_SHORT[current]}</span>
        <span className={`w-4 h-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          {I.chevron}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 rounded-2xl bg-white border border-navy-100 shadow-lg overflow-hidden z-50">
          {SUPPORTED_LANGS.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className={[
                'w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition',
                lang === current
                  ? 'bg-amber-50 text-navy-900 font-medium'
                  : 'text-navy-700 hover:bg-navy-50 hover:text-navy-900',
              ].join(' ')}
            >
              <span>{LANG_FLAGS[lang]}</span>
              <span>{t(`language.${lang}` as `language.${SupportedLang}`)}</span>
              {lang === current && (
                <span className="ml-auto w-3.5 h-3.5 text-amber-500">{I.check}</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
