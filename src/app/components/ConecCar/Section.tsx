// ConecCar.rent — Contenedor de sección reutilizable
import { cn } from "@/app/components/ui/utils";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({
  id,
  eyebrow,
  title,
  kicker,
  children,
  className = "",
}: SectionProps) => (
  <section
    id={id}
    className={cn("py-20 md:py-28 bg-white", className)}
  >
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      {(eyebrow || title) && (
        <div className="max-w-3xl mb-12 md:mb-14">
          {eyebrow && (
            <div className="flex items-center gap-2 text-amber-600 mb-3">
              <span className="h-px w-8 bg-amber-500" />
              <span className="mono uppercase tracking-widest">
                {eyebrow}
              </span>
            </div>
          )}
          {title && (
            <>
              <h2 className="font-display text-4xl md:text-5xl font-semibold text-navy-900 leading-[1.1]">
                {title}
              </h2>
              <span className="block h-[3px] w-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mt-5" />
            </>
          )}
          {kicker && (
            <p className="text-navy-700/70 text-lg mt-5 max-w-2xl">
              {kicker}
            </p>
          )}
        </div>
      )}
      {children}
    </div>
  </section>
);

export default Section;
