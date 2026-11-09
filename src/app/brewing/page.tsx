import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Coffee, ArrowLeft } from "lucide-react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import Badge from "@/components/ui/Badge";
import { cardStyles } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import {
  moreArrowClass,
  moreLinkClass,
  pageClass,
  pageLabelClass,
  zoomImageClass,
} from "@/components/ui/shared-classes";
import { cn } from "@/lib/cn";

const factBadgeClass = "gap-1.5 rounded-pill font-normal";

export const metadata: Metadata = {
  title: "طرق التحضير | التلال",
  description: "V60، موكا، كولد برو، والقهوة العربية بالهيل. خطوة بخطوة.",
};

export default function BrewingPage() {
  return (
    <main className={pageClass}>
      <div className="container">
        <header className="mx-auto mb-12 max-w-155 text-center">
          <p className={pageLabelClass}>طرق التحضير</p>
          <h1 className="mb-2">كل طريقة إلها طقس</h1>
          <p>اختار طريقتك، ومنمشي معك خطوة بخطوة لحد ما يصير الفنجان بإيدك.</p>
        </header>

        <div className="mx-auto grid max-w-180 grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {BREW_METHODS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.1}>
              <Link
                href={`/brewing/${m.slug}`}
                className={cn(
                  cardStyles({ radius: "card", padding: "none", lift: true }),
                  "group grid h-full grid-cols-1 overflow-hidden hover:-translate-y-1 sm:flex",
                )}
              >
                <div className="relative aspect-16/10 min-h-0 overflow-hidden sm:aspect-auto sm:min-h-55 sm:w-55 sm:shrink-0">
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 25vw"
                    className={cn(zoomImageClass, "group-hover:scale-105")}
                  />
                </div>

                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h2 className="text-3xl">{m.name}</h2>
                  <p className="text-muted-ink">{m.tagline}</p>

                  <ul className="mt-1 flex list-none flex-wrap gap-2">
                    <li>
                      <Badge variant="plain" className={factBadgeClass}>
                        <Clock size={16} aria-hidden="true" /> {m.time}
                      </Badge>
                    </li>
                    <li>
                      <Badge variant="plain" className={factBadgeClass}>
                        <Coffee size={16} aria-hidden="true" /> طحنة {m.grind}
                      </Badge>
                    </li>
                  </ul>

                  <span className={cn(moreLinkClass, "mt-auto pt-2 text-primary")}>
                    طريقة التحضير
                    <ArrowLeft size={16} className={moreArrowClass} />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
