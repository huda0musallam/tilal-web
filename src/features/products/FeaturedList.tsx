"use client";

import Link from "next/link";
import useSWR from "swr";
import { apiKeys } from "@/lib/api/client";
import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "./ProductCard";
import { fetchProducts } from "./products.api";
import styles from "./FeaturedList.module.css";

export default function FeaturedList() {
  const { data: products = [] } = useSWR(apiKeys.products, fetchProducts, { suspense: true });
  const featured = products.filter((p) => p.featured);

  if (products.length === 0) {
    return <EmptyState title="ما في منتجات بالمحل هلق. ارجعلنا كمان شوي." />;
  }

  return (
    <>
      {featured.length === 0 ? (
        <EmptyState title="ما في منتجات مميزة هلق." />
      ) : (
        <div className={styles.grid}>
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
      <div className={styles.more}>
        <Link href="/products" className="btn btn-outline">
          شوف كل المنتجات
        </Link>
      </div>
    </>
  );
}
