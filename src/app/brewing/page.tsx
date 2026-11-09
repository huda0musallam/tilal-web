import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Coffee } from "lucide-react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import Badge from "@/components/ui/Badge";
import CardGrid from "@/components/ui/CardGrid";
import { cardStyles } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import MoreHint from "@/components/ui/MoreHint";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import ZoomImage from "@/components/ui/ZoomImage";
import { cn } from "@/lib/cn";

const factBadgeClass = "gap-1.5 rounded-pill font-normal";

export const metadata: Metadata = {
  title: "طرق التحضير | التلال",
  description: "V60، موكا، كولد برو، والقهوة العربية بالهيل. خطوة بخطوة.",
};

export default function BrewingPage() {
  return (
    <Page>
      <PageHeader label="طرق التحضير" title="كل طريقة إلها طقس" width="narrow" spacing="lg">
        اختار طريقتك، ومنمشي معك خطوة بخطوة لحد ما يصير الفنجان بإيدك.
      </PageHeader>

      <CardGrid layout="wide2">
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
                <ZoomImage src={m.image} alt={m.alt} fill sizes="(max-width: 900px) 100vw, 25vw" />
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

                <MoreHint arrowSize={16} className="mt-auto pt-2">
                  طريقة التحضير
                </MoreHint>
              </div>
            </Link>
          </Reveal>
        ))}
      </CardGrid>
    </Page>
  );
}
