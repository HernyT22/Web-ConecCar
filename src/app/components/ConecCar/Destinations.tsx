// ConecCar.rent — Destinos
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/app/components/ui/utils";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";
import type { Destination } from "./types";
import { buildWhatsAppUrl } from "./whatsapp";
import valleDeUco from "@/imports/valle-de-uco-vinedos.jpg";
import sanRafael from "@/imports/san-rafael-lago.jpg";
import malargue from "@/imports/malargue-castillos.jpg";
import granMendoza from "@/imports/gran-mendoza-portones.jpg";
import potrerillos from "@/imports/potrerillos-lago.jpg";
import atuel from "@/imports/atuel-lago.jpg";

const destinations: Destination[] = [
  { id: "valle-de-uco",    img: valleDeUco },
  { id: "san-rafael",      img: sanRafael },
  { id: "malargue",        img: malargue },
  { id: "gran-mendoza",    img: granMendoza },
  { id: "potrerillos",     img: potrerillos },
  { id: "canon-del-atuel", img: atuel },
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

  const handleWhatsAppClick = (destId: string) => {
    const name = t(`items.${destId}.name`);
    const msg = t('whatsappTemplate', { name });
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <Section
      id="destinations"
      eyebrow={t('section.eyebrow')}
      title={t('section.title')}
      kicker={t('section.kicker')}
      className="bg-white"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {destinations.map((d) => {
          const isOpen = openId === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => handleCardClick(d.id)}
              aria-expanded={isOpen}
              aria-label={t(`items.${d.id}.name`) + ", " + t(`items.${d.id}.tag`)}
              className={cn(
                "relative aspect-[4/3] rounded-2xl overflow-hidden",
                "border border-navy-100 text-left cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-amber-500"
              )}
            >
              <ImageWithFallback
                src={d.img}
                alt={t(`items.${d.id}.name`)}
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
                  "absolute inset-x-0 bottom-0 p-4 text-white z-[1] transition-opacity duration-300",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
              >
                <h3 className="font-display text-xl leading-tight mb-1">
                  {t(`items.${d.id}.name`)}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-white/80">
                  {I.pin}
                  {t('card.subregion')}
                </span>
              </div>

              <div
                className={cn(
                  "absolute inset-0 bg-navy-950/95 p-5 z-[2]",
                  "flex flex-col justify-between text-white",
                  "transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  isOpen ? "translate-y-0" : "translate-y-full"
                )}
              >
                <span
                  role="button"
                  aria-label={t('card.closeAriaLabel')}
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenId(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenId(null);
                    }
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                >
                  {I.close}
                </span>

                <div>
                  <h3 className="font-display text-lg mb-2">{t(`items.${d.id}.name`)}</h3>
                  <p className="text-sm leading-relaxed text-white/85">
                    {t(`items.${d.id}.description`)}
                  </p>
                </div>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppClick(d.id);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleWhatsAppClick(d.id);
                    }
                  }}
                  className="self-start inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 text-sm font-medium px-4 py-2 rounded-full mt-4 cursor-pointer transition-colors"
                >
                  {t('card.ctaMore')}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
};

export default Destinations;
