"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import styles from "./Hero.module.css";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="/images/hero-hills.jpg"
          alt="فنجان قهوة طالع منه البخار على صخرة، وقدامه تلال خضرا وضباب الصبح"
          fill
          priority
          sizes="100vw"
          className={styles.image}
        />
      </div>

      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.div className={styles.text} variants={stagger} initial="hidden" animate="show">
          <motion.p variants={fadeUp} className={styles.eyebrow}>
            محمصة منزلية · تحميص طازة بدفعات صغيرة
          </motion.p>

          <motion.h1 variants={fadeUp} className={styles.title}>
            من التلال لفنجانك
          </motion.h1>

          <motion.p variants={fadeUp} className={styles.lead}>
            بن محمّص بإيدينا، بيوصلك طازة وريحته بتسبقه.
          </motion.p>

          <motion.div variants={fadeUp} className={styles.ctas}>
            <Link href="/products" className="btn btn-primary">
              تسوّق القهوة
            </Link>
            <Link href="/blend" className="btn btn-outline">
              اصنع خلطتك
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <a href="#story" className={styles.scrollHint} aria-label="انزل لقصتنا">
        <ChevronDown size={22} />
      </a>
    </section>
  );
}
