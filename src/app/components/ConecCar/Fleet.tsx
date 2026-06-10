// ConecCar.rent — Flota
import { useState, useEffect } from "react";
import { cn } from "@/app/components/ui/utils";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import Section from "@/app/components/ConecCar/Section";
import PlaceholderImg from "@/app/components/ConecCar/PlaceholderImg";
import { I } from "@/app/components/ConecCar/Icons";
import type { Car } from "./types";
import { CATEGORIES, parseCatFromHash } from "./fleetCategories";
import citroenBasaltAzul from "@/imports/citroen-azul-lateral.jpeg";
import citroenBasaltBlanco from "@/imports/citroen-blanco-lateral.jpeg";
import citroenDark from "@/imports/citroen-dark-lateral.jpeg";
import cheryTiggo2Blanco from "@/imports/cheri-blanco-lateral.jpeg";
import cheryTiggo2Rojo from "@/imports/cheri-rojo-lateral.jpeg";
import kiaRio from "@/imports/kia-rio-lateral.jpeg";
import vwFox from "@/imports/fox-lateral.jpg";

const Fleet = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const cats = ["Todos", ...CATEGORIES];

  useEffect(() => {
    const apply = (smooth: boolean) => {
      const cat = parseCatFromHash(window.location.hash);
      if (cat) {
        setCat(cat);
        document.getElementById("fleet")?.scrollIntoView({
          behavior: smooth ? "smooth" : "instant",
          block: "start",
        });
      }
    };

    apply(false);

    const onHashChange = () => apply(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const cars: Car[] = [
    {
      id: "citroen-basalt-azul",
      name: "Citroën Basalt Shine 2026",
      subtitle: "Azul Cosmo",
      cat: "SUV Coupé",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 90,
      img: citroenBasaltAzul,
    },
    {
      id: "citroen-basalt-blanco",
      name: "Citroën Basalt Shine 2026",
      subtitle: "Blanco Nacarado",
      cat: "SUV Coupé",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 90,
      img: citroenBasaltBlanco,
    },
    {
      id: "citroen-dark-edition",
      name: "Citroën Basalt Dark Edition 2026",
      subtitle: "Sting Grey",
      cat: "SUV Coupé",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 90,
      badge: "Edición especial",
      img: citroenDark,
    },
    {
      id: "chery-tiggo2-blanco",
      name: "Chery Tiggo 2 2026",
      subtitle: "Blanco",
      cat: "SUV Compacta",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 95,
      img: cheryTiggo2Blanco,
    },
    {
      id: "chery-tiggo2-rojo",
      name: "Chery Tiggo 2 2026",
      subtitle: "Rojo",
      cat: "SUV Compacta",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 95,
      img: cheryTiggo2Rojo,
    },
    {
      id: "kia-rio",
      name: "Kia Rio 2022",
      subtitle: "Clear Silver",
      cat: "Sedán",
      seats: 5,
      bags: 2,
      trans: "Automático",
      ac: true,
      price: 85,
      img: kiaRio,
    },
    {
      id: "honda-accord",
      name: "Honda Accord 2022",
      cat: "Sedán",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 250,
      badge: "Corporativo",
    },
    {
      id: "vw-fox",
      name: "Volkswagen Fox 2022",
      subtitle: "Blanco Cristal",
      cat: "Hatchback Compacto",
      seats: 5,
      bags: 2,
      trans: "Manual",
      ac: true,
      price: 70,
      badge: "Económico",
      img: vwFox,
    },
  ];

  const list = cars.filter(
    (c) =>
      (cat === "Todos" || c.cat === cat) &&
      (q === "" ||
        c.name.toLowerCase().includes(q.toLowerCase()) ||
        c.cat.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <Section
      id="fleet"
      eyebrow="Flota"
      title="Vehículos para cada Mendoza posible."
      kicker="City cars, sedans y SUV s preparados para moverte por Mendoza con comodidad y confianza."
      className="bg-navy-50/40"
    >
      {/* búsqueda + filtros */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-navy-100 shadow-sm p-2 flex flex-col sm:flex-row items-stretch gap-2">
          <div className="flex items-center gap-2.5 px-3 flex-1">
            <span className="text-navy-400">{I.search}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por modelo, tipo o característica…"
              className="bg-transparent w-full py-2.5 outline-none placeholder:text-navy-400 text-navy-900"
            />
          </div>
          <div className="flex items-center gap-2 px-3 sm:border-l border-navy-100">
            <span className="text-navy-500 text-sm">
              Ordenar
            </span>
            <button className="inline-flex items-center gap-1 text-navy-900 text-sm py-2">
              Precio: menor a mayor {I.chevron}
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm border transition",
                cat === c
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-navy-700 border-navy-200 hover:border-navy-400"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grilla de tarjetas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map((c) => (
          <article
            key={c.id}
            className="bg-white rounded-2xl border border-navy-100 overflow-hidden flex flex-col lift"
          >
            <div className="relative aspect-[4/3] bg-navy-50">
              {c.img ? (
                <ImageWithFallback
                  src={c.img}
                  alt={c.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <PlaceholderImg
                  label={`vehículo · ${c.name.toLowerCase()}`}
                  className="w-full h-full"
                />
              )}
              {c.badge && (
                <span className="absolute top-3 left-3 bg-amber-500 text-navy-950 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {c.badge}
                </span>
              )}
              <span className="absolute top-3 right-3 bg-white/95 text-navy-700 text-[11px] font-medium px-2.5 py-1 rounded-full border border-navy-100">
                {c.cat}
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  {c.name}
                </h3>
              </div>
              {c.subtitle && (
                <span className="block text-xs text-navy-500 mt-0.5">
                  {c.subtitle}
                </span>
              )}
              <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm text-navy-700/80 mt-4">
                <span className="inline-flex items-center gap-2">
                  <span className="text-navy-400">
                    {I.users}
                  </span>
                  {c.seats} asientos
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-navy-400">{I.bag}</span>
                  {c.bags} valijas
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-navy-400">
                    {I.gear}
                  </span>
                  {c.trans}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="text-navy-400">
                    {I.snow}
                  </span>
                  A/C
                </span>
              </div>
              <div className="mt-5 pt-5 border-t border-navy-100 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="mono uppercase text-navy-500">
                    Desde
                  </div>
                  <div className="flex items-baseline gap-1 whitespace-nowrap">
                    <span className="font-display text-2xl font-semibold text-navy-900">
                      US$ {c.price}
                    </span>
                    <span className="text-sm text-navy-500">
                      &bull; día
                    </span>
                  </div>
                </div>
                <button className="shrink-0 inline-flex items-center gap-1.5 bg-navy-900 hover:bg-navy-800 text-white text-sm px-4 py-2.5 rounded-full transition">
                  Reservar {I.arrow}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {list.length === 0 && (
        <div className="text-center py-16 text-navy-500">
          No hay vehículos que coincidan con esos filtros.
        </div>
      )}
    </Section>
  );
};

export default Fleet;
