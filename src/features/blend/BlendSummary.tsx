"use client";

import { useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cart } from "@/features/cart/cart.store";
import { flyTo } from "@/features/fly/fly-store";
import {
  cardamomLabel,
  roastImage,
  roastLabel,
  weightLabel,
} from "@/features/products/product.options";
import { formatPrice } from "@/shared/lib/format-price";
import type { Bean } from "./bean.types";
import { useBlendStore, useShares } from "./blend-store";
import { blendPrice, selectedBeans, sharesSum } from "./blend.logic";
import { beanColor, grindLabel } from "./blend.options";
import type { BlendChoice } from "./blend.types";
import styles from "./BlendSummary.module.css";

interface BlendSummaryProps {
  beans: Bean[];
}

export default function BlendSummary({ beans }: BlendSummaryProps) {
  const total = useBlendStore((s) => s.total);
  const roast = useBlendStore((s) => s.roast);
  const grind = useBlendStore((s) => s.grind);
  const cardamom = useBlendStore((s) => s.cardamom);
  const shares = useShares(beans);
  const [added, setAdded] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);

  const choice: BlendChoice = { total, shares, roast, grind, cardamom };
  const selected = selectedBeans(beans, shares);
  const isValid = selected.length > 0 && sharesSum(shares) === 100;
  const price = blendPrice(choice, beans);

  const stops: string[] = [];
  let acc = 0;
  for (const b of selected) {
    const start = acc;
    acc += shares[b.id];
    stops.push(`${beanColor(beans, b.id)} ${start}% ${acc}%`);
  }
  if (acc < 100) stops.push(`var(--sand) ${acc}% 100%`);
  const ringStyle = { background: `conic-gradient(${stops.join(", ")})` };

  function handleAdd() {
    if (!isValid) return;
    cart.add({ blend: choice, qty: 1 });
    flyTo("cart", roastImage(roast), ringRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <aside className={styles.summary} aria-label="ملخص الخلطة">
      <h2 className={styles.summaryTitle}>خلطتك</h2>

      <div ref={ringRef} className={styles.ring} style={ringStyle}>
        <span className={styles.ringText}>{weightLabel(total)}</span>
      </div>

      <ul className={styles.legend}>
        {selected.map((b) => (
          <li key={b.id}>
            <i className={styles.swatch} style={{ background: beanColor(beans, b.id) }} />
            {b.name} {shares[b.id]}%
          </li>
        ))}
      </ul>

      <dl className={styles.details}>
        <div>
          <dt>التحميص</dt>
          <dd>{roastLabel(roast)}</dd>
        </div>
        <div>
          <dt>الطحنة</dt>
          <dd>{grindLabel(grind)}</dd>
        </div>
        <div>
          <dt>الهيل</dt>
          <dd>{cardamomLabel(cardamom)}</dd>
        </div>
      </dl>

      <div className={styles.priceRow}>
        <span>السعر</span>
        <strong>{formatPrice(price)}</strong>
      </div>

      <button
        type="button"
        className={`btn btn-primary ${styles.add}`}
        onClick={handleAdd}
        disabled={!isValid}
      >
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        {added ? "انضافت خلطتك" : "أضف خلطتي للسلة"}
      </button>
      {!isValid && <p className={styles.addHint}>كمّل اختيار البن لتقدر تضيف الخلطة.</p>}
    </aside>
  );
}
