import type { Cardamom, Product, Weight } from "@/types";

// سعر الهيل الإضافي لكل 250 غ
const CARDAMOM_PER_250: Record<Cardamom, number> = {
  none: 0,
  normal: 1,
  extra: 2,
};

export function productPrice(product: Product, weight: Weight, cardamom: Cardamom) {
  const base = product.prices[weight];
  const extra = CARDAMOM_PER_250[cardamom] * (Number(weight) / 250);
  return base + extra;
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(value);
}
// سعر الهيل لأي كمية بالغرام
export function cardamomCost(cardamom: Cardamom, grams: number) {
  return CARDAMOM_PER_250[cardamom] * (grams / 250);
}
