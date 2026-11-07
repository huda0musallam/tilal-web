"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ShoppingBag } from "lucide-react";
import useSWR from "swr";
import { apiKeys, fetcher } from "@/lib/api";
import type { Bean, Cardamom, Roast, Weight } from "@/types";
import { cart } from "@/features/cart/cart-store";
import { cardamomCost, formatPrice } from "@/features/products/pricing";
import styles from "./BlendBuilder.module.css";

type Grind = "whole" | "arabic" | "filter" | "moka" | "turkish";
type Option<T> = { value: T; label: string };

const TOTALS: Option<Weight>[] = [
  { value: "250", label: "250 غ" },
  { value: "500", label: "500 غ" },
  { value: "1000", label: "1 كغ" },
];

const ROASTS: Option<Roast>[] = [
  { value: "light", label: "شقرا" },
  { value: "medium", label: "وسط" },
  { value: "dark", label: "غامقة" },
];

const GRINDS: Option<Grind>[] = [
  { value: "whole", label: "حبوب كاملة" },
  { value: "arabic", label: "عربية" },
  { value: "filter", label: "فلتر / V60" },
  { value: "moka", label: "موكا" },
  { value: "turkish", label: "تركي ناعم" },
];

const CARDAMOMS: Option<Cardamom>[] = [
  { value: "none", label: "بدون" },
  { value: "normal", label: "هيل" },
  { value: "extra", label: "زيادة هيل" },
];

const CARDAMOM_DETAIL: Record<Cardamom, string> = {
  none: "بدون هيل",
  normal: "مع هيل",
  extra: "زيادة هيل",
};

// لون ثابت لكل نوع بن بالدائرة
const COLORS = ["#B8865A", "#4F5A2E", "#5A3726", "#D9B98F"];

// صورة الكيس حسب التحميص
const BAG_BY_ROAST: Record<Roast, string> = {
  light: "/images/bag-light.jpg",
  medium: "/images/bag-medium.jpg",
  dark: "/images/bag-dark.jpg",
};

const labelOf = <T,>(options: Option<T>[], value: T) =>
  options.find((o) => o.value === value)?.label ?? "";

// نوزع 100% على الأنواع المختارة بخطوات 10%
function evenShares(ids: string[]) {
  const base = Math.floor(10 / ids.length) * 10;
  const extra = (100 - base * ids.length) / 10;
  const result: Record<string, number> = {};
  ids.forEach((id, i) => {
    result[id] = base + (i < extra ? 10 : 0);
  });
  return result;
}

// ===== مكونات صغيرة =====
function Step({
  n,
  title,
  hint,
  children,
}: {
  n: number;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className={styles.step}>
      <div className={styles.stepHead}>
        <span className={styles.num}>{n}</span>
        <div>
          <h2 className={styles.stepTitle}>{title}</h2>
          {hint && <p className={styles.hint}>{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

function Chips<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className={styles.chips} role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`${styles.chip} ${value === o.value ? styles.chipActive : ""}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// ===== الصفحة =====
export default function BlendBuilder() {
  // أنواع البن من SWR، والقيمة الأولية جاية من السيرفر
  const { data: beans = [] } = useSWR(apiKeys.beans, fetcher<Bean[]>, {
    suspense: true,
  });
  const [total, setTotal] = useState<Weight>("250");
  const [shares, setShares] = useState<Record<string, number>>(() =>
    beans.length > 0 ? { [beans[0].id]: 100 } : {},
  );
  const [roast, setRoast] = useState<Roast>("medium");
  const [grind, setGrind] = useState<Grind>("whole");
  const [cardamom, setCardamom] = useState<Cardamom>("none");
  const [added, setAdded] = useState(false);

  const grams = Number(total);
  const selected = beans.filter((b) => b.id in shares);
  const sum = selected.reduce((s, b) => s + shares[b.id], 0);
  const isValid = selected.length > 0 && sum === 100;

  function toggleBean(id: string) {
    const ids =
      id in shares ? Object.keys(shares).filter((x) => x !== id) : [...Object.keys(shares), id];
    setShares(ids.length > 0 ? evenShares(ids) : {});
  }

  function setShare(id: string, value: number) {
    setShares({ ...shares, [id]: value });
  }

  // السعر: كل نوع حسب غراماته + الهيل
  const beansCost = selected.reduce((s, b) => s + b.pricePerGram * grams * (shares[b.id] / 100), 0);
  const price = Math.round((beansCost + cardamomCost(cardamom, grams)) * 100) / 100;

  // ألوان الدائرة
  const stops: string[] = [];
  let acc = 0;
  for (const b of selected) {
    const start = acc;
    acc += shares[b.id];
    const color = COLORS[beans.indexOf(b) % COLORS.length];
    stops.push(`${color} ${start}% ${acc}%`);
  }
  if (acc < 100) stops.push(`var(--sand) ${acc}% 100%`);
  const ringStyle = {
    background: `conic-gradient(${stops.join(", ") || "var(--sand) 0 100%"})`,
  };

  const mixLabel = selected.map((b) => `${b.name} ${shares[b.id]}%`).join(" · ");

  function handleAdd() {
    if (!isValid) return;
    cart.add({
      key: `blend-${total}-${roast}-${grind}-${cardamom}-${selected
        .map((b) => `${b.id}${shares[b.id]}`)
        .join("-")}`,
      name: "خلطتي الخاصة",
      image: BAG_BY_ROAST[roast],
      details: [
        labelOf(TOTALS, total),
        mixLabel,
        `تحميص ${labelOf(ROASTS, roast)}`,
        `طحنة ${labelOf(GRINDS, grind)}`,
        CARDAMOM_DETAIL[cardamom],
      ],
      unitPrice: price,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className={styles.layout}>
      {/* ===== الخطوات ===== */}
      <div className={styles.steps}>
        <Step n={1} title="الكمية الكلية">
          <Chips options={TOTALS} value={total} onChange={setTotal} label="الكمية الكلية" />
        </Step>

        <Step n={2} title="أنواع البن" hint="اختار نوع أو أكتر، ووزّع النسب بينهم.">
          <div className={styles.beans}>
            {beans.map((b) => {
              const isOn = b.id in shares;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => toggleBean(b.id)}
                  aria-pressed={isOn}
                  className={`${styles.bean} ${isOn ? styles.beanOn : ""}`}
                >
                  <span className={styles.beanCheck} aria-hidden="true">
                    {isOn && <Check size={14} />}
                  </span>
                  <span className={styles.beanName}>{b.name}</span>
                  <span className={styles.beanNotes}>{b.notes}</span>
                  <span className={styles.beanPrice}>
                    {formatPrice(b.pricePerGram * 250)} / 250 غ
                  </span>
                </button>
              );
            })}
          </div>

          {/* سلايدر لكل نوع إذا في أكتر من نوع */}
          {selected.length > 1 && (
            <div className={styles.sliders}>
              <AnimatePresence initial={false}>
                {selected.map((b) => (
                  <motion.div
                    key={b.id}
                    className={styles.slider}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label htmlFor={`share-${b.id}`} className={styles.sliderLabel}>
                      <span>
                        <i
                          className={styles.swatch}
                          style={{
                            background: COLORS[beans.indexOf(b) % COLORS.length],
                          }}
                        />
                        {b.name}
                      </span>
                      <span>
                        {shares[b.id]}% · {Math.round((grams * shares[b.id]) / 100)} غ
                      </span>
                    </label>
                    <input
                      id={`share-${b.id}`}
                      type="range"
                      min={0}
                      max={100}
                      step={10}
                      value={shares[b.id]}
                      onChange={(e) => setShare(b.id, Number(e.target.value))}
                      className={styles.range}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {sum !== 100 && (
                <div className={styles.warning} role="alert">
                  <span>المجموع هلق {sum}%، لازم يكون 100%.</span>
                  <button
                    type="button"
                    className={styles.link}
                    onClick={() => setShares(evenShares(selected.map((b) => b.id)))}
                  >
                    وزّع بالتساوي
                  </button>
                </div>
              )}
            </div>
          )}

          {selected.length === 0 && (
            <p className={styles.warning} role="alert">
              اختار نوع بن واحد على الأقل.
            </p>
          )}
        </Step>

        <Step n={3} title="درجة التحميص">
          <Chips options={ROASTS} value={roast} onChange={setRoast} label="درجة التحميص" />
        </Step>

        <Step n={4} title="الطحنة" hint="إذا ما بتعرف، اختار حبوب كاملة وطحنها قبل التحضير.">
          <Chips options={GRINDS} value={grind} onChange={setGrind} label="الطحنة" />
        </Step>

        <Step n={5} title="الهيل">
          <Chips options={CARDAMOMS} value={cardamom} onChange={setCardamom} label="الهيل" />
        </Step>
      </div>

      {/* ===== الملخص ===== */}
      <aside className={styles.summary} aria-label="ملخص الخلطة">
        <h2 className={styles.summaryTitle}>خلطتك</h2>

        <div className={styles.ring} style={ringStyle}>
          <span className={styles.ringText}>{labelOf(TOTALS, total)}</span>
        </div>

        <ul className={styles.legend}>
          {selected.map((b) => (
            <li key={b.id}>
              <i
                className={styles.swatch}
                style={{ background: COLORS[beans.indexOf(b) % COLORS.length] }}
              />
              {b.name} {shares[b.id]}%
            </li>
          ))}
        </ul>

        <dl className={styles.details}>
          <div>
            <dt>التحميص</dt>
            <dd>{labelOf(ROASTS, roast)}</dd>
          </div>
          <div>
            <dt>الطحنة</dt>
            <dd>{labelOf(GRINDS, grind)}</dd>
          </div>
          <div>
            <dt>الهيل</dt>
            <dd>{labelOf(CARDAMOMS, cardamom)}</dd>
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
    </div>
  );
}
