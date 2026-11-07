import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys, getBeans } from "@/lib/api";
import BlendBuilder from "@/features/blend/BlendBuilder";
import styles from "./blend.module.css";

export const metadata: Metadata = {
  title: "اصنع خلطتك | التلال",
  description: "اختار نوع البن والتحميص والطحنة والهيل، ونحنا منحمّصلك خلطتك.",
};

export default function BlendPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>اصنع خلطتك</p>
          <h1 className={styles.title}>قهوتك، على ذوقك</h1>
          <p>اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا منحمّصلك ياها.</p>
        </header>

        <SWRConfig value={{ fallback: { [apiKeys.beans]: getBeans() } }}>
          <BlendBuilder />
        </SWRConfig>
      </div>
    </main>
  );
}
