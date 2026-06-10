// ConecCar.rent — Destinos
import { useState, useEffect } from "react";
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
  {
    id: "valle-de-uco",
    name: "Valle de Uco",
    tag: "Zona de bodegas",
    distance: "80 km · 1h",
    description:
      "Terroir de altura con bodegas boutique, vistas a la cordillera y cocina de autor entre viñedos.",
    img: valleDeUco,
  },
  {
    id: "san-rafael",
    name: "San Rafael",
    tag: "Paisajes, espejos de agua, bodegas",
    distance: "250 km · 3h",
    description:
      "Lagos, embalses y bodegas familiares. Base ideal para combinar relax y aventura en el sur mendocino.",
    img: sanRafael,
  },
  {
    id: "malargue",
    name: "Malargüe",
    tag: "Aire libre y centro de ski",
    distance: "330 km · 4h",
    description:
      "Las Leñas en invierno, caverna de las Brujas y la Payunia volcánica el resto del año.",
    img: malargue,
  },
  {
    id: "gran-mendoza",
    name: "Gran Mendoza",
    tag: "Bodegas, hoteles, paisajes",
    distance: "Radio 20 km",
    description:
      "Capital arbolada, calle Arístides, Parque San Martín y las primeras bodegas a 20 minutos del centro.",
    img: granMendoza,
  },
  {
    id: "potrerillos",
    name: "Potrerillos",
    tag: "Lago y montaña",
    distance: "60 km · 1h",
    description:
      "Dique turquesa rodeado de precordillera. Cabañas, rafting suave y trekking accesible.",
    img: potrerillos,
  },
  {
    id: "canon-del-atuel",
    name: "Cañón del Atuel",
    tag: "Rafting y cañadones",
    distance: "300 km · 3h 30m",
    description:
      "Formaciones rocosas espectaculares cerca de San Rafael. Rafting nivel 2-3 y kayak entre miradores.",
    img: atuel,
  },
];

const Destinations = () => {
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

  const handleWhatsAppClick = (name: string) => {
    const msg = `Hola, me interesa saber más sobre ${name} y los vehículos disponibles para visitarlo.`;
    window.open(buildWhatsAppUrl(msg), "_blank");
  };

  return (
    <Section
      id="destinations"
      eyebrow="Destinos"
      title="Los destinos que nuestros clientes eligen."
      kicker="Rutas paisajes y recomendaciones para disfrutar Mendoza de verdad."
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
              aria-label={d.name + ", " + d.tag}
              className={cn(
                "relative aspect-[4/3] rounded-2xl overflow-hidden",
                "border border-navy-100 text-left cursor-pointer",
                "focus:outline-none focus:ring-2 focus:ring-amber-500"
              )}
            >
              <ImageWithFallback
                src={d.img}
                alt={d.name}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-all duration-300",
                  isOpen ? "brightness-[0.35]" : "brightness-100"
                )}
              />

              <span className="absolute top-3 left-3 bg-white/95 text-navy-900 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full max-w-[60%]">
                {d.tag}
              </span>

              <span className="absolute top-3 right-3 bg-navy-950/85 text-white text-[10px] tracking-wide font-medium px-2.5 py-1 rounded-full">
                {d.distance}
              </span>

              <div
                className={cn(
                  "absolute inset-x-0 bottom-0 p-4 text-white z-[1] transition-opacity duration-300",
                  isOpen ? "opacity-0" : "opacity-100"
                )}
              >
                <h3 className="font-display text-xl leading-tight mb-1">
                  {d.name}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-white/80">
                  {I.pin}
                  Provincia de Mendoza
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
                  aria-label="Cerrar"
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
                  ×
                </span>

                <div>
                  <h3 className="font-display text-lg mb-2">{d.name}</h3>
                  <p className="text-sm leading-relaxed text-white/85">
                    {d.description}
                  </p>
                </div>

                <span
                  role="button"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWhatsAppClick(d.name);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleWhatsAppClick(d.name);
                    }
                  }}
                  className="self-start inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5a] text-[#052e16] text-sm font-medium px-4 py-2 rounded-full mt-4 cursor-pointer transition-colors"
                >
                  Saber más
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
