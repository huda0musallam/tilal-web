import type { Option } from "@/shared/lib/option";
import type { Cardamom, Product, Roast, Weight } from "./product.types";

interface RoastOption extends Option<Roast> {
  level: number;
  image: string;
}

interface CardamomOption extends Option<Cardamom> {
  detail: string;
}

export const ROAST_OPTIONS: readonly RoastOption[] = [
  { value: "light", label: "شقرا", level: 1, image: "/images/bag-light.webp" },
  { value: "medium", label: "وسط", level: 2, image: "/images/bag-medium.webp" },
  { value: "dark", label: "غامقة", level: 3, image: "/images/bag-dark.webp" },
];

export const WEIGHT_OPTIONS: readonly Option<Weight>[] = [
  { value: "250", label: "250 غ" },
  { value: "500", label: "500 غ" },
  { value: "1000", label: "1 كغ" },
];

export const CARDAMOM_OPTIONS: readonly CardamomOption[] = [
  { value: "none", label: "بدون", detail: "بدون هيل" },
  { value: "normal", label: "هيل", detail: "مع هيل" },
  { value: "extra", label: "زيادة هيل", detail: "زيادة هيل" },
];

export const ROAST_LEVELS = ROAST_OPTIONS.length;

const ORIGIN_LABELS: Record<string, string> = {
  brazil: "برازيلي",
  colombia: "كولومبي",
};

export const roastOption = (roast: Roast) => ROAST_OPTIONS.find((o) => o.value === roast);
export const roastLabel = (roast: Roast) => roastOption(roast)?.label ?? roast;
export const roastImage = (roast: Roast) => roastOption(roast)?.image ?? "";
export const weightLabel = (weight: Weight) =>
  WEIGHT_OPTIONS.find((o) => o.value === weight)?.label ?? weight;
export const cardamomLabel = (cardamom: Cardamom) =>
  CARDAMOM_OPTIONS.find((o) => o.value === cardamom)?.label ?? cardamom;
export const cardamomDetail = (cardamom: Cardamom) =>
  CARDAMOM_OPTIONS.find((o) => o.value === cardamom)?.detail ?? cardamom;
export const originLabel = (origin: string) => ORIGIN_LABELS[origin] ?? origin;

export function originOptions(products: readonly Product[]): Option<string>[] {
  const origins: string[] = [];
  for (const p of products) {
    if (!origins.includes(p.origin)) origins.push(p.origin);
  }
  return origins.map((value) => ({ value, label: originLabel(value) }));
}
