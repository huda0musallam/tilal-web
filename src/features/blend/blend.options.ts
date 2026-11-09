import type { Option } from "@/lib/option";
import type { Grind } from "./blend.types";

export const GRIND_OPTIONS: readonly Option<Grind>[] = [
  { value: "whole", label: "حبوب كاملة" },
  { value: "arabic", label: "عربية" },
  { value: "filter", label: "فلتر / V60" },
  { value: "moka", label: "موكا" },
  { value: "turkish", label: "تركي ناعم" },
];

export const grindLabel = (grind: Grind) =>
  GRIND_OPTIONS.find((o) => o.value === grind)?.label ?? grind;

const BEAN_COLORS = ["var(--nescafe)", "var(--olive)", "var(--coffee)", "#d9b98f"];

export function beanColor(beans: readonly { id: string }[], id: string) {
  const index = beans.findIndex((b) => b.id === id);
  return BEAN_COLORS[Math.max(index, 0) % BEAN_COLORS.length];
}
