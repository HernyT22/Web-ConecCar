// ConecCar.rent — Imagen placeholder reutilizable

interface PlaceholderImgProps {
  label: string;
  className?: string;
  tone?: "light" | "dark" | "warm";
  aspect?: string;
}

const PlaceholderImg = ({
  label,
  className = "",
  tone = "light",
  aspect = "",
}: PlaceholderImgProps) => {
  const toneCls =
    tone === "dark"
      ? "placeholder-dark text-white/70"
      : tone === "warm"
        ? "placeholder-warm text-amber-600"
        : "placeholder-img text-navy-500";
  return (
    <div
      className={`relative overflow-hidden ${aspect} ${toneCls} ${className}`}
    >
      <div className="absolute inset-0 flex items-end p-3">
        <span className="mono uppercase">{label}</span>
      </div>
    </div>
  );
};

export default PlaceholderImg;
