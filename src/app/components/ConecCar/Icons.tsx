// ConecCar.rent — Íconos compartidos
// Componente Icon base + colección I usada por toda la web.

/* ---------- Íconos ---------- */
interface IconProps {
  d: React.ReactNode;
  className?: string;
  stroke?: number;
  fill?: string;
}

export const Icon = ({
  d,
  className = "w-5 h-5",
  stroke = 1.6,
  fill = "none",
}: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {d}
  </svg>
);

export const I = {
  menu: (
    <Icon
      d={
        <>
          <path d="M3 6h18" />
          <path d="M3 12h18" />
          <path d="M3 18h18" />
        </>
      }
    />
  ),
  close: (
    <Icon
      d={
        <>
          <path d="M6 6l12 12" />
          <path d="M6 18L18 6" />
        </>
      }
    />
  ),
  arrow: (
    <Icon
      d={
        <>
          <path d="M5 12h14" />
          <path d="M13 5l7 7-7 7" />
        </>
      }
    />
  ),
  search: (
    <Icon
      d={
        <>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </>
      }
    />
  ),
  chevron: <Icon d={<path d="M6 9l6 6 6-6" />} />,
  pin: (
    <Icon
      d={
        <>
          <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" />
          <circle cx="12" cy="9" r="2.5" />
        </>
      }
    />
  ),
  clock: (
    <Icon
      d={
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </>
      }
    />
  ),
  shield: (
    <Icon
      d={
        <>
          <path d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3z" />
          <path d="M9 12l2 2 4-4" />
        </>
      }
    />
  ),
  globe: (
    <Icon
      d={
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18" />
          <path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </>
      }
    />
  ),
  star: (
    <Icon
      fill="currentColor"
      stroke="none"
      d={
        <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" />
      }
    />
  ),
  users: (
    <Icon
      d={
        <>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 14.5c2.8 0 5 2 5 5" />
        </>
      }
    />
  ),
  car: (
    <Icon
      d={
        <>
          <path d="M3 14l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 9l2 5" />
          <path d="M3 14h18v4a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1H6.5v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
          <circle cx="7.5" cy="17" r="0.6" />
          <circle cx="16.5" cy="17" r="0.6" />
        </>
      }
    />
  ),
  bag: (
    <Icon
      d={
        <>
          <path d="M5 7h14l-1 13H6L5 7z" />
          <path d="M9 7V5a3 3 0 0 1 6 0v2" />
        </>
      }
    />
  ),
  gear: (
    <Icon
      d={
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8L4.2 7a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
        </>
      }
    />
  ),
  fuel: (
    <Icon
      d={
        <>
          <path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
          <path d="M3 21h12" />
          <path d="M14 9h2.5L19 11.5V17a2 2 0 1 1-4 0" />
        </>
      }
    />
  ),
  snow: (
    <Icon
      d={
        <>
          <path d="M12 2v20" />
          <path d="M2 12h20" />
          <path d="M4.9 4.9l14.2 14.2" />
          <path d="M19.1 4.9L4.9 19.1" />
        </>
      }
    />
  ),
  phone: (
    <Icon
      d={
        <path d="M5 4h3l2 5-2 1a12 12 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z" />
      }
    />
  ),
  whatsapp: (
    <Icon
      d={
        <>
          <path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8 19.4l-4.5 1.1z" />
          <path d="M8.6 9.5c.3 1.6 1.4 3.1 2.9 4 1 .6 2 .9 2.7.4l.7-.7-1.6-1.6-.9.4a3.5 3.5 0 0 1-1.5-1.5l.4-.9L9.7 8l-.7.7c-.3.2-.4.5-.4.8z" />
        </>
      }
    />
  ),
  mail: (
    <Icon
      d={
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      }
    />
  ),
  instagram: (
    <Icon
      d={
        <>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17" cy="7" r="0.6" fill="currentColor" />
        </>
      }
    />
  ),
  facebook: (
    <Icon
      d={
        <path d="M14 22v-8h3l1-4h-4V7a2 2 0 0 1 2-2h2V1.5A21 21 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v8z" />
      }
    />
  ),
  linkedin: (
    <Icon
      d={
        <>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M8 10v7M8 7.5v.01M12 17v-4a2 2 0 1 1 4 0v4M12 13v4" />
        </>
      }
    />
  ),
  check: <Icon d={<path d="M5 12.5l4 4 10-10" />} />,
};
