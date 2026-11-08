import { cardamomCost } from "@/features/products/pricing";
import { cardamomDetail, roastLabel, weightLabel } from "@/features/products/product.options";
import type { Bean } from "./bean.types";
import { grindLabel } from "./blend.options";
import type { BlendChoice, Shares } from "./blend.types";

export const BLEND_NAME = "خلطتي الخاصة";

export function selectedBeans(beans: readonly Bean[], shares: Shares) {
  return beans.filter((b) => b.id in shares);
}

export function sharesSum(shares: Shares) {
  let sum = 0;
  for (const value of Object.values(shares)) sum += value;
  return sum;
}

export function blendPrice(choice: BlendChoice, beans: readonly Bean[]) {
  const grams = Number(choice.total);
  let beansCost = 0;
  for (const b of selectedBeans(beans, choice.shares)) {
    beansCost += b.pricePerGram * grams * (choice.shares[b.id] / 100);
  }
  return Math.round((beansCost + cardamomCost(choice.cardamom, grams)) * 100) / 100;
}

export function mixLabel(beans: readonly Bean[], shares: Shares) {
  return selectedBeans(beans, shares)
    .map((b) => `${b.name} ${shares[b.id]}%`)
    .join(" · ");
}

export function blendDetails(choice: BlendChoice, beans: readonly Bean[]) {
  return [
    weightLabel(choice.total),
    mixLabel(beans, choice.shares),
    `تحميص ${roastLabel(choice.roast)}`,
    `طحنة ${grindLabel(choice.grind)}`,
    cardamomDetail(choice.cardamom),
  ];
}

export function hasAllBeans(choice: BlendChoice, beans: readonly Bean[]) {
  return Object.keys(choice.shares).every((id) => beans.some((b) => b.id === id));
}
