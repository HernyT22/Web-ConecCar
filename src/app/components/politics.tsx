// ConecCar.rent — Nosotros
import Section from "@/app/components/ConecCar/Section";



  return (
    <Section
      id="about"
      eyebrow="Sobre ConecCar.rent"
      title="Una rentadora mendocina, pensada para viajar de verdad."
      className="bg-white"
    >
      <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
        <div className="space-y-5 text-navy-700/85 text-[17px] leading-relaxed">
         <h2>SEGURO</h2>
          <p>
        Todos nuestros vehículos cuentan con cobertura vigente que incluye responsabilidad civil frente a terceros y protección ante diversos imprevistos durante el período de alquiler.
        Al momento de la entrega del vehículo se informarán las condiciones de cobertura, franquicias y responsabilidades del conductor.
        Es importante tener en cuenta que el seguro no cubre daños ocasionados por conducción bajo los efectos del alcohol o drogas, uso indebido o negligente del vehículo, participación en actividades no autorizadas, conductores no declarados en el contrato o la salida del país sin autorización previa de la empresa.
        En caso de accidente, robo o avería, el conductor deberá comunicarse de inmediato con nuestro equipo, realizar la denuncia policial cuando corresponda y seguir las instrucciones indicadas por la empresa y la aseguradora.

          </p>
          <h2>POLÍTICA DE CANCELACIÓN</h2>
          <p>
          Entendemos que los planes pueden cambiar. Por ello, las reservas pueden ser modificadas o reprogramadas comunicándose previamente con nuestro equipo.
          Las señas abonadas para confirmar una reserva no son reembolsables. Sin embargo, el importe podrá utilizarse como crédito para una futura reserva dentro de los 12 meses posteriores a la fecha de cancelación, sujeto a disponibilidad.
          Las solicitudes de modificación o reprogramación deberán realizarse con la mayor antelación posible para garantizar la disponibilidad del vehículo requerido.
          En caso de no presentarse a retirar el vehículo en la fecha y horario acordados sin previo aviso, la reserva podrá considerarse cancelada y el crédito quedará sujeto a evaluación por parte de la empresa.
          Para cualquier cambio o consulta sobre su reserva, nuestro equipo estará disponible para asistirlo.
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

export default Politics;