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

export interface Bean {
  id: string;
  name: string;
  pricePerGram: number;
  notes: string;
}

export interface Review {
  id: string;
  name: string;
  text: string;
  rating: number;
}

export interface Suggestion {
  id?: string;
  name?: string;
  message: string;
  rating: number;
  createdAt: string;
}
export interface CartItem {
  key: string;
  name: string;
  image: string;
  details: string[];
  unitPrice: number;
  qty: number;
}
