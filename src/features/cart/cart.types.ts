import type { BlendChoice } from "@/features/blend/blend.types";
import type { Bean } from "@/features/blend/bean.types";
import type { Cardamom, Product, Weight } from "@/features/products/product.types";

export interface ProductLine {
  productId: string;
  weight: Weight;
  cardamom: Cardamom;
  qty: number;
}

export interface BlendLine {
  blend: BlendChoice;
  qty: number;
}

export type CartLine = ProductLine | BlendLine;

export interface Catalog {
  products: readonly Product[];
  beans: readonly Bean[];
}

export interface CartItem {
  key: string;
  name: string;
  image: string;
  details: string[];
  unitPrice: number;
  qty: number;
}
