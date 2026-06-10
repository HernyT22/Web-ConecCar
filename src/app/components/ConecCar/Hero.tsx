// ConecCar.rent — Hero
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { I } from "@/app/components/ConecCar/Icons";
import heroCordillera from "@/imports/hero-cordillera-mendoza.jpg";

const Hero = () => (
  <section
    id="top"
    className="relative overflow-hidden bg-gradient-to-b from-navy-900 to-white text-white"
  >
    <div className="absolute inset-0">
      <ImageWithFallback
        src={heroCordillera}
        alt="Ruta hacia la cordillera de los Andes en Mendoza"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-navy-950/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
    </div>

    <div className="relative mx-auto max-w-7xl px-5 md:px-8 pt-20 md:pt-28 pb-40 md:pb-48">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="mono uppercase tracking-widest">
            Movilidad premium en Mendoza
          </span>
        </div>
        <h1 className="font-display text-[42px] sm:text-6xl md:text-7xl font-semibold leading-[1.02] mt-6">
          Conectados
          <br />
          <span className="text-amber-500">a tu destino.</span>
        </h1>
        <p className="text-white/75 text-lg md:text-xl mt-6 max-w-xl">
          Movilidad Inteligente para cada destino
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href="#fleet"
            className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-navy-950 font-medium px-6 py-3.5 rounded-full transition"
          >
            Reservar Ahora {I.arrow}
          </a>
          <a
            href="https://wa.me/5492615346953"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur text-white font-medium px-6 py-3.5 rounded-full transition"
          >
            Hablar con un asesor
          </a>
        </div>

        <div className="mt-12 flex items-center gap-6 text-sm text-white/70">
          <div className="flex items-center gap-2 text-white">
            <span className="w-4 h-4 text-amber-500">
              {I.clock}
            </span>
            <span>
              <strong>Atención 24/7</strong>
            </span>
          </div>
          <span className="hidden sm:block w-px h-4 bg-white/20" />
          <span className="hidden sm:block">
            Entrega en aeropuerto, hoteles y oficina propia.
          </span>
        </div>
      </div>
    </div>

    {/* franja de búsqueda/reserva */}
    <div className="relative mx-auto max-w-6xl px-5 md:px-8 -mb-10 md:-mb-12 translate-y-10 md:translate-y-12"></div>
  </section>
);

export default Hero;