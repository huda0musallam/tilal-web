import { cva } from "class-variance-authority";
import { cn } from "@/lib/cn";
import type { Option } from "@/lib/option";
import { focusRingClass } from "./shared-classes";

export const chipStyles = cva(
  cn("rounded-pill border transition-colors duration-200", focusRingClass),
  {
    variants: {
      size: {
        sm: "bg-transparent px-3.5 py-1.5 text-sm font-normal",
        md: "bg-surface px-4.5 py-2 font-medium",
      },
      active: {
        true: "border-inverse-surface bg-inverse-surface text-on-inverse hover:border-inverse-surface",
        false: "border-line text-muted-ink hover:border-accent",
      },
    },
    defaultVariants: {
      size: "md",
      active: false,
    },
  },
);

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
    <div
      className={cn("flex flex-wrap", size === "sm" ? "gap-1.5" : "gap-2")}
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={chipStyles({ size, active: value === o.value })}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
