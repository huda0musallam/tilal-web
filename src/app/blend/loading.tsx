import styles from "./blend.module.css";

export default function Loading() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>اصنع خلطتك</p>
          <h1 className={styles.title}>قهوتك، على ذوقك</h1>
        </header>
        <div className={styles.skeleton} role="status" aria-label="عم نجيب أنواع البن" />
      </div>
    </main>
  );
}
