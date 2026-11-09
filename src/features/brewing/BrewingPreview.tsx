"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import Section from "@/components/ui/Section";
import {
  moreArrowClass,
  moreLinkClass,
  sectionLabelClass,
  zoomImageClass,
} from "@/components/ui/shared-classes";
import { cn } from "@/lib/cn";

export default function BrewingPreview() {
  return (
    <Section tone="muted" className="sm:py-28">
      <div className="container">
        <div className="mb-14 text-center">
          <p className={sectionLabelClass}>طرق التحضير</p>
          <h2>كل طريقة إلها طقس</h2>
        </div>

        <div className="mx-auto grid max-w-105 grid-cols-1 gap-5 sm:mx-0 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {BREW_METHODS.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.1 }}
            >
              <Link
                href={`/brewing/${m.slug}`}
                className="group relative block aspect-4/3 overflow-hidden rounded-card bg-inverse-surface sm:aspect-3/4"
              >
                <Image
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className={cn(zoomImageClass, "group-hover:scale-106")}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t/srgb from-scrim/85 from-0% via-scrim/40 via-40% to-scrim/0 to-65% p-6">
                  <h3 className="mb-1 text-2xl text-on-primary">{m.name}</h3>
                  <p className="mb-3 text-base text-text-on-dark">{m.tagline}</p>
                  <span className={cn(moreLinkClass, "text-sm text-on-primary-muted")}>
                    طريقة التحضير
                    <ArrowLeft size={16} className={moreArrowClass} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
