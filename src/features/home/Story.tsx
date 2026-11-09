"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "motion/react";
import { Flame, Coffee, Leaf } from "lucide-react";
import StampLogo from "@/components/logo/StampLogo";
import Section, { sectionLabelClass } from "@/components/ui/Section";

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
    <Section id="story" tone="muted" className="scroll-mt-17">
      <div className="container grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-18">
        <div className="relative" ref={ref}>
          <div className="relative aspect-4/3 overflow-hidden rounded-media lg:aspect-4/5">
            <motion.div className="absolute -inset-y-1/10 inset-x-0" style={{ y }}>
              <Image
                src="/images/story-roaster.webp"
                alt="حبوب بن محمصة طازة نازلة من المحمصة والبخار طالع منها"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>
          <StampLogo className="absolute end-4 -bottom-7 h-auto w-24 animate-spin-slow rounded-full bg-muted-surface p-1.5 lg:-end-11 lg:-bottom-11 lg:w-35" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.p variants={fadeUp} className={sectionLabelClass}>
            قصتنا
          </motion.p>

          <motion.h2 variants={fadeUp} className="mb-5">
            الحكاية بلّشت بمحمصة صغيرة بالبيت
          </motion.h2>

          <motion.p variants={fadeUp} className="mb-9 text-lg">
            ما بلّشنا كمصنع. بلّشنا لأنّا بنحب ريحة البن وهو عم يتحمص، وصرنا نحمّص لأهلنا وجيراننا
            لحد ما صار للتلال اسم. كل دفعة منحمصها بإيدينا، منراقب لونها ومنسمع فرقعتها، وما منطحنها
            إلا لما تطلبها.
          </motion.p>

          <ul className="grid list-none gap-5">
            {points.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={fadeUp} className="flex items-start gap-4">
                <span
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-primary"
                  aria-hidden="true"
                >
                  <Icon size={22} strokeWidth={1.8} />
                </span>
                <div>
                  <p className="font-bold text-ink">{title}</p>
                  <p className="text-base">{text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </Section>
  );
}
