// ConecCar.rent — Medios de pago
import logoMP from "@/imports/logos/logomp.png";
import logoVisa from "@/imports/logos/visa.png";
import logoAmex from "@/imports/logos/amex.svg";
import iconTransferencia from "@/imports/logos/transferencia-bancaria.png";
import iconEfectivoARS from "@/imports/logos/dinero-argentino.png";
import iconEfectivoUSD from "@/imports/logos/billete-de-banco.png";

const Payments = () => {
  const methods = [
    {
      name: "Visa",
      icon: (
        <img
          src={logoVisa}
          alt="Visa"
          className="h-7 object-contain p-1"
        />
      ),
    },
    {
      name: "Mastercard",
      icon: (
        <svg viewBox="0 0 48 32" className="h-7 p-0.5">
          <rect fill="#252525" width="48" height="32" rx="3" />
          <circle cx="18" cy="16" r="9" fill="#EB001B" />
          <circle
            cx="30"
            cy="16"
            r="9"
            fill="#F79E1B"
            fillOpacity="0.9"
          />
          <path
            d="M24 8.9a9 9 0 0 1 0 14.2A9 9 0 0 1 24 8.9z"
            fill="#FF5F00"
          />
        </svg>
      ),
    },
    {
      name: "Amex",
      icon: (
        <img
          src={logoAmex}
          alt="American Express"
          className="h-7 object-contain p-1"
        />
      ),
    },
    {
      name: "Mercado Pago",
      icon: (
        <img
          src={logoMP}
          alt="Mercado Pago"
          className="h-6 object-contain p-1"
        />
      ),
    },
    {
      name: "Transferencia",
      icon: (
        <img
          src={iconTransferencia}
          alt="Transferencia bancaria"
          className="w-8 h-8 object-contain p-1"
        />
      ),
    },
    {
      name: "Efectivo ARS",
      icon: (
        <img
          src={iconEfectivoARS}
          alt="Efectivo ARS"
          className="w-8 h-8 object-contain p-1"
        />
      ),
    },
    {
      name: "Efectivo USD",
      icon: (
        <img
          src={iconEfectivoUSD}
          alt="Efectivo USD"
          className="w-8 h-8 object-contain p-1"
        />
      ),
    },
  ];

  return (
    <section className="py-14 bg-navy-50/40 border-y border-navy-100">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="md:w-1/4">
            <div className="mono uppercase text-amber-600 tracking-widest mb-1">
              Medios de pago
            </div>
            <div className="font-display text-2xl font-semibold text-navy-900">
              Pagá como prefieras.
            </div>
            <div className="text-sm text-navy-700/70 mt-1">
              Locales e internacionales. Aceptamos pagos en ARS
              y USD.
            </div>
          </div>
          <div className="md:w-3/4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {methods.map((m) => (
              <div
                key={m.name}
                className="bg-white rounded-xl border-2 border-amber-500/30 hover:border-amber-500/70 hover:bg-amber-500/5 hover:shadow-[0_4px_16px_-6px_rgba(201,161,74,0.4)] h-14 flex flex-col items-center justify-center text-navy-700 transition gap-1"
              >
                <div className="flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="mono uppercase tracking-widest text-center px-2 text-[9px]">
                  {m.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;
