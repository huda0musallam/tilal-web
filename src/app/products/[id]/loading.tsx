import styles from "./product.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className="container">
        <div className={styles.skeleton} role="status" aria-label="عم نجيب المنتج">
          <div className={styles.skeletonMedia} />
          <div className={styles.skeletonText} />
        </div>
      </div>
    </main>
  );
}
