"use client";

import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Section from "@/components/ui/Section";
import Bean from "./Bean";

const BEANS = [
  { id: "bean-a", left: "8%", delay: "0s", duration: "6s", size: 22, rotate: 20 },
  { id: "bean-b", left: "22%", delay: "2.2s", duration: "7s", size: 18, rotate: -30 },
  { id: "bean-c", left: "36%", delay: "1s", duration: "5.5s", size: 26, rotate: 45 },
  { id: "bean-d", left: "52%", delay: "3.4s", duration: "6.5s", size: 20, rotate: -10 },
  { id: "bean-e", left: "66%", delay: "0.6s", duration: "7.5s", size: 24, rotate: 60 },
  { id: "bean-f", left: "80%", delay: "2.8s", duration: "6s", size: 18, rotate: -45 },
  { id: "bean-g", left: "92%", delay: "1.6s", duration: "5s", size: 22, rotate: 15 },
];

const legendItemClass = "flex items-center gap-1.5";
const legendDotClass = "size-2.5 rounded-full";

export default function BlendTeaser() {
  return (
    <Section>
      <div className="container">
        <motion.div
          className="grid grid-cols-1 items-center gap-12 overflow-hidden rounded-feature bg-primary px-6 py-9 lg:flex lg:p-14"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="lg:flex-11">
            <p className="mb-2 font-bold text-on-primary-muted">اصنع خلطتك</p>
            <h2 className="mb-4 text-on-primary">قهوتك، على ذوقك</h2>
            <p className="mb-8 max-w-110 text-lg text-text-on-dark">
              اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا منحمّصلك ياها.
            </p>
            <ButtonLink href="/blend" variant="inverse">
              ابدأ خلطتك
              <ArrowLeft size={18} />
            </ButtonLink>
          </div>

          <div
            className="relative grid h-75 place-items-center overflow-hidden lg:h-90 lg:flex-10"
            aria-hidden="true"
          >
            {BEANS.map((b) => (
              <span
                key={b.id}
                className="absolute -top-10 animate-fall opacity-85"
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

            <div className="relative z-1 grid justify-items-center gap-4">
              <div className="relative grid size-47.5 place-items-center rounded-full bg-conic from-accent from-60% to-surface to-60% after:absolute after:inset-6.5 after:rounded-full after:bg-primary">
                <span className="relative z-1 text-2xl font-bold text-on-primary">250 غ</span>
              </div>
              <div className="flex gap-4 rounded-pill bg-scrim/35 px-3.5 py-1.5 text-sm text-on-primary">
                <span className={legendItemClass}>
                  <i className={`${legendDotClass} bg-accent`} /> برازيلي 60%
                </span>
                <span className={legendItemClass}>
                  <i className={`${legendDotClass} bg-surface`} /> كولومبي 40%
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
