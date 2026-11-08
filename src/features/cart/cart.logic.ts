import { blendDetails, blendPrice, BLEND_NAME, hasAllBeans } from "@/features/blend/blend.logic";
import { productPrice } from "@/features/products/pricing";
import { cardamomDetail, roastImage, weightLabel } from "@/features/products/product.options";
import type { BlendLine, CartItem, CartLine, Catalog } from "./cart.types";

const isBlendLine = (line: CartLine): line is BlendLine => "blend" in line;

function lineKey(line: CartLine) {
  if (!isBlendLine(line)) return `${line.productId}-${line.weight}-${line.cardamom}`;
  const { total, roast, grind, cardamom, shares } = line.blend;
  const mix = Object.keys(shares)
    .sort()
    .map((id) => `${id}${shares[id]}`)
    .join("-");
  return `blend-${total}-${roast}-${grind}-${cardamom}-${mix}`;
}

export function addLine(lines: readonly CartLine[], line: CartLine): CartLine[] {
  const key = lineKey(line);
  const exists = lines.some((l) => lineKey(l) === key);
  if (!exists) return [...lines, line];
  return lines.map((l) => (lineKey(l) === key ? { ...l, qty: l.qty + line.qty } : l));
}

export function removeLine(lines: readonly CartLine[], key: string): CartLine[] {
  return lines.filter((l) => lineKey(l) !== key);
}

export function setQty(lines: readonly CartLine[], key: string, qty: number): CartLine[] {
  if (!Number.isInteger(qty) || qty < 1) return removeLine(lines, key);
  return lines.map((l) => (lineKey(l) === key ? { ...l, qty } : l));
}

export function cartCount(lines: readonly CartLine[]) {
  let count = 0;
  for (const l of lines) count += l.qty;
  return count;
}

function resolveLine(line: CartLine, catalog: Catalog): CartItem | null {
  const key = lineKey(line);

  if (isBlendLine(line)) {
    if (!hasAllBeans(line.blend, catalog.beans)) return null;
    return {
      key,
      name: BLEND_NAME,
      image: roastImage(line.blend.roast),
      details: blendDetails(line.blend, catalog.beans),
      unitPrice: blendPrice(line.blend, catalog.beans),
      qty: line.qty,
    };
  }

  const product = catalog.products.find((p) => p.id === line.productId);
  if (!product) return null;
  return {
    key,
    name: product.name,
    image: product.image,
    details: product.cardamom
      ? [weightLabel(line.weight), cardamomDetail(line.cardamom)]
      : [weightLabel(line.weight)],
    unitPrice: productPrice(product, line.weight, line.cardamom),
    qty: line.qty,
  };
}

export function resolveLines(lines: readonly CartLine[], catalog: Catalog) {
  const items: CartItem[] = [];
  for (const line of lines) {
    const item = resolveLine(line, catalog);
    if (item) items.push(item);
  }
  return items;
}

export const lineTotal = (item: CartItem) => item.unitPrice * item.qty;

export function cartTotal(items: readonly CartItem[]) {
  let total = 0;
  for (const item of items) total += lineTotal(item);
  return total;
}

export function keepKnownProducts(lines: readonly CartLine[], productIds: readonly string[]) {
  return lines.filter((l) => isBlendLine(l) || productIds.includes(l.productId));
}

export function keepKnownBeans(lines: readonly CartLine[], beanIds: readonly string[]) {
  return lines.filter(
    (l) => !isBlendLine(l) || Object.keys(l.blend.shares).every((id) => beanIds.includes(id)),
  );
}
