"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/client";
import { fetchBeans } from "@/features/blend/beans.api";
import { favorites } from "@/features/favorites/favorites.store";
import { fetchProducts } from "@/features/products/products.api";
import { cartTotal, resolveLines } from "./cart.logic";
import { cart, useCartLines } from "./cart.store";

export function useCartItems() {
  const lines = useCartLines();
  const products = useSWR(apiKeys.products, fetchProducts, {
    onSuccess: (data) => {
      const ids = data.map((p) => p.id);
      cart.keepProducts(ids);
      favorites.keep(ids);
    },
  });
  const beans = useSWR(apiKeys.beans, fetchBeans, {
    onSuccess: (data) => cart.keepBeans(data.map((b) => b.id)),
  });

  const items = resolveLines(lines, {
    products: products.data ?? [],
    beans: beans.data ?? [],
  });

  return {
    hasLines: lines.length > 0,
    ready: Boolean(products.data && beans.data),
    failed: Boolean(products.error || beans.error),
    items,
    total: cartTotal(items),
    retry() {
      products.mutate();
      beans.mutate();
    },
  };
}
