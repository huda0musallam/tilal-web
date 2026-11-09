import type { Option } from "@/lib/option";
import styles from "./Chips.module.css";

interface ChipsProps<T extends string> {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  size?: "sm" | "md";
}

export default function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
  size = "md",
}: ChipsProps<T>) {
  return (
    <div className={`${styles.chips} ${styles[size]}`} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`${styles.chip} ${value === o.value ? styles.active : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
