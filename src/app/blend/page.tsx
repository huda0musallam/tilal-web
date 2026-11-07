import { Suspense } from "react";
import type { Metadata } from "next";
import { getBeans } from "@/lib/api";
import BlendBuilder from "@/components/blend/BlendBuilder";
import type { Bean } from "@/types";
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
          <p>
            اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا
            منحمّصلك ياها.
          </p>
        </header>

        <Suspense fallback={<div className={styles.skeleton} />}>
          <BlendLoader />
        </Suspense>
      </div>
    </main>
  );
}

async function BlendLoader() {
  let beans: Bean[];
  try {
    beans = await getBeans();
  } catch {
    return (
      <p className={styles.error}>
        ما قدرنا نجيب أنواع البن هلق، جرّب كمان شوي.
      </p>
    );
  }
  return <BlendBuilder beans={beans} />;
}
