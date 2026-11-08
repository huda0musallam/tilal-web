import type { Option } from "@/features/products/product.options";
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
