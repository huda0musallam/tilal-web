// الختم الكامل: للهيرو والفوتر والمنتجات
type Props = { className?: string; ink?: string };

export default function StampLogo({ className, ink = "#3B2618" }: Props) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      className={className}
      role="img"
      aria-label="ختم التلال - Tilal Coffee"
    >
      {/* حلقات الختم */}
      <circle
        cx="600"
        cy="600"
        r="520"
        fill="none"
        stroke={ink}
        strokeWidth={18}
      />
      <circle
        cx="600"
        cy="600"
        r="485"
        fill="none"
        stroke={ink}
        strokeWidth={7}
      />

      {/* التلال */}
      <path
        d="M250 350 L420 245 L505 300 L610 185 L770 300 L835 265 L970 360
           L820 320 L765 350 L610 245 L505 350 L420 295 Z"
        fill={ink}
      />
      <path
        d="M300 365 L420 315 L505 365 L610 270 L760 365 L835 320 L920 365"
        fill="none"
        stroke={ink}
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* الاسم بالعربي */}
      <text
        x="600"
        y="665"
        textAnchor="middle"
        fontSize="220"
        fill={ink}
        style={{ fontFamily: "var(--font-display)" }}
      >
        التلال
      </text>

      {/* الاسم بالإنجليزي */}
      <text
        x="600"
        y="770"
        textAnchor="middle"
        fontSize="58"
        letterSpacing="13"
        fill={ink}
        style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}
      >
        TILAL COFFEE
      </text>

      {/* خط زخرفي */}
      <path
        d="M390 830 H520 M680 830 H810"
        stroke={ink}
        strokeWidth={8}
        strokeLinecap="round"
      />

      {/* حبة البن والورق */}
      <path
        d="M455 900 C390 865 345 895 365 940 C385 985 445 1000 490 955 Z"
        fill={ink}
      />
      <path
        d="M745 900 C810 865 855 895 835 940 C815 985 755 1000 710 955 Z"
        fill={ink}
      />
      <path
        d="M600 855 C525 880 500 955 555 1015 C580 1040 620 1040 645 1015 C700 955 675 880 600 855 Z"
        fill={ink}
      />
      <path
        d="M590 885 C565 930 565 970 610 1015"
        fill="none"
        stroke="#E8D8C0"
        strokeWidth={17}
        strokeLinecap="round"
      />
    </svg>
  );
}
