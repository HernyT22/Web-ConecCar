// ConecCar.rent — Navbar
import { useState } from "react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { I } from "@/app/components/ConecCar/Icons";
import logoConeccar from "@/imports/coneccar-logo-1.png";

const Nav = () => {
  const [open, setOpen] = useState(false);
  const links = [
    ["Nosotros", "#about"],
    ["Flota", "#fleet"],
    ["Destinos", "#destinations"],
    ["Opiniones", "#reviews"],
    ["Contacto", "#contact"],
  ];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/85 backdrop-blur border-b border-navy-100">
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-24 md:h-28 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3.5 group">
            <span className="relative h-16 md:h-20 aspect-square rounded-2xl overflow-hidden ring-1 ring-amber-500/50 shadow-[0_4px_18px_-6px_rgba(201,161,74,0.55),0_2px_6px_rgba(9,22,40,0.18)] bg-navy-950 transition-transform group-hover:scale-[1.03]">
              <ImageWithFallback src={logoConeccar} alt="ConecCar.rent" className="absolute inset-0 w-full h-full object-cover" />
              <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/10 to-transparent pointer-events-none" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="sr-only">ConecCar.rent</span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map(([l, h]) => (<a key={l} href={h} className="text-[15px] text-navy-700 hover:text-navy-900 transition">{l}</a>))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-navy-50 text-navy-700 text-sm">
              {I.globe} <span>ES</span> {I.chevron}
            </button>
            <a href="#fleet" className="inline-flex items-center gap-2 bg-navy-900 hover:bg-navy-800 text-white pl-5 pr-4 py-2.5 rounded-full text-sm font-medium transition">
              Reservar vehículo {I.arrow}
            </a>
          </div>

          <button className="md:hidden text-navy-900 p-2 -mr-2" onClick={() => setOpen(!open)} aria-label="Menú">
            {open ? I.close : I.menu}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-navy-100 bg-white">
            <div className="px-5 py-4 flex flex-col gap-1">
              {links.map(([l, h]) => (<a key={l} href={h} onClick={() => setOpen(false)} className="py-2.5 text-navy-800">{l}</a>))}
              <a href="#fleet" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 bg-navy-900 text-white py-3 rounded-full text-sm font-medium">
                Reservar vehículo {I.arrow}
              </a>
            </div>
          </div>
        )}
      </header>

      <div className="h-24 md:h-28" aria-hidden="true" />
    </>
  );
};

export default Nav;