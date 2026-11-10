"use client";

import { useRef, useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { cart } from "@/features/cart/cart.store";
import { flyTo } from "@/features/fly/fly.store";
import { cardamomLabel, roastImage, weightLabel } from "@/features/products/product.options";
import RoastBadge from "@/features/products/RoastBadge";
import Button from "@/components/ui/Button";
import { cardStyles } from "@/components/ui/Card";
import { dashedRowStyles } from "@/components/ui/DashedRow";
import Donut from "@/components/ui/Donut";
import SideColumn from "@/components/ui/SideColumn";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";
import type { Bean } from "./bean.types";
import { useBlendStore, useShares } from "./blend.store";
import { blendPrice, selectedBeans, sharesSum } from "./blend.logic";
import { beanColor, grindLabel } from "./blend.options";
import { swatchClass } from "./blend.classes";
import type { BlendChoice } from "./blend.types";

const detailRowClass = "flex justify-between";
const detailValueClass = "font-bold text-ink";

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
  if (acc < 100) stops.push(`var(--line) ${acc}% 100%`);
  const ringStyle = { background: `conic-gradient(${stops.join(", ")})` };

  function handleAdd() {
    if (!isValid) return;
    cart.add({ blend: choice, qty: 1 });
    flyTo("cart", roastImage(roast), ringRef.current);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <SideColumn
      className={cn(
        cardStyles({ radius: "media", padding: "none", bordered: false }),
        "justify-items-center p-7",
      )}
      aria-label="ملخص الخلطة"
    >
      <h2 className="text-3xl">خلطتك</h2>

      <Donut ref={ringRef} style={ringStyle}>
        {weightLabel(total)}
      </Donut>

      <ul className="flex list-none flex-wrap justify-center gap-x-4 gap-y-2 text-sm text-muted-ink">
        {selected.map((b) => (
          <li key={b.id} className="flex items-center gap-1.5">
            <i className={swatchClass} style={{ background: beanColor(beans, b.id) }} />
            {b.name} {shares[b.id]}%
          </li>
        ))}
      </ul>

      <dl className={cn(dashedRowStyles({ sides: "block" }), "w-full gap-2")}>
        <div className={detailRowClass}>
          <dt className="text-muted-ink">التحميص</dt>
          <dd className={detailValueClass}>
            <RoastBadge roast={roast} />
          </dd>
        </div>
        <div className={detailRowClass}>
          <dt className="text-muted-ink">الطحنة</dt>
          <dd className={detailValueClass}>{grindLabel(grind)}</dd>
        </div>
        <div className={detailRowClass}>
          <dt className="text-muted-ink">الهيل</dt>
          <dd className={detailValueClass}>{cardamomLabel(cardamom)}</dd>
        </div>
      </dl>

      <div className="flex w-full items-baseline justify-between text-lg">
        <span>السعر</span>
        <strong className="text-2xl text-ink">{formatPrice(price)}</strong>
      </div>

      <Button className="w-full" onClick={handleAdd} disabled={!isValid}>
        {added ? <Check size={18} /> : <ShoppingBag size={18} />}
        {added ? "انضافت خلطتك" : "أضف خلطتي للسلة"}
      </Button>
      {!isValid && <p className="text-center text-xs">كمّل اختيار البن لتقدر تضيف الخلطة.</p>}
    </SideColumn>
  );
}
