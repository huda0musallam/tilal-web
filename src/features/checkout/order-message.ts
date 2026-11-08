import { formatPrice } from "@/shared/lib/format-price";
import type { CartItem } from "@/features/cart/cart.types";
import { DELIVERY_OPTIONS, type CheckoutValues } from "./checkout.schema";

export function buildOrderMessage(items: CartItem[], total: number, customer: CheckoutValues) {
  const lines = ["مرحبا، بدي أطلب من قهوة التلال:", ""];

  items.forEach((item, i) => {
    lines.push(`${i + 1}. ${item.name}`);
    if (item.details.length) lines.push(`   ${item.details.join(" · ")}`);
    lines.push(
      `   ${item.qty} × ${formatPrice(item.unitPrice)} = ${formatPrice(item.unitPrice * item.qty)}`,
    );
    lines.push("");
  });

  const delivery = DELIVERY_OPTIONS.find((o) => o.value === customer.delivery)?.label;

  lines.push(`المجموع: ${formatPrice(total)}`);
  lines.push("");
  lines.push(`الاسم: ${customer.name}`);
  lines.push(`التلفون: ${customer.phone}`);
  if (delivery) lines.push(`الاستلام: ${delivery}`);
  if (customer.delivery === "delivery") lines.push(`العنوان: ${customer.address}`);
  if (customer.notes) lines.push(`ملاحظات: ${customer.notes}`);

  return lines.join("\n");
}
