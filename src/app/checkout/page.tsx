import type { Metadata } from "next";
import Checkout from "@/features/checkout/Checkout";
import styles from "./checkout.module.css";

export const metadata: Metadata = {
  title: "كمّل الطلب | التلال",
  description: "اكتب معلوماتك، ونحنا منبعت طلبك على واتساب.",
};

export default function CheckoutPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>كمّل الطلب</p>
          <h1 className={styles.title}>آخر خطوة</h1>
          <p>اكتب معلوماتك، ونحنا منبعتلك رسالة الطلب جاهزة على واتساب.</p>
        </header>
        <Checkout />
      </div>
    </main>
  );
}
