"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import styles from "./BrewingPreview.module.css";

export default function BrewingPreview() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.head}>
          <p className={styles.label}>طرق التحضير</p>
          <h2>كل طريقة إلها طقس</h2>
        </div>

        <div className={styles.grid}>
          {BREW_METHODS.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <Link href={`/brewing/${m.slug}`} className={styles.card}>
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={styles.image}
                />
                <div className={styles.overlay}>
                  <h3 className={styles.name}>{m.name}</h3>
                  <p className={styles.text}>{m.tagline}</p>
                  <span className={styles.more}>
                    طريقة التحضير
                    <ArrowLeft size={16} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
