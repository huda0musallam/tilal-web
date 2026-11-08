"use client";

import Link from "next/link";
import { useCartItems } from "@/features/cart/use-cart-items";
import EmptyState from "@/shared/ui/EmptyState";
import { Button } from "@/shared/ui/shadcn/button";
import CheckoutForm from "./CheckoutForm";
import OrderSummary from "./OrderSummary";

export default function Checkout() {
  const { hasLines, ready, failed, items, total, retry } = useCartItems();

  if (!hasLines || (ready && items.length === 0)) {
    return (
      <EmptyState title="سلتك فاضية لهلق.">
        <Link href="/products" className="btn btn-primary">
          تسوّق القهوة
        </Link>
      </EmptyState>
    );
  }

  if (failed && !ready) {
    return (
      <EmptyState title="ما قدرنا نجيب تفاصيل سلتك هلق.">
        <Button type="button" variant="outline" onClick={retry}>
          جرّب مرة تانية
        </Button>
      </EmptyState>
    );
  }

  if (!ready) {
    return <EmptyState title="عم نجيب تفاصيل سلتك..." />;
  }

  return (
    <div className="grid gap-8 min-[900px]:grid-cols-[3fr_2fr] min-[900px]:items-start">
      <CheckoutForm items={items} total={total} />
      <OrderSummary items={items} total={total} />
    </div>
  );
}
