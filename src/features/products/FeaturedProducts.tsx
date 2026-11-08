"use client";

import { mutate } from "swr";
import { apiKeys } from "@/shared/api/client";
import DataSection from "@/shared/ui/DataSection";
import GridSkeleton from "@/shared/ui/GridSkeleton";
import FeaturedList from "./FeaturedList";
import { fetchProducts } from "./products.api";
import styles from "./FeaturedProducts.module.css";

const retry = () => mutate(apiKeys.products, fetchProducts(apiKeys.products));

export default function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={styles.label}>من محمصتنا</p>
          <h2>الأكثر طلباً</h2>
        </div>

        <DataSection
          loading={<GridSkeleton count={3} />}
          errorMessage="ما قدرنا نجيب المنتجات هلق"
          retry={retry}
        >
          <FeaturedList />
        </DataSection>
      </div>
    </section>
  );
}
