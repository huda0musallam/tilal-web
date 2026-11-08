"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Flame, Coffee, Leaf } from "lucide-react";
import StampLogo from "@/shared/logo/StampLogo";
import styles from "./Story.module.css";

const points = [
  {
    icon: Flame,
    title: "تحميص بدفعات صغيرة",
    text: "كل دفعة منراقبها لحالها لحد ما توصل لونها الصح.",
  },
  {
    icon: Coffee,
    title: "طحن عند الطلب",
    text: "ما منطحن البن إلا لما تطلبه، لتوصلك ريحته كاملة.",
  },
  {
    icon: Leaf,
    title: "هيل على ذوقك",
    text: "بدون، عادي، أو زيادة، إنت بتقرر.",
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export default function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="story" className={styles.story}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.visual} ref={ref}>
          <div className={styles.frame}>
            <motion.div className={styles.parallax} style={{ y }}>
              <Image
                src="/images/story-roaster.webp"
                alt="حبوب بن محمصة طازة نازلة من المحمصة والبخار طالع منها"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className={styles.image}
              />
            </motion.div>
          </div>
          <StampLogo className={styles.stamp} />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className={styles.label}>
            قصتنا
          </motion.p>

          <motion.h2 variants={fadeUp} className={styles.title}>
            الحكاية بلّشت بمحمصة صغيرة بالبيت
          </motion.h2>

          <motion.p variants={fadeUp} className={styles.body}>
            ما بلّشنا كمصنع. بلّشنا لأنّا بنحب ريحة البن وهو عم يتحمص، وصرنا نحمّص لأهلنا وجيراننا
            لحد ما صار للتلال اسم. كل دفعة منحمصها بإيدينا، منراقب لونها ومنسمع فرقعتها، وما منطحنها
            إلا لما تطلبها.
          </motion.p>

          <ul className={styles.points}>
            {points.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fadeUp} className={styles.point}>
                <span className={styles.icon} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <p className={styles.pointTitle}>{title}</p>
                  <p className={styles.pointText}>{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
