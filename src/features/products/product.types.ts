export type Roast = "light" | "medium" | "dark";

export type Weight = "250" | "500" | "1000";

export type Cardamom = "none" | "normal" | "extra";

export interface Product {
  id: string;
  name: string;
  origin: string;
  roast: Roast;
  image: string;
  notes: string;
  prices: Record<Weight, number>;
  cardamom: boolean;
  featured: boolean;
}
