"use client";

import { AnimatePresence, motion } from "motion/react";
import { Heart } from "lucide-react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { apiKeys } from "@/shared/api/api";
import { fetchProducts } from "@/features/products/products.api";
import { useFavoriteIds } from "@/features/favorites/favorites-store";
import ProductCard from "./ProductCard";
import type { Roast } from "./product.types";
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

function toRoast(value: string | null): RoastFilter {
  return value === "light" || value === "medium" || value === "dark" ? value : "all";
}

function toOrigin(value: string | null): OriginFilter {
  return value === "brazil" || value === "colombia" ? value : "all";
}

function countLabel(n: number) {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجين";
  if (n >= 3 && n <= 10) return `${n} منتجات`;
  return `${n} منتج`;
}

type Filters = { roast: RoastFilter; origin: OriginFilter; fav: boolean };

export default function ProductsExplorer() {
  const { data: products = [] } = useSWR(apiKeys.products, fetchProducts, {
    suspense: true,
  });
  const favoriteIds = useFavoriteIds();

  const searchParams = useSearchParams();
  const current: Filters = {
    roast: toRoast(searchParams.get("roast")),
    origin: toOrigin(searchParams.get("origin")),
    fav: searchParams.get("fav") === "1",
  };

  function updateUrl(change: Partial<Filters>) {
    const next = { ...current, ...change };
    const params = new URLSearchParams();
    if (next.roast !== "all") params.set("roast", next.roast);
    if (next.origin !== "all") params.set("origin", next.origin);
    if (next.fav) params.set("fav", "1");
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  }

  function resetFilters() {
    updateUrl({ roast: "all", origin: "all", fav: false });
  }

  const filtered = products.filter(
    (p) =>
      (current.roast === "all" || p.roast === current.roast) &&
      (current.origin === "all" || p.origin === current.origin) &&
      (!current.fav || favoriteIds.includes(p.id)),
  );

  return (
    <>
      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="درجة التحميص">
          {ROAST_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => updateUrl({ roast: f.value })}
              aria-pressed={current.roast === f.value}
              className={`${styles.chip} ${current.roast === f.value ? styles.active : ""}`}
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
              onClick={() => updateUrl({ origin: f.value })}
              aria-pressed={current.origin === f.value}
              className={`${styles.chip} ${current.origin === f.value ? styles.active : ""}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <button
          type="button"
          onClick={() => updateUrl({ fav: !current.fav })}
          aria-pressed={current.fav}
          className={`${styles.chip} ${styles.favChip} ${current.fav ? styles.active : ""}`}
        >
          <Heart size={16} fill={current.fav ? "currentColor" : "none"} />
          المفضلة ({favoriteIds.length})
        </button>

        <p className={styles.count} aria-live="polite">
          {countLabel(filtered.length)}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>
            {current.fav && favoriteIds.length === 0
              ? "ما في منتجات بالمفضلة لهلق. اكبس على القلب بأي منتج لتحفظه."
              : "ما في منتجات بهالاختيار."}
          </p>
          <button type="button" className="btn btn-outline" onClick={resetFilters}>
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
