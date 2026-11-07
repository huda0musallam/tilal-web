"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import styles from "./BlendTeaser.module.css";

// أماكن ثابتة لحبات البن النازلة
const BEANS = [
  { left: "8%", delay: "0s", duration: "6s", size: 22, rotate: 20 },
  { left: "22%", delay: "2.2s", duration: "7s", size: 18, rotate: -30 },
  { left: "36%", delay: "1s", duration: "5.5s", size: 26, rotate: 45 },
  { left: "52%", delay: "3.4s", duration: "6.5s", size: 20, rotate: -10 },
  { left: "66%", delay: "0.6s", duration: "7.5s", size: 24, rotate: 60 },
  { left: "80%", delay: "2.8s", duration: "6s", size: 18, rotate: -45 },
  { left: "92%", delay: "1.6s", duration: "5s", size: 22, rotate: 15 },
];

function Bean({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 20 28" width={size} height={size * 1.4} aria-hidden="true">
      <ellipse cx="10" cy="14" rx="9" ry="13" fill="#6B4430" />
      <path
        d="M10 2 C6 9, 14 19, 10 26"
        fill="none"
        stroke="#3B2618"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

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
          {/* النص */}
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

          {/* الرسمة */}
          <div className={styles.visual} aria-hidden="true">
            {BEANS.map((b, i) => (
              <span
                key={i}
                className={styles.bean}
                style={{
                  left: b.left,
                  animationDelay: b.delay,
                  animationDuration: b.duration,
                }}
              >
                {/* الدوران الأولي لكل حبة، والحركة نفسها بالـ CSS */}
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
