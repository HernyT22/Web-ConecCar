// ConecCar.rent — Destinos
import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/components/ui/utils";
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";
import type { Destination } from "./types";
import { buildWhatsAppUrl } from "./whatsapp";
import { staggerContainer, slideDownItem, VIEWPORT_CONFIG } from "@/animations/variants";

import valleDeUcoSm from "@/imports/valle-de-uco-vinedos-sm.webp";
import valleDeUcoMd from "@/imports/valle-de-uco-vinedos-md.webp";
import valleDeUcoLg from "@/imports/valle-de-uco-vinedos-lg.webp";
import sanRafaelSm from "@/imports/san-rafael-lago-sm.webp";
import sanRafaelMd from "@/imports/san-rafael-lago-md.webp";
import sanRafaelLg from "@/imports/san-rafael-lago-lg.webp";
import malargueSmImg from "@/imports/malargue-castillos-sm.webp";
import alargueMdImg from "@/imports/malargue-castillos-md.webp";
import alargueLgImg from "@/imports/malargue-castillos-lg.webp";
import granMendozaSm from "@/imports/gran-mendoza-portones-sm.webp";
import granMendozaMd from "@/imports/gran-mendoza-portones-md.webp";
import granMendozaLg from "@/imports/gran-mendoza-portones-lg.webp";
import potrerillosSm from "@/imports/potrerillos-lago-sm.webp";
import potrerillosMd from "@/imports/potrerillos-lago-md.webp";
import potrerillosLg from "@/imports/potrerillos-lago-lg.webp";
import atuelSm from "@/imports/atuel-lago-sm.webp";
import atuelMd from "@/imports/atuel-lago-md.webp";
import atuelLg from "@/imports/atuel-lago-lg.webp";

const destinations: Destination[] = [
  { id: "valle-de-uco",    img: { sm: valleDeUcoSm,  md: valleDeUcoMd,  lg: valleDeUcoLg  } },
  { id: "san-rafael",      img: { sm: sanRafaelSm,   md: sanRafaelMd,   lg: sanRafaelLg   } },
  { id: "malargue",        img: { sm: malargueSmImg,  md: alargueMdImg,  lg: alargueLgImg  } },
  { id: "gran-mendoza",    img: { sm: granMendozaSm, md: granMendozaMd, lg: granMendozaLg } },
  { id: "potrerillos",     img: { sm: potrerillosSm, md: potrerillosMd, lg: potrerillosLg } },
  { id: "canon-del-atuel", img: { sm: atuelSm,       md: atuelMd,       lg: atuelLg       } },
];

const Destinations = () => {
  const { t } = useTranslation('destinations');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const handleCardClick = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const closeCard = (id: string) => {
    setOpenId(null);
    document.getElementById(`dest-${id}-toggle`)?.focus();
  };

  return (
    <Section
      id="destinations"
      eyebrow={t('section.eyebrow')}
      title={t('section.title')}
      kicker={t('section.kicker')}
      className="bg-white"
    >
      <m.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_CONFIG}
        variants={staggerContainer}
      >
        {destinations.map((d) => {
          const isOpen = openId === d.id;
          const name = t(`items.${d.id}.name`);
          const whatsappHref = buildWhatsAppUrl(t('whatsappTemplate', { name }));
          return (
            <m.article
              key={d.id}
              variants={slideDownItem}
              className={cn(
                "relative aspect-[4/3] rounded-2xl overflow-hidden",
                "border border-navy-100 text-left",
                "[contain:layout_paint]"
              )}
            >
              <img
                src={d.img.md}
                srcSet={`${d.img.sm} 480w, ${d.img.md} 800w, ${d.img.lg} 1200w`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                alt={t('card.imageAlt', { name })}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-300",
                  isOpen ? "brightness-[0.35]" : "brightness-100"
                )}
              />

              <span className="absolute top-3 left-3 bg-white/95 text-navy-900 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full max-w-[60%]">
                {t(`items.${d.id}.tag`)}
              </span>

              <span className="absolute top-3 right-3 bg-navy-950/85 text-white text-[10px] tracking-wide font-medium px-2.5 py-1 rounded-full">
                {t(`items.${d.id}.distance`)}
              </span>

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-4 text-white z-[1] transition-opacity duration-300 pointer-events-none",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
              >
                <h3 className="font-display text-xl leading-tight mb-1">
                  {name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-white/80">
                  {I.pin}
                  {t('card.subregion')}
                </span>
              </div>

              <button
                type="button"
                id={`dest-${d.id}-toggle`}
                onClick={() => handleCardClick(d.id)}
                aria-expanded={isOpen}
                aria-controls={`dest-${d.id}-panel`}
                aria-label={name + ", " + t(`items.${d.id}.tag`)}
                className="absolute inset-0 z-[1] cursor-pointer rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />

              <div
                id={`dest-${d.id}-panel`}
                aria-hidden={!isOpen}
                className={cn(
                  "absolute inset-0 bg-navy-950/95 p-4 sm:p-5 z-[2]",
                  "flex flex-col text-white",
                  "transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen ? "translate-y-0" : "translate-y-full"
                )}
              >
                <button
                  type="button"
                  aria-label={t('card.closeAriaLabel')}
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => closeCard(d.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors shrink-0"
                >
                  {I.close}
                </button>

                <div className="flex-1 min-h-0 overflow-y-auto pr-8 pt-1">
                  <p className="font-display text-lg mb-2">{name}</p>
                  <p className="text-sm leading-relaxed text-white/85">
                    {t(`items.${d.id}.description`)}
                  </p>
                </div>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={isOpen ? 0 : -1}
                  className="self-start shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 text-sm font-medium px-4 py-2 rounded-full mt-4 cursor-pointer transition-colors"
                >
                  {t('card.ctaMore', { name })}
                </a>
              </div>
            </m.article>
          );
        })}
      </m.div>
    </Section>
  );
};

export default Destinations;
