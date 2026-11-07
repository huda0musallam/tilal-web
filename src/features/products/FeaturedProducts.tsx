"use client";

import Link from "next/link";
import useSWR from "swr";
import { apiKeys, fetchProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import GridSkeleton from "@/components/ui/GridSkeleton";

import styles from "./FeaturedProducts.module.css";

export default function FeaturedProducts() {
  // نفس مفتاح صفحة المنتجات، فلما تروح عليها بتفتح فوراً من الـ cache
  const { data, error, mutate } = useSWR(apiKeys.products, fetchProducts);
  const featured = data?.filter((p) => p.featured) ?? [];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={styles.label}>من محمصتنا</p>
          <h2>الأكثر طلباً</h2>
        </div>

        {error ? (
          <div className={styles.error} role="alert">
            <p>ما قدرنا نجيب المنتجات هلق، جرّب كمان شوي.</p>
            <button type="button" className="btn btn-outline" onClick={() => mutate()}>
              جرّب مرة تانية
            </button>
          </div>
        ) : !data ? (
          <GridSkeleton count={3} />
        ) : (
          <>
            <div className={styles.grid}>
              {featured.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
            <div className={styles.more}>
              <Link href="/products" className="btn btn-outline">
                شوف كل المنتجات
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
