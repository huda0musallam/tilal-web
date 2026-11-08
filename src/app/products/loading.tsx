import GridSkeleton from "@/components/ui/GridSkeleton";
import styles from "./products.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>المنتجات</p>
          <h1 className={styles.title}>قهوتنا</h1>
        </header>
        <div className={styles.skeletonBar} />
        <GridSkeleton count={6} />
      </div>
    </main>
  );
}
