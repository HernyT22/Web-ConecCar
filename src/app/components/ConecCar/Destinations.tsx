// ConecCar.rent — Destinos
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import Section from "@/app/components/ConecCar/Section";
import PlaceholderImg from "@/app/components/ConecCar/PlaceholderImg";
import { I } from "@/app/components/ConecCar/Icons";
import valleUco from "@/imports/valle-de-uco-vinedos-1.jpg";
import sanRafael from "@/imports/san-rafael-lago-1.jpg";
import atuel from "@/imports/atuel-lago-1.jpg";
import malargue from "@/imports/malargue-castillos.jpg";
import granMendoza from "@/imports/gran-mendoza-portones.jpg";
import potrerillos from "@/imports/potrerillos-lago.jpg";

const Destinations = () => {
  interface Place {
    name: string;
    tag: string;
    dist: string;
    size: "lg" | "md" | "sm";
    img?: string;
  }

  const places: Place[] = [
    {
      name: "Valle de Uco",
      tag: "Zona de bodegas",
      dist: "80 km · 1h",
      size: "lg",
      img: valleUco,
    },
    {
      name: "San Rafael",
      tag: "Paisajes, espejos de agua, bodegas",
      dist: "250 km · 3h",
      size: "md",
      img: sanRafael,
    },
    {
      name: "Malargüe",
      tag: "Aire libre y centro de ski",
      dist: "330 km · 4h",
      size: "md",
      img: malargue,
    },
    {
      name: "Gran Mendoza",
      tag: "Bodegas, hoteles, paisajes",
      dist: "Radio 20 km",
      size: "sm",
      img: granMendoza,
    },
    {
      name: "Potrerillos",
      tag: "Lago y montaña",
      dist: "60 km · 1h",
      size: "sm",
      img: potrerillos,
    },
    {
      name: "Cañón del Atuel",
      tag: "Rafting y cañadones",
      dist: "300 km · 3h 30m",
      size: "sm",
      img: atuel,
    },
  ];

  return (
    <Section
      id="destinations"
      eyebrow="Destinos"
      title="Los destinos que nuestros clientes eligen."
      kicker="Rutas paisajes y recomendaciones para disfrutar Mendoza de verdad."
      className="bg-white"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[280px] md:auto-rows-[220px] gap-4">
        {places.map((p, i) => {
          const span =
            p.size === "lg"
              ? "md:col-span-2 md:row-span-2"
              : p.size === "md"
                ? "md:col-span-2 md:row-span-1"
                : "md:col-span-1 md:row-span-1";
          return (
            <a
              key={i}
              href="#"
              className={`group relative rounded-2xl overflow-hidden ${span} lift`}
            >
              {p.img ? (
                <ImageWithFallback
                  src={p.img}
                  alt={p.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <PlaceholderImg
                  label={`foto · ${p.name.toLowerCase()}`}
                  className="absolute inset-0 w-full h-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent" />
              <div className="absolute top-3 left-3 right-3 flex justify-between">
                <span className="bg-white/90 backdrop-blur text-navy-800 mono uppercase tracking-wider px-2 py-1 rounded-full text-[10px]">
                  {p.tag}
                </span>
                <span className="bg-navy-950/60 text-white mono uppercase tracking-wider px-2 py-1 rounded-full backdrop-blur text-[10px]">
                  {p.dist}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 text-white">
                <div className="flex items-end justify-between">
                  <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                    {p.name}
                  </h3>
                  <span className="opacity-0 group-hover:opacity-100 transition translate-x-2 group-hover:translate-x-0">
                    {I.arrow}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-white/70 text-sm">
                  {I.pin}
                  <span>Provincia de Mendoza</span>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </Section>
  );
};

export default Destinations;
