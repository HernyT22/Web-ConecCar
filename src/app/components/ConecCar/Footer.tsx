// ConecCar.rent — Footer
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoConeccar from "@/imports/coneccar-logo.png";
import { CATEGORIES, CAT_TO_SLUG } from "./fleetCategories";

type NavItem = { label: string; href: string };
type NavSection = { h: string; l: NavItem[] };

const sections: NavSection[] = [
  {
    h: "Empresa",
    l: [
      { label: "Nosotros", href: "#" },
      { label: "Trabajá con nosotros", href: "#" },
    ],
  },
  {
    h: "Flota",
    l: CATEGORIES.map((cat) => ({
      label: cat,
      href: "#fleet?cat=" + CAT_TO_SLUG[cat],
    })),
  },
  {
    h: "Ayuda",
    l: [
      { label: "Seguro", href: "#" },
      { label: "Política de cancelación", href: "#" },
      { label: "Manejar en Argentina", href: "#" },
      { label: "Preguntas frecuentes", href: "#" },
    ],
  },
];

const Footer = () => (
  <footer className="bg-navy-950 text-white/70">
    <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="h-16 aspect-square rounded-xl overflow-hidden ring-1 ring-amber-500/40 bg-navy-950">
            <ImageWithFallback
              src={logoConeccar}
              alt="ConecCar.rent"
              className="w-full h-full object-cover"
            />
          </span>
        </div>
        <p className="font-display text-base md:text-lg leading-snug text-white max-w-sm">
          Alquiler de vehículos en Mendoza,{" "}
          <span className="text-amber-500">
            operado por gente que vive acá.
          </span>
        </p>
        <div className="mt-5 mono uppercase text-white/40 tracking-widest">
          © 2026 ConecCar.rent
        </div>
      </div>
      {sections.map((c) => (
        <div key={c.h}>
          <div className="text-white font-medium mb-4">
            {c.h}
          </div>
          <ul className="space-y-2.5 text-sm">
            {c.l.map((li) => (
              <li key={li.label}>
                <a
                  href={li.href}
                  className="hover:text-white transition"
                >
                  {li.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
        <div className="flex items-center gap-5">
          <a href="#" className="hover:text-white transition">
            Términos
          </a>
          <a href="#" className="hover:text-white transition">
            Privacidad
          </a>
          <a href="#" className="hover:text-white transition">
            Cookies
          </a>
        </div>
        <div className="mono uppercase tracking-widest">
          Hecho en Mendoza · AR
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
