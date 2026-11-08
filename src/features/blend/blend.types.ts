import type { Cardamom, Roast, Weight } from "@/features/products/product.types";

export type Grind = "whole" | "arabic" | "filter" | "moka" | "turkish";

export type Shares = Record<string, number>;

export interface BlendChoice {
  total: Weight;
  shares: Shares;
  roast: Roast;
  grind: Grind;
  cardamom: Cardamom;
}
