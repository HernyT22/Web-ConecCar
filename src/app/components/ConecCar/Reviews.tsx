// ConecCar.rent — Opiniones
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";

const Reviews = () => {
  interface Review {
    name: string;
    role: string;
    text: string;
    lang?: string;
  }

  const items: Review[] = [
    {
      name: "Agustín Laiseca",
      role: "Argentina",
      text: "La atención es un 10/10, siempre con buena energía y muy bien organizado todo. Los autos espaciosos, en todas las ocasiones están impecables y listos para recorrer Mendoza. Las facilidades de pago y la buena atención destacan principalmente a la empresa. Volvería a elegirlos una y otra vez.",
    },
    {
      name: "Andrea Colamedici",
      role: "De visita desde Italia",
      lang: "IT → ES",
      text: "Una experiencia hermosa. El auto estaba impecable, muy cómodo para recorrer Mendoza y con un consumo excelente. Se nota el cuidado y la dedicación en cada detalle. Lo recomiendo mucho.",
    },
    {
      name: "Natalia Mamani",
      role: "Mendoza, Argentina",
      text: "Necesitaba resolver movilidad rápido porque tenía eventos y mi auto estaba en el taller. Fue súper práctico. Tener la posibilidad de alquilar un vehículo te salva muchísimo cuando no podés frenar tu rutina. Súper recomendado.",
    },
    {
      name: "Bastiaan Willers",
      role: "De visita desde Alemania",
      lang: "DE → ES",
      text: "El auto perfecto, amplio y cómodo. Todo súper limpio y en perfecto estado. La atención, los detalles y el precio son lo mejor. Lo recomiendo.",
    },
    {
      name: "Magdalena Romero",
      role: "De visita desde España",
      text: "Me encantó la experiencia. El coche estaba super limpio, cómodo y andando de maravilla. Ideal para recorrer Mendoza tranquila y disfrutar cada paisaje. Además la atención fue de diez, muy cercana y amable. Sin dudas repetiría.",
    },
  ];

  return (
    <Section
      id="reviews"
      eyebrow="Opiniones de clientes"
      title="Lo que dicen nuestros clientes cuando devuelven las llaves."
      kicker="Miles de kilómetros recorridos. Estas son sus experiencias."
      className="bg-white"
    >
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((r, i) => (
          <article
            key={i}
            className="relative rounded-2xl border border-navy-100 bg-white p-6 md:p-7 lift flex flex-col hover:border-amber-500/50 hover:shadow-[0_10px_30px_-12px_rgba(201,161,74,0.35)] transition"
          >
            <div className="flex items-center justify-between gap-3 mb-4 relative">
              <span className="inline-flex items-center gap-1.5 mono uppercase tracking-widest text-amber-600 text-[10px]">
                <span className="w-3.5 h-3.5">{I.check}</span>
                Opinión verificada
              </span>
              {r.lang && (
                <span className="inline-flex items-center gap-1.5 text-[11px] mono uppercase tracking-widest text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                  <span className="w-3.5 h-3.5 text-amber-600">
                    {I.globe}
                  </span>
                  Traducido
                </span>
              )}
            </div>
            <div className="flex text-amber-500 mb-3">
              {[0, 1, 2, 3, 4].map((s) => (
                <span key={s} className="w-4 h-4">
                  {I.star}
                </span>
              ))}
            </div>
            <p className="text-navy-800 text-[17px] leading-relaxed flex-1">
              {r.text}
            </p>
            <div className="mt-6 pt-5 border-t border-amber-500/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-700 font-semibold grid place-items-center border-2 border-amber-500/50 text-sm">
                {r.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="leading-tight">
                <div className="text-navy-900 font-medium">
                  {r.name}
                </div>
                <div className="text-sm text-navy-700/70">
                  {r.role}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Reviews;
