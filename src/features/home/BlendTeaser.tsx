"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import Bean from "./Bean";
import styles from "./BlendTeaser.module.css";

const BEANS = [
  { id: "bean-a", left: "8%", delay: "0s", duration: "6s", size: 22, rotate: 20 },
  { id: "bean-b", left: "22%", delay: "2.2s", duration: "7s", size: 18, rotate: -30 },
  { id: "bean-c", left: "36%", delay: "1s", duration: "5.5s", size: 26, rotate: 45 },
  { id: "bean-d", left: "52%", delay: "3.4s", duration: "6.5s", size: 20, rotate: -10 },
  { id: "bean-e", left: "66%", delay: "0.6s", duration: "7.5s", size: 24, rotate: 60 },
  { id: "bean-f", left: "80%", delay: "2.8s", duration: "6s", size: 18, rotate: -45 },
  { id: "bean-g", left: "92%", delay: "1.6s", duration: "5s", size: 22, rotate: 15 },
];

export default function BlendTeaser() {
  return (
    <section className={styles.section}>
      <div className="container">
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={styles.text}>
            <p className={styles.label}>اصنع خلطتك</p>
            <h2 className={styles.title}>قهوتك، على ذوقك</h2>
            <p className={styles.body}>
              اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا منحمّصلك ياها.
            </p>
            <Link href="/blend" className={`btn ${styles.cta}`}>
              ابدأ خلطتك
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className={styles.visual} aria-hidden="true">
            {BEANS.map((b) => (
              <span
                key={b.id}
                className={styles.bean}
                style={{
                  left: b.left,
                  animationDelay: b.delay,
                  animationDuration: b.duration,
                }}
              >
                <span style={{ display: "block", transform: `rotate(${b.rotate}deg)` }}>
                  <Bean size={b.size} />
                </span>
              </span>
            ))}

            <div className={styles.ringWrap}>
              <div className={styles.ring}>
                <span className={styles.ringText}>250 غ</span>
              </div>
              <div className={styles.legend}>
                <span>
                  <i className={styles.dotA} /> برازيلي 60%
                </span>
                <span>
                  <i className={styles.dotB} /> كولومبي 40%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
