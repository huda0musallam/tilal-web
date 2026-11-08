import Image from "next/image";
import type { CartItem } from "@/features/cart/cart.types";
import { lineTotal } from "@/features/cart/cart.logic";
import { formatPrice } from "@/shared/lib/format-price";

interface OrderSummaryProps {
  items: CartItem[];
  total: number;
}

export default function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <aside aria-label="ملخص الطلب" className="rounded-2xl bg-secondary p-6">
      <h2 className="mb-4 text-2xl">طلبك</h2>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.key} className="flex items-start gap-3">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-background">
              <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-foreground">{item.name}</p>
              <p className="text-sm leading-relaxed">{item.details.join(" · ")}</p>
              <p className="text-sm">
                {item.qty} × {formatPrice(item.unitPrice)}
              </p>
            </div>
            <span className="font-bold text-foreground">{formatPrice(lineTotal(item))}</span>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between border-0 border-t border-dashed border-border pt-4 text-lg">
        <span>المجموع</span>
        <strong className="text-foreground">{formatPrice(total)}</strong>
      </div>
    </aside>
  );
}
