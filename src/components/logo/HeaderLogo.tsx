// شعار الهيدر: التلال + TILAL COFFEE
type Props = { className?: string };

export default function HeaderLogo({ className }: Props) {
  return (
    <svg
      viewBox="125 0 190 150"
      className={className}
      role="img"
      aria-label="التلال - Tilal Coffee"
    >
      {/* التلال */}
      <g
        fill="none"
        stroke="#3B2618"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M145 35 L190 10 L218 25 L250 2 L294 34" strokeWidth={5} />
        <path d="M160 36 L190 24 L218 34 L250 15 L280 36" strokeWidth={2.5} />
      </g>

      {/* الاسم بالعربي */}
      <text
        x="220"
        y="88"
        textAnchor="middle"
        fontSize="54"
        fill="#3B2618"
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        التلال
      </text>

      {/* الاسم بالإنجليزي */}
      <text
        x="220"
        y="116"
        textAnchor="middle"
        fontSize="15"
        letterSpacing="4.5"
        fill="#7A4A2A"
        style={{ fontFamily: "var(--font-body)" }}
      >
        TILAL COFFEE
      </text>

      {/* حبة البن والورق */}
      <g fill="#7A4A2A">
        <path d="M209 132 C197 126 194 136 202 142 C208 146 214 140 209 132 Z" />
        <path d="M231 132 C243 126 246 136 238 142 C232 146 226 140 231 132 Z" />
        <path d="M220 126 C211 132 212 143 220 147 C228 143 229 132 220 126 Z" />
      </g>
    </svg>
  );
}
