"use client";

import { AnimatePresence, motion } from "motion/react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { apiKeys } from "@/lib/api/client";
import { fetchProducts } from "@/features/products/products.api";
import { useFavoriteIds } from "@/features/favorites/favorites.store";
import FavoritesFilterChip from "./FavoritesFilterChip";
import ProductCard from "./ProductCard";
import type { Roast } from "./product.types";
import type { Option } from "@/lib/option";
import { ROAST_OPTIONS, originOptions } from "./product.options";
import Button from "@/components/ui/Button";
import Chips from "@/components/ui/Chips";
import EmptyState from "@/components/ui/EmptyState";
import { productGridClass } from "./product.classes";

const dividerClass = "hidden h-7 w-px bg-line sm:block";

type RoastFilter = "all" | Roast;

const ROAST_FILTERS: Option<RoastFilter>[] = [{ value: "all", label: "الكل" }, ...ROAST_OPTIONS];

function toRoast(value: string | null): RoastFilter {
  return ROAST_OPTIONS.find((o) => o.value === value)?.value ?? "all";
}

function countLabel(n: number) {
  if (n === 1) return "منتج واحد";
  if (n === 2) return "منتجين";
  if (n >= 3 && n <= 10) return `${n} منتجات`;
  return `${n} منتج`;
}

type Filters = { roast: RoastFilter; origin: string; fav: boolean };

export default function ProductsExplorer() {
  const { data: products = [] } = useSWR(apiKeys.products, fetchProducts, {
    suspense: true,
  });
  const searchParams = useSearchParams();
  const favOnly = searchParams.get("fav") === "1";
  const favoriteIds = useFavoriteIds(favOnly);

  const originFilters: Option<string>[] = [
    { value: "all", label: "كل الأنواع" },
    ...originOptions(products),
  ];

  const originParam = searchParams.get("origin");
  const current: Filters = {
    roast: toRoast(searchParams.get("roast")),
    origin: originFilters.find((o) => o.value === originParam)?.value ?? "all",
    fav: favOnly,
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

  if (products.length === 0) {
    return <EmptyState title="ما في منتجات بالمحل هلق. ارجعلنا كمان شوي." />;
  }

  const filtered = products.filter(
    (p) =>
      (current.roast === "all" || p.roast === current.roast) &&
      (current.origin === "all" || p.origin === current.origin) &&
      (!current.fav || favoriteIds.includes(p.id)),
  );

  return (
    <>
      <div className="mb-9 flex flex-wrap items-center gap-x-4 gap-y-3 rounded-toolbar bg-muted-surface px-4 py-3.5">
        <Chips
          options={ROAST_FILTERS}
          value={current.roast}
          onChange={(value) => updateUrl({ roast: value })}
          label="درجة التحميص"
        />

        <span className={dividerClass} aria-hidden="true" />

        <Chips
          options={originFilters}
          value={current.origin}
          onChange={(value) => updateUrl({ origin: value })}
          label="نوع البن"
        />

        <span className={dividerClass} aria-hidden="true" />

        <FavoritesFilterChip
          active={current.fav}
          onToggle={() => updateUrl({ fav: !current.fav })}
        />

        <p className="w-full text-sm text-muted-ink sm:ms-auto sm:w-auto" aria-live="polite">
          {countLabel(filtered.length)}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="grid justify-items-center gap-4 py-16 text-center">
          <p>
            {current.fav && favoriteIds.length === 0
              ? "ما في منتجات بالمفضلة لهلق. اكبس على القلب بأي منتج لتحفظه."
              : "ما في منتجات بهالاختيار."}
          </p>
          <Button variant="secondary" onClick={resetFilters}>
            شيل الفلاتر
          </Button>
        </div>
      ) : (
        <motion.div layout className={productGridClass}>
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
                <ProductCard product={product} index={i} eager={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
