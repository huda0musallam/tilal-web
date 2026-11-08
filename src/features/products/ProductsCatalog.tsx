"use client";

import { mutate } from "swr";
import { apiKeys } from "@/shared/api/client";
import DataSection from "@/shared/ui/DataSection";
import CatalogSkeleton from "./CatalogSkeleton";
import ProductsExplorer from "./ProductsExplorer";
import { fetchProducts } from "./products.api";

const retry = () => mutate(apiKeys.products, fetchProducts(apiKeys.products));

export default function ProductsCatalog() {
  return (
    <DataSection
      loading={<CatalogSkeleton />}
      errorMessage="ما قدرنا نجيب المنتجات هلق"
      retry={retry}
    >
      <ProductsExplorer />
    </DataSection>
  );
}
