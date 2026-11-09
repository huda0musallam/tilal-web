"use client";

import { useState, type RefObject } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cart } from "@/features/cart/cart.store";
import { flyTo } from "@/features/fly/fly.store";
import { formatPrice } from "@/lib/format-price";
import Chips from "@/components/ui/Chips";
import { productPrice } from "./pricing";
import { CARDAMOM_OPTIONS, WEIGHT_OPTIONS } from "./product.options";
import type { Cardamom, Product, Weight } from "./product.types";
import styles from "./ProductPurchase.module.css";

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
      <fieldset className={styles.group}>
        <legend className={styles.legend}>الوزن</legend>
        <Chips
          options={WEIGHT_OPTIONS}
          value={weight}
          onChange={setWeight}
          label="الوزن"
          size="sm"
        />
      </fieldset>

      {product.cardamom && (
        <fieldset className={styles.group}>
          <legend className={styles.legend}>الهيل</legend>
          <Chips
            options={CARDAMOM_OPTIONS}
            value={cardamom}
            onChange={setCardamom}
            label="الهيل"
            size="sm"
          />
        </fieldset>
      )}

      <div className={styles.footer}>
        <span className={styles.price}>{formatPrice(price)}</span>
        <button type="button" className={`btn btn-primary ${styles.add}`} onClick={handleAdd}>
          {added ? <Check size={18} /> : <ShoppingBag size={18} />}
          {added ? "انضافت" : "أضف للسلة"}
        </button>
      </div>
    </>
  );
}
