import { useTranslation } from 'react-i18next';
import * as Accordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';
import Nav from '@/app/components/ConecCar/Nav';
import Footer from '@/app/components/ConecCar/Footer';
import { HELP_SECTIONS, FAQ_IDS } from '@/data/helpContent';
import { buildWhatsAppUrl } from '@/app/components/ConecCar/whatsapp';
import heroCordillera from '@/imports/hero-cordillera-mendoza.webp';
import whatsappIcon from '@/imports/whatsapp.png';

const Help = () => {
  const { t } = useTranslation('help');
  const whatsappUrl = buildWhatsAppUrl(t('whatsappTemplate'));

  return (
    <>
      <Nav />

      {/* Hero compacto */}
      <section className="relative overflow-hidden text-white" style={{ minHeight: '300px' }}>
        <div className="absolute inset-0">
          <img
            src={heroCordillera}
            alt=""
            aria-hidden="true"
            loading="eager"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-navy-950/85" />
        <div className="relative mx-auto max-w-3xl px-6 py-28 md:py-36 text-center">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wider mb-4">
            {t('hero.eyebrow')}
          </p>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-white/70 text-lg">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-3xl px-6 py-16 lg:py-24">

        {/* Secciones principales */}
        {HELP_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-28 mb-20">
            <h2 className="font-display text-3xl text-navy-950 pb-3 mb-6 border-b-2 border-amber-400">
              {t(`sections.${section.id}.title`)}
            </h2>

            {section.kind === 'paragraphs' && (
              (t(`sections.${section.id}.paragraphs`, { returnObjects: true }) as string[]).map((p, i) => (
                <p key={i} className="text-gray-700 text-base leading-relaxed mb-4">{p}</p>
              ))
            )}

            {section.kind === 'subsections' && (
              <>
                <p className="text-gray-700 text-base leading-relaxed mb-6">
                  {t(`sections.${section.id}.intro`)}
                </p>
                {section.subsectionIds.map((subId) => {
                  const intro = t(`sections.${section.id}.subsections.${subId}.intro`, { defaultValue: '' });
                  const paragraph = t(`sections.${section.id}.subsections.${subId}.paragraph`, { defaultValue: '' });
                  const items = t(`sections.${section.id}.subsections.${subId}.items`, { returnObjects: true, defaultValue: [] }) as string[];
                  return (
                    <div key={subId} className="mb-8">
                      <h3 className="text-xl font-semibold text-navy-900 mb-3">
                        {t(`sections.${section.id}.subsections.${subId}.title`)}
                      </h3>
                      {intro && <p className="text-gray-700 leading-relaxed mb-2">{intro}</p>}
                      {paragraph && <p className="text-gray-700 leading-relaxed">{paragraph}</p>}
                      {items.length > 0 && (
                        <ul className="list-disc list-outside pl-6 space-y-1.5 text-gray-700 mt-2">
                          {items.map((item, j) => (
                            <li key={j} className="marker:text-amber-500">{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </>
            )}
          </section>
        ))}

        {/* FAQs */}
        <section id="preguntas-frecuentes" className="scroll-mt-28 mb-20">
          <h2 className="font-display text-3xl text-navy-950 pb-3 mb-6 border-b-2 border-amber-400">
            {t('faqs.title')}
          </h2>
          <Accordion.Root type="single" collapsible className="w-full">
            {FAQ_IDS.map((id) => (
              <Accordion.Item
                key={id}
                value={id}
                className="border-b border-gray-200"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between py-5 text-left font-semibold text-navy-900 hover:text-amber-500 transition-colors">
                    <span>{t(`faqs.items.${id}.q`)}</span>
                    <Plus
                      className="ml-4 h-5 w-5 shrink-0 text-amber-500 transition-transform duration-200 group-data-[state=open]:rotate-45"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content
                  className="overflow-hidden text-gray-700 leading-relaxed data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up"
                >
                  <p className="pb-5">{t(`faqs.items.${id}.a`)}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </section>

        {/* CTA WhatsApp */}
        <div className="rounded-3xl bg-navy-950 px-8 py-12 text-center">
          <p className="text-white text-lg leading-relaxed mb-7 max-w-lg mx-auto">
            {t('cta.text')}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold px-8 py-4 rounded-full transition"
          >
            <img src={whatsappIcon} alt="" aria-hidden="true" className="w-5 h-5" />
            {t('cta.button')}
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Help;
