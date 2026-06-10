// ConecCar.rent — Contacto
import Section from "@/app/components/ConecCar/Section";
import { I } from "@/app/components/ConecCar/Icons";

const Contact = () => (
  <Section id="contact" className="bg-navy-900 text-white">
    <div className="grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
      <div>
        <div className="flex items-center gap-2 text-amber-500 mb-3">
          <span className="h-px w-8 bg-amber-500" />
          <span className="mono uppercase tracking-widest">
            Contacto
          </span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05]">
          Tu vehículo en Mendoza está a un mensaje de distancia
        </h2>
        <p className="text-white/70 text-lg mt-5 max-w-lg">
          Consultanos disponibilidad, tarifas y opciones de
          entrega. Respondemos en menos de una hora.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="https://wa.me/5492615346953"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:brightness-110 text-navy-950 font-semibold px-6 py-4 rounded-full transition shadow-lg"
          >
            <span className="w-6 h-6">{I.whatsapp}</span>
            WhatsApp
          </a>
          <a
            href="https://wa.me/5492617596871"
            className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold px-6 py-4 rounded-full transition backdrop-blur"
          >
            <span className="w-5 h-5 text-[#25D366]">
              {I.whatsapp}
            </span>
            WhatsApp alternativo
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { i: I.mail, l: "hola@coneccar.rent" },
            {
              i: I.pin,
              l: "Primitivo de la Reta 928, Local 4 — Ciudad de Mendoza",
            },
          ].map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full text-sm"
            >
              <span className="text-amber-500">{c.i}</span>
              {c.l}
            </span>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3">
          <span className="mono uppercase text-white/50 tracking-widest mr-2">
            Seguinos
          </span>
          <a
            href="https://instagram.com/coneccar.rent"
            aria-label="Instagram"
            className="inline-flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full border border-white/20 hover:bg-white/10 transition text-sm"
          >
            <span className="w-5 h-5">{I.instagram}</span>
            @coneccar.rent
          </a>
        </div>
      </div>

      <div className="bg-white/5 border border-white/15 rounded-3xl p-6 md:p-8 backdrop-blur">
        <div className="font-display text-xl font-semibold">
          Pedinos que te llamemos
        </div>
        <p className="text-sm text-white/60 mt-1">
          Te contactamos dentro de la próxima hora.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {[
            ["Nombre completo", "Sofía Méndez", "contact-name"],
            ["Email", "vos@ejemplo.com", "contact-email"],
            [
              "Teléfono (con código de país)",
              "+1 415 555 0199",
              "contact-phone",
            ],
            ["Fecha de retiro", "22 de mayo de 2026", "contact-pickup-date"],
          ].map(([l, ph, id], i) => (
            <label key={i} htmlFor={id} className="block">
              <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
                {l}
              </span>
              <input
                id={id}
                className="mt-1.5 w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-amber-500 text-white"
                placeholder={ph}
              />
            </label>
          ))}
        </div>
        <label htmlFor="contact-notes" className="block mt-3">
          <span className="mono uppercase text-white/50 tracking-widest text-[10px]">
            Notas
          </span>
          <textarea
            id="contact-notes"
            rows={3}
            className="mt-1.5 w-full bg-white/10 border border-white/15 rounded-xl px-4 py-3 placeholder:text-white/30 focus:outline-none focus:border-amber-500 text-white"
            placeholder="Algo que tengamos que saber sobre tu viaje…"
          ></textarea>
        </label>
        <button className="mt-5 w-full bg-amber-500 hover:bg-amber-600 text-navy-950 font-semibold py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition">
          Enviar solicitud {I.arrow}
        </button>
      </div>
    </div>
  </Section>
);

export default Contact;