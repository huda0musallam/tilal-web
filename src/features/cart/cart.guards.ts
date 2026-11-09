import { isNumber, isOneOf, isRecord } from "@/lib/api/guards";
import { GRIND_OPTIONS } from "@/features/blend/blend.options";
import type { BlendChoice, Shares } from "@/features/blend/blend.types";
import {
  CARDAMOM_OPTIONS,
  ROAST_OPTIONS,
  WEIGHT_OPTIONS,
} from "@/features/products/product.options";
import type { BlendLine, CartLine, ProductLine } from "./cart.types";

const isWeight = isOneOf(WEIGHT_OPTIONS.map((o) => o.value));
const isRoast = isOneOf(ROAST_OPTIONS.map((o) => o.value));
const isCardamom = isOneOf(CARDAMOM_OPTIONS.map((o) => o.value));
const isGrind = isOneOf(GRIND_OPTIONS.map((o) => o.value));

const isQty = (v: unknown): v is number => Number.isInteger(v) && isNumber(v) && v >= 1;

function isShares(v: unknown): v is Shares {
  if (!isRecord(v)) return false;
  const values = Object.values(v);
  let sum = 0;
  for (const value of values) {
    if (!isNumber(value) || value < 0 || value > 100) return false;
    sum += value;
  }
  return values.length > 0 && sum === 100;
}

function isBlendChoice(v: unknown): v is BlendChoice {
  return (
    isRecord(v) &&
    isWeight(v.total) &&
    isShares(v.shares) &&
    isRoast(v.roast) &&
    isGrind(v.grind) &&
    isCardamom(v.cardamom)
  );
}

function isProductLine(v: unknown): v is ProductLine {
  return (
    isRecord(v) &&
    typeof v.productId === "string" &&
    isWeight(v.weight) &&
    isCardamom(v.cardamom) &&
    isQty(v.qty)
  );
}

function isBlendLine(v: unknown): v is BlendLine {
  return isRecord(v) && isBlendChoice(v.blend) && isQty(v.qty);
}

export function parseLines(v: unknown): CartLine[] {
  if (!Array.isArray(v)) return [];
  const lines: CartLine[] = [];
  for (const item of v) {
    if (isProductLine(item)) {
      lines.push({
        productId: item.productId,
        weight: item.weight,
        cardamom: item.cardamom,
        qty: item.qty,
      });
    } else if (isBlendLine(item)) {
      lines.push({ blend: item.blend, qty: item.qty });
    }
  }
  return lines;
}
