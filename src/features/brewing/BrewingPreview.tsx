"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import Section from "@/components/ui/Section";
import CardGrid from "@/components/ui/CardGrid";
import MoreHint from "@/components/ui/MoreHint";
import PhotoScrim from "@/components/ui/PhotoScrim";
import SectionLabel from "@/components/ui/SectionLabel";
import ZoomImage from "@/components/ui/ZoomImage";

export default function BrewingPreview() {
  return (
    <Section tone="muted" className="sm:py-28">
      <div className="container">
        <div className="mb-14 text-center">
          <SectionLabel>طرق التحضير</SectionLabel>
          <h2>كل طريقة إلها طقس</h2>
        </div>

        <CardGrid layout="fluid4">
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
                <ZoomImage
                  src={m.image}
                  alt={m.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  zoom="lg"
                />
                <PhotoScrim className="flex flex-col justify-end p-6">
                  <h3 className="mb-1 text-2xl text-on-photo">{m.name}</h3>
                  <p className="mb-3 text-base text-text-on-dark">{m.tagline}</p>
                  <MoreHint tone="onPhoto" arrowSize={16}>
                    طريقة التحضير
                  </MoreHint>
                </PhotoScrim>
              </Link>
            </motion.div>
          ))}
        </CardGrid>
      </div>
    </Section>
  );
}
