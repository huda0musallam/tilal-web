import { Suspense } from "react";
import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import ProductsExplorer from "@/components/products/ProductsExplorer";
import type { Product } from "@/types";
import styles from "./products.module.css";

export const metadata: Metadata = {
  title: "المنتجات | التلال",
  description: "بن برازيلي وكولومبي بثلاث درجات تحميص، مع خيار الهيل.",
};

type Props = {
  searchParams: Promise<{ roast?: string; origin?: string }>;
};

export default function ProductsPage({ searchParams }: Props) {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>المنتجات</p>
          <h1 className={styles.title}>قهوتنا</h1>
          <p>اختار البن ودرجة التحميص، وحدد الوزن والهيل على ذوقك.</p>
        </header>

        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsList searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

// بيقرا الفلتر من الرابط، وبيجيب المنتجات من الـ API
async function ProductsList({ searchParams }: Props) {
  const params = await searchParams;

  let products: Product[];
  try {
    products = await getProducts();
  } catch {
    return (
      <p className={styles.error}>ما قدرنا نجيب المنتجات هلق، جرّب كمان شوي.</p>
    );
  }

  return (
    <ProductsExplorer
      products={products}
      initialRoast={params.roast}
      initialOrigin={params.origin}
    />
  );
}

function ProductsSkeleton() {
  return (
    <>
      <div className={styles.skeletonBar} />
      <div className={styles.skeletonGrid}>
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className={styles.skeleton} />
        ))}
      </div>
    </>
  );
}
