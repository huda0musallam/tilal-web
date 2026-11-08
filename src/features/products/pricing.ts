import type { Cardamom, Product, Weight } from "./product.types";

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

export function cardamomCost(cardamom: Cardamom, grams: number) {
  return CARDAMOM_PER_250[cardamom] * (grams / 250);
}
