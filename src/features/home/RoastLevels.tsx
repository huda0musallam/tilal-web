"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { ROAST_LEVELS, ROAST_OPTIONS } from "@/features/products/product.options";
import type { Roast } from "@/features/products/product.types";
import { cardStyles } from "@/components/ui/Card";
import { cardGridStyles } from "@/components/ui/CardGrid";
import Section from "@/components/ui/Section";
import MoreHint from "@/components/ui/MoreHint";
import SectionLabel from "@/components/ui/SectionLabel";
import ZoomImage from "@/components/ui/ZoomImage";
import { cn } from "@/lib/cn";

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
    <Section>
      <div className="container">
        <motion.div
          className="mx-auto mb-14 max-w-140 text-center"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
        >
          <SectionLabel>درجات التحميص</SectionLabel>
          <h2>لكل مزاج تلّة</h2>
          <p>من الخفيفة المنعشة للغامقة القوية، اختار التلّة اللي بتشبه مزاجك.</p>
        </motion.div>

        <motion.div
          className={cardGridStyles({ layout: "wide3" })}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {ROAST_OPTIONS.map((roast) => (
            <motion.article key={roast.value} variants={fadeUp}>
              <Link
                href={`/products?roast=${roast.value}`}
                className={cn(
                  cardStyles({ radius: "card", padding: "none", bordered: false, lift: true }),
                  "group block h-full overflow-hidden",
                )}
              >
                <div className="relative aspect-square overflow-hidden">
                  <ZoomImage
                    src={roast.image}
                    alt={ROAST_COPY[roast.value].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-3xl">{roast.label}</h3>

                    <div
                      className="flex gap-1.5"
                      role="img"
                      aria-label={`قوة التحميص ${roast.level} من ${ROAST_LEVELS}`}
                    >
                      {LEVELS.map((n) => (
                        <span
                          key={n}
                          className={cn(
                            "h-4 w-3 rounded-ellipse border-2 border-accent",
                            n <= roast.level && "border-inverse-surface bg-inverse-surface",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mb-4 text-base">{ROAST_COPY[roast.value].text}</p>

                  <MoreHint>شوف المنتجات</MoreHint>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
