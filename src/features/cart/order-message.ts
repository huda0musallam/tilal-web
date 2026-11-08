import { formatPrice } from "@/shared/lib/format-price";
import type { CartItem } from "./cart.types";

export function buildOrderMessage(
  items: CartItem[],
  total: number,
  customer: { name?: string; notes?: string },
) {
  const lines = ["مرحبا، بدي أطلب من قهوة التلال:", ""];

  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name}`);
    if (item.details.length) lines.push(`   ${item.details.join(" · ")}`);
    lines.push(
      `   ${item.qty} × ${formatPrice(item.unitPrice)} = ${formatPrice(item.unitPrice * item.qty)}`,
    );
    lines.push("");
  });

  lines.push(`المجموع: ${formatPrice(total)}`);
  if (customer.name) lines.push(`الاسم: ${customer.name}`);
  if (customer.notes) lines.push(`ملاحظات: ${customer.notes}`);

  return lines.join("\n");
}
