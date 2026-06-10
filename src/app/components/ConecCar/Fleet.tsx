// ConecCar.rent — Flota
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import Section from "@/app/components/ConecCar/Section";
import PlaceholderImg from "@/app/components/ConecCar/PlaceholderImg";
import { I } from "@/app/components/ConecCar/Icons";
import citroenBasaltBlanco from "@/imports/citroen-basalt-blanco-1.jpeg";
import cheryTiggo2 from "@/imports/chery-tiggo2-rojo-1.jpeg";
import vwFox from "@/imports/vw-fox-blanco-1.jpeg";
import kiaRio from "@/imports/kia-rio-gris.jpeg";

const Fleet = () => {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todos");
  const cats = ["Todos", "SUV", "Sedanes", "Hatchback"];

  interface Car {
    name: string;
    cat: string;
    seats: number;
    bags: number;
    trans: string;
    ac: boolean;
    price: number;
    badge?: string;
    img?: string;
  }

  const cars: Car[] = [
    {
      name: "Citroën Basalt Shine 2026",
      cat: "SUV",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 90,
      badge: "Más reservado",
      img: citroenBasaltBlanco,
    },
    {
      name: "Chery Tiggo 2 (2026)",
      cat: "SUV",
      seats: 5,
      bags: 3,
      trans: "Automático",
      ac: true,
      price: 95,
      badge: "Nuevo",
      img: cheryTiggo2,
    },
    {
      name: "Kia Rio (2022)",
      cat: "Sedanes",
      seats: 5,
      bags: 2,
      trans: "Automático",
      ac: true,
      price: 85,
      img: kiaRio,
    },
    {
      name: "Volkswagen Fox (2022)",
      cat: "Hatchback",
      seats: 5,
      bags: 2,
      trans: "Manual",
      ac: true,
      price: 70,
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
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm border transition ${
                cat === c
                  ? "bg-navy-900 text-white border-navy-900"
                  : "bg-white text-navy-700 border-navy-200 hover:border-navy-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grilla de tarjetas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {list.map((c, i) => (
          <article
            key={i}
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
