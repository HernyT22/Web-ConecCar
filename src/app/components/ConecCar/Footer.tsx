// ConecCar.rent — Footer
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoConeccar from "@/imports/coneccar-logo-1.png";

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
      {[
        {
          h: "Empresa",
          l: ["Nosotros", "Trabajá con nosotros"],
        },
        {
          h: "Flota",
          l: [
            "SUV Coupé",
            "SUV Compacta",
            "Sedanes",
            "Hatchback",
          ],
        },
        {
          h: "Ayuda",
          l: [
            "Seguro",
            "Política de cancelación",
            "Manejar en Argentina",
            "Preguntas frecuentes",
          ],
        },
      ].map((c, i) => (
        <div key={i}>
          <div className="text-white font-medium mb-4">
            {c.h}
          </div>
          <ul className="space-y-2.5 text-sm">
            {c.l.map((li) => (
              <li key={li}>
                <a
                  href="#"
                  className="hover:text-white transition"
                >
                  {li}
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