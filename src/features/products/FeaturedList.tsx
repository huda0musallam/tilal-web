"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/api/client";
import ButtonLink from "@/components/ui/ButtonLink";
import EmptyState from "@/components/ui/EmptyState";
import ProductCard from "./ProductCard";
import { productGridClass } from "./product.classes";
import { fetchProducts } from "./products.api";

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
        <div className={productGridClass}>
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}
      <div className="mt-12 text-center">
        <ButtonLink href="/products" variant="secondary">
          شوف كل المنتجات
        </ButtonLink>
      </div>
    </>
  );
}
