interface BeanProps {
  size: number;
}

export default function Bean({ size }: BeanProps) {
  return (
    <svg viewBox="0 0 20 28" width={size} height={size * 1.4} aria-hidden="true">
      <ellipse cx="10" cy="14" rx="9" ry="13" fill="#6B4430" />
      <path
        d="M10 2 C6 9, 14 19, 10 26"
        fill="none"
        stroke="#3B2618"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
