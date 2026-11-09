"use client";

import { mutate } from "swr";
import { apiKeys } from "@/lib/api/client";
import DataSection from "@/components/ui/DataSection";
import GridSkeleton from "@/components/ui/GridSkeleton";
import Section from "@/components/ui/Section";
import { sectionLabelClass } from "@/components/ui/shared-classes";
import FeaturedList from "./FeaturedList";
import { fetchProducts } from "./products.api";

const retry = () => mutate(apiKeys.products, fetchProducts(apiKeys.products));

export default function FeaturedProducts() {
  return (
    <Section tone="muted" className="sm:py-28">
      <div className="container">
        <div className="mb-14 text-center">
          <p className={sectionLabelClass}>من محمصتنا</p>
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
    </Section>
  );
}
