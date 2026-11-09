import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/client";
import { getProducts } from "@/features/products/products.api";
import ProductsCatalog from "@/features/products/ProductsCatalog";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "المنتجات | التلال",
  description: "بن برازيلي وكولومبي بثلاث درجات تحميص، مع خيار الهيل.",
};

export default function ProductsPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>المنتجات</p>
          <h1 className={styles.title}>قهوتنا</h1>
          <p>اختار البن ودرجة التحميص، وحدد الوزن والهيل على ذوقك.</p>
        </header>

        <SWRConfig value={{ fallback: { [apiKeys.products]: getProducts() } }}>
          <ProductsCatalog />
        </SWRConfig>
      </div>
    </main>
  );
}
