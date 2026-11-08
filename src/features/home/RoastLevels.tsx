"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { ROAST_LEVELS, ROAST_OPTIONS } from "@/features/products/product.options";
import type { Roast } from "@/features/products/product.types";
import styles from "./RoastLevels.module.css";

const ROAST_COPY: Record<Roast, { alt: string; text: string }> = {
  light: {
    alt: "كيس قهوة التلال الأخضر، تحميص شقرا",
    text: "خفيفة ومنعشة، فيها حموضة لطيفة ونكهة فواكه. بتحلى بالـ V60 والقهوة الباردة.",
  },
  medium: {
    alt: "كيس قهوة التلال الكرافت، تحميص وسط",
    text: "متوازنة، فيها حلاوة كراميل وشوكولا. بتمشي مع كل طرق التحضير.",
  },
  dark: {
    alt: "كيس قهوة التلال البني، تحميص غامق",
    text: "قوية وجسمها كامل ومرارتها خفيفة. مثالية للقهوة العربية والموكا.",
  },
};

const LEVELS = ROAST_OPTIONS.map((o) => o.level);

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export default function RoastLevels() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.head}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <p className={styles.label}>درجات التحميص</p>
          <h2>لكل مزاج تلّة</h2>
          <p>من الخفيفة المنعشة للغامقة القوية، اختار التلّة اللي بتشبه مزاجك.</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {ROAST_OPTIONS.map((roast) => (
            <motion.article key={roast.value} variants={fadeUp}>
              <Link href={`/products?roast=${roast.value}`} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={roast.image}
                    alt={ROAST_COPY[roast.value].alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.body}>
                  <div className={styles.top}>
                    <h3 className={styles.name}>{roast.label}</h3>

                    <div
                      className={styles.dots}
                      role="img"
                      aria-label={`قوة التحميص ${roast.level} من ${ROAST_LEVELS}`}
                    >
                      {LEVELS.map((n) => (
                        <span
                          key={n}
                          className={`${styles.dot} ${n <= roast.level ? styles.filled : ""}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className={styles.text}>{ROAST_COPY[roast.value].text}</p>

                  <span className={styles.more}>
                    شوف المنتجات
                    <ArrowLeft size={18} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
