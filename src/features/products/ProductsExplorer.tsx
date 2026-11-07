"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "./ProductCard";
import type { Product, Roast } from "@/types";
import styles from "./ProductsExplorer.module.css";

type RoastFilter = "all" | Roast;
type OriginFilter = "all" | "brazil" | "colombia";

const ROAST_FILTERS: { value: RoastFilter; label: string }[] = [
  { value: "all", label: "الكل" },
  { value: "light", label: "شقرا" },
  { value: "medium", label: "وسط" },
  { value: "dark", label: "غامقة" },
];

const ORIGIN_FILTERS: { value: OriginFilter; label: string }[] = [
  { value: "all", label: "كل الأنواع" },
  { value: "brazil", label: "برازيلي" },
  { value: "colombia", label: "كولومبي" },
];

// نتأكد إن القيمة اللي جاية من الرابط صحيحة
function toRoast(value?: string): RoastFilter {
  return value === "light" || value === "medium" || value === "dark"
    ? value
    : "all";
}

function toOrigin(value?: string): OriginFilter {
  return value === "brazil" || value === "colombia" ? value : "all";
}

// عدد المنتجات بالعربي
function countLabel(n: number) {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجين";
  if (n >= 3 && n <= 10) return `${n} منتجات`;
  return `${n} منتج`;
}

type Props = {
  products: Product[];
  initialRoast?: string;
  initialOrigin?: string;
};

export default function ProductsExplorer({
  products,
  initialRoast,
  initialOrigin,
}: Props) {
  const [roast, setRoast] = useState<RoastFilter>(toRoast(initialRoast));
  const [origin, setOrigin] = useState<OriginFilter>(toOrigin(initialOrigin));

  // نحدّث الرابط بدون ما نعيد تحميل الصفحة
  function updateUrl(nextRoast: RoastFilter, nextOrigin: OriginFilter) {
    const params = new URLSearchParams();
    if (nextRoast !== "all") params.set("roast", nextRoast);
    if (nextOrigin !== "all") params.set("origin", nextOrigin);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `?${query}` : window.location.pathname,
    );
  }

  function selectRoast(value: RoastFilter) {
    setRoast(value);
    updateUrl(value, origin);
  }

  function selectOrigin(value: OriginFilter) {
    setOrigin(value);
    updateUrl(roast, value);
  }

  function resetFilters() {
    setRoast("all");
    setOrigin("all");
    updateUrl("all", "all");
  }

  const filtered = products.filter(
    (p) =>
      (roast === "all" || p.roast === roast) &&
      (origin === "all" || p.origin === origin),
  );

  return (
    <>
      {/* شريط الفلاتر */}
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="درجة التحميص">
          {ROAST_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => selectRoast(f.value)}
              aria-pressed={roast === f.value}
              className={`${styles.chip} ${roast === f.value ? styles.active : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.filters} role="group" aria-label="نوع البن">
          {ORIGIN_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => selectOrigin(f.value)}
              aria-pressed={origin === f.value}
              className={`${styles.chip} ${origin === f.value ? styles.active : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className={styles.count} aria-live="polite">
          {countLabel(filtered.length)}
        </p>
      </div>

      {/* المنتجات */}
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>ما في منتجات بهالاختيار.</p>
          <button
            type="button"
            className="btn btn-outline"
            onClick={resetFilters}
          >
            شيل الفلاتر
          </button>
        </div>
      ) : (
        <motion.div layout className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
