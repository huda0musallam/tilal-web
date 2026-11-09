import { cn } from "@/lib/cn";
import type { Option } from "@/lib/option";
import Button from "./Button";

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
        <Button
          key={o.value}
          variant={value === o.value ? "chipSelected" : "chip"}
          size={size === "sm" ? "chipSm" : "chip"}
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
        >
          {o.label}
        </Button>
      ))}
    </div>
  );
}
