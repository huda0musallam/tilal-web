"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ChevronDown } from "lucide-react";
import { badgeStyles } from "@/components/ui/Badge";
import ButtonLink from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";

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
    <section className="relative flex min-h-hero items-start overflow-hidden md:min-h-hero-md md:items-center">
      <div className="absolute inset-0 animate-zoom">
        <Image
          src="/images/hero-hills.webp"
          alt="فنجان قهوة طالع منه البخار على صخرة، وقدامه تلال خضرا وضباب الصبح"
          fill
          priority
          sizes="100vw"
          className="-scale-x-100 object-cover object-hero md:object-center"
        />
      </div>

      <div className="absolute inset-0 bg-linear-to-b/srgb from-surface/95 from-0% via-surface/85 via-40% to-surface/0 to-70% md:bg-linear-to-l/srgb md:via-surface/80 md:via-35% md:to-65%" />

      <div className="relative z-1 container py-10 md:py-16">
        <motion.div className="max-w-140" variants={stagger} initial="hidden" animate="show">
          <motion.p
            variants={fadeUp}
            className={cn(badgeStyles({ variant: "eyebrow", size: "lg" }), "mb-5")}
          >
            محمصة منزلية · تحميص طازة بدفعات صغيرة
          </motion.p>

          <motion.h1 variants={fadeUp} className="mb-4 leading-relaxed">
            من التلال لفنجانك
          </motion.h1>

          <motion.p variants={fadeUp} className="mb-8 max-w-115 text-lg text-muted-ink">
            بن محمّص بإيدينا، بيوصلك طازة وريحته بتسبقه.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            <ButtonLink href="/products">تسوّق القهوة</ButtonLink>
            <ButtonLink href="/blend" variant="secondary">
              اصنع خلطتك
            </ButtonLink>
          </motion.div>
        </motion.div>
      </div>

      <ButtonLink
        href="#story"
        variant="ghost"
        size="icon"
        aria-label="انزل لقصتنا"
        className="absolute bottom-6 left-1/2 z-1 -translate-x-1/2 animate-nudge bg-surface/75 hover:bg-surface/75"
      >
        <ChevronDown size={22} />
      </ButtonLink>
    </section>
  );
}
