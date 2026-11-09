import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/api/client";
import { getProducts } from "@/features/products/products.api";
import { pageClass, pageHeadClass, pageLabelClass } from "@/components/ui/shared-classes";
import ProductsCatalog from "@/features/products/ProductsCatalog";

export const metadata: Metadata = {
  title: "المنتجات | التلال",
  description: "بن برازيلي وكولومبي بثلاث درجات تحميص، مع خيار الهيل.",
};

export default function ProductsPage() {
  return (
    <main className={pageClass}>
      <div className="container">
        <header className={pageHeadClass}>
          <p className={pageLabelClass}>المنتجات</p>
          <h1 className="mb-2">قهوتنا</h1>
          <p>اختار البن ودرجة التحميص، وحدد الوزن والهيل على ذوقك.</p>
        </header>

        <SWRConfig value={{ fallback: { [apiKeys.products]: getProducts() } }}>
          <ProductsCatalog />
        </SWRConfig>
      </div>
    </main>
  );
}
