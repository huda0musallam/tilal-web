"use client";

import { useState, type RefObject } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cart } from "@/features/cart/cart.store";
import { flyTo } from "@/features/fly/fly.store";
import { formatPrice } from "@/lib/format-price";
import Button from "@/components/ui/Button";
import Chips from "@/components/ui/Chips";
import { productPrice } from "./pricing";
import { CARDAMOM_OPTIONS, WEIGHT_OPTIONS } from "./product.options";
import type { Cardamom, Product, Weight } from "./product.types";

const legendClass = "mb-1.5 text-xs font-medium text-muted-ink";

interface ProductPurchaseProps {
  product: Product;
  sourceRef: RefObject<HTMLElement | null>;
}

export default function ProductPurchase({ product, sourceRef }: ProductPurchaseProps) {
  const [weight, setWeight] = useState<Weight>("250");
  const [cardamom, setCardamom] = useState<Cardamom>("none");
  const [added, setAdded] = useState(false);

  const price = productPrice(product, weight, cardamom);

  function handleAdd() {
    cart.add({ productId: product.id, weight, cardamom, qty: 1 });
    flyTo("cart", product.image, sourceRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <>
      <fieldset>
        <legend className={legendClass}>الوزن</legend>
        <Chips
          options={WEIGHT_OPTIONS}
          value={weight}
          onChange={setWeight}
          label="الوزن"
          size="sm"
        />
      </fieldset>

      {product.cardamom && (
        <fieldset>
          <legend className={legendClass}>الهيل</legend>
          <Chips
            options={CARDAMOM_OPTIONS}
            value={cardamom}
            onChange={setCardamom}
            label="الهيل"
            size="sm"
          />
        </fieldset>
      )}

      <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-line pt-4">
        <span className="text-2xl font-bold text-ink">{formatPrice(price)}</span>
        <Button className="px-4.5 py-2.5" onClick={handleAdd}>
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {added ? "انضافت" : "أضف للسلة"}
        </Button>
      </div>
    </>
  );
}
