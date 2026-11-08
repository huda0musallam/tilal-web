import Link from "next/link";
import StampLogo from "@/shared/logo/StampLogo";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <StampLogo className={styles.stamp} />
        <p className={styles.code}>404</p>
        <h1 className={styles.title}>ضيّعنا الطريق بين التلال</h1>
        <p className={styles.text}>
          الصفحة اللي عم تدوّر عليها مش موجودة، بس القهوة موجودة دايماً.
        </p>
        <div className={styles.actions}>
          <Link href="/" className="btn btn-primary">
            ارجع للرئيسية
          </Link>
          <Link href="/products" className="btn btn-outline">
            تسوّق القهوة
          </Link>
        </div>
      </div>
    </main>
  );
}
