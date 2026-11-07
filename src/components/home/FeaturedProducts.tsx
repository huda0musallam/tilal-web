import Link from "next/link";
import { getFeaturedProducts } from "@/lib/api";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import styles from "./FeaturedProducts.module.css";

function SectionHead() {
  return (
    <div className={styles.head}>
      <p className={styles.label}>من محمصتنا</p>
      <h2>الأكثر طلباً</h2>
    </div>
  );
}

// هاد component بيشتغل على السيرفر، وبيجيب البيانات قبل ما يوصل للمتصفح
export default async function FeaturedProducts() {
  let products: Product[];

  try {
    products = await getFeaturedProducts();
  } catch {
    return (
      <section className={styles.section}>
        <div className="container">
          <SectionHead />
          <p className={styles.error}>ما قدرنا نجيب المنتجات هلق، جرّب كمان شوي.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead />

        <div className={styles.grid}>
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className={styles.more}>
          <Link href="/products" className="btn btn-outline">
            شوف كل المنتجات
          </Link>
        </div>
      </div>
    </section>
  );
}

// الكروت الفاضية اللي بتطلع وقت التحميل
export function FeaturedProductsSkeleton() {
  return (
    <section className={styles.section}>
      <div className="container">
        <SectionHead />
        <div className={styles.grid}>
          {[1, 2, 3].map((n) => (
            <div key={n} className={styles.skeleton} />
          ))}
        </div>
      </div>
    </section>
  );
}