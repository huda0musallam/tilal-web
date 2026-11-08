"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ArrowLeft } from "lucide-react";
import styles from "./RoastLevels.module.css";

const roasts = [
  {
    id: "light",
    name: "شقرا",
    level: 1,
    image: "/images/bag-light.webp",
    alt: "كيس قهوة التلال الأخضر، تحميص شقرا",
    text: "خفيفة ومنعشة، فيها حموضة لطيفة ونكهة فواكه. بتحلى بالـ V60 والقهوة الباردة.",
  },
  {
    id: "medium",
    name: "وسط",
    level: 2,
    image: "/images/bag-medium.webp",
    alt: "كيس قهوة التلال الكرافت، تحميص وسط",
    text: "متوازنة، فيها حلاوة كراميل وشوكولا. بتمشي مع كل طرق التحضير.",
  },
  {
    id: "dark",
    name: "غامقة",
    level: 3,
    image: "/images/bag-dark.webp",
    alt: "كيس قهوة التلال البني، تحميص غامق",
    text: "قوية وجسمها كامل ومرارتها خفيفة. مثالية للقهوة العربية والموكا.",
  },
];

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
          {roasts.map((roast) => (
            <motion.article key={roast.id} variants={fadeUp}>
              <Link href={`/products?roast=${roast.id}`} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={roast.image}
                    alt={roast.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.body}>
                  <div className={styles.top}>
                    <h3 className={styles.name}>{roast.name}</h3>

                    <div
                      className={styles.dots}
                      role="img"
                      aria-label={`قوة التحميص ${roast.level} من 3`}
                    >
                      {[1, 2, 3].map((n) => (
                        <span
                          key={n}
                          className={`${styles.dot} ${n <= roast.level ? styles.filled : ""}`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className={styles.text}>{roast.text}</p>

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
