// ConecCar.rent — Nosotros
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";

const About = () => {
  const trust = [
    {
      icon: I.users,
      t: "Atención personalizada",
      s: "Trato cercano y directo. Sin complicaciones, desde la consulta hasta la entrega.",
    },
    {
      icon: I.globe,
      t: "Equipo trilingüe",
      s: "Atención en ES / EN / PT antes, durante y después de tu viaje.",
    },
    {
      icon: I.clock,
      t: "Asistencia 24/7",
      s: "Hablás con una persona real a cualquier hora.",
    },
    {
      icon: I.shield,
      t: "Transparencia total",
      s: "Sin letra chica, con procesos claros y acompañamiento en toda la experiencia.",
    },
  ];

  const benefits = [
    { icon: I.shield, t: "Sin costos ocultos" },
    { icon: I.pin, t: "Entrega en aeropuerto" },
    { icon: I.car, t: "Kilometraje libre" },
    { icon: I.clock, t: "Reserva online en minutos" },
  ];

  return (
    <Section
      id="about"
      eyebrow="Sobre ConecCar.rent"
      title="Una rentadora mendocina, pensada para viajar de verdad."
      className="bg-white"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="space-y-5 text-navy-700/85 text-[17px] leading-relaxed">
          <p>
            Coneccar.rent nació en Mendoza con una idea simple:{" "}
            <span className="text-amber-600 font-semibold">
              Hacer que alquilar un vehículo sea fácil, rápido y
              confiable.
            </span>
          </p>
          <p>
            Atención personalizada, vehículos cuidados y una
            experiencia pensada para que disfrutes el viaje
            desde el primer momento
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            {[
              "Fundada localmente",
              "Empresa familiar",
              "Flota seleccionada y cuidada",
              "Totalmente asegurado",
            ].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 text-xs bg-amber-500/10 text-navy-800 px-3 py-1.5 rounded-full border border-amber-500/30"
              >
                <span className="w-3.5 h-3.5 text-amber-600">
                  {I.check}
                </span>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {trust.map((c, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-navy-100 bg-white hover:border-amber-500/50 hover:shadow-[0_8px_30px_-12px_rgba(201,161,74,0.35)] p-5 lift transition"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/60 mb-4 group-hover:scale-[1.04] group-hover:bg-amber-500/15 transition-transform">
                {c.icon}
              </div>
              <div className="font-medium text-navy-900">
                {c.t}
              </div>
              <div className="text-sm text-navy-700/70 mt-1">
                {c.s}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* franja de beneficios incluidos — full width, adaptada a mobile */}
      <div className="mt-12 md:mt-16">
        {/* encabezado */}
        <div className="flex items-center gap-2 text-amber-600 mb-3">
          <span className="h-px w-8 bg-amber-500" />
          <span className="mono uppercase tracking-widest">
            Beneficios
          </span>
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-semibold text-navy-900 mb-6">
          Todo lo que incluye tu alquiler.
        </h3>

        {/* franja */}
        <div className="rounded-2xl overflow-hidden border border-amber-500/40 bg-amber-500/40">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px">
            {benefits.map((b) => (
              <div
                key={b.t}
                className="group flex items-center gap-3 bg-white px-4 py-5 hover:bg-amber-500/5 transition-colors"
              >
                <span className="w-10 h-10 shrink-0 rounded-xl bg-amber-500/10 text-amber-600 grid place-items-center border-2 border-amber-500/55 group-hover:bg-amber-500/15 group-hover:scale-[1.04] transition-transform">
                  <span className="w-5 h-5">{b.icon}</span>
                </span>
                <span className="text-[15px] font-medium text-navy-900 leading-tight">
                  {b.t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;