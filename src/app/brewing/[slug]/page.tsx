import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock, Scale, Coffee, Flame, Lightbulb, Check } from "lucide-react";
import { BREW_METHODS, getMethod } from "@/features/brewing/brewing";
import { roastLabel } from "@/features/products/product.options";
import ButtonLink from "@/components/ui/ButtonLink";
import { cardStyles } from "@/components/ui/Card";
import { chipStyles } from "@/components/ui/Chips";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

const boxClass = cardStyles({ radius: "card", bordered: false });
const boxTitleClass = "mb-3 text-2xl";
const listClass = "grid list-none gap-2.5";
const listItemClass = "flex items-start gap-2 text-ink";
const listIconClass = "mt-1.5 shrink-0 text-primary";

interface MethodPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BREW_METHODS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: MethodPageProps): Promise<Metadata> {
  const { slug } = await params;
  const method = getMethod(slug);
  if (!method) return {};
  return {
    title: `${method.name} | طرق التحضير | التلال`,
    description: method.tagline,
  };
}

export default async function MethodPage({ params }: MethodPageProps) {
  const { slug } = await params;
  const method = getMethod(slug);

  if (!method) notFound();

  const others = BREW_METHODS.filter((m) => m.slug !== method.slug);

  const facts = [
    { icon: Clock, label: "الوقت", value: method.time },
    { icon: Scale, label: "المقادير", value: method.ratio },
    { icon: Coffee, label: "الطحنة", value: method.grind },
    { icon: Flame, label: "التحميص المناسب", value: roastLabel(method.roast) },
  ];

  return (
    <main>
      <section className="relative flex min-h-80 items-end overflow-hidden sm:min-h-105">
        <Image
          src={method.image}
          alt={method.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t/srgb from-scrim/85 from-0% via-scrim/35 via-55% to-scrim/10 to-100%" />
        <div className="relative z-1 container py-12">
          <Link
            href="/brewing"
            className="mb-3 inline-flex items-center gap-1.5 font-medium text-on-primary-muted hover:text-on-primary"
          >
            <ArrowRight size={18} />
            كل الطرق
          </Link>
          <h1 className="text-on-primary">{method.name}</h1>
          <p className="text-xl text-text-on-dark">{method.tagline}</p>
        </div>
      </section>

      <div className="container">
        <dl className="relative z-2 -mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
          {facts.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="grid justify-items-center gap-0.5 bg-surface px-3 py-5 text-center"
            >
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" className="mb-1 text-primary" />
              <dt className="text-xs text-muted-ink">{label}</dt>
              <dd className="font-bold text-ink">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="grid grid-cols-1 items-start gap-8 py-12 lg:flex lg:gap-12 lg:py-16">
          <aside className="top-24 order-2 grid gap-4 lg:sticky lg:order-none lg:flex-10">
            <div className={boxClass}>
              <h2 className={boxTitleClass}>الأدوات</h2>
              <ul className={listClass}>
                {method.tools.map((t) => (
                  <li key={t} className={listItemClass}>
                    <Check size={16} aria-hidden="true" className={listIconClass} /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className={boxClass}>
              <h2 className={boxTitleClass}>المقادير</h2>
              <ul className={listClass}>
                {method.ingredients.map((t) => (
                  <li key={t} className={listItemClass}>
                    <Check size={16} aria-hidden="true" className={listIconClass} /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-3 rounded-card border border-dashed border-accent p-6 text-center">
              <p className="font-bold text-ink">القهوة المناسبة لهالطريقة</p>
              <ButtonLink href={`/products?roast=${method.roast}`}>
                شوف القهوة ال{roastLabel(method.roast)}
              </ButtonLink>
            </div>
          </aside>

          <section className="lg:min-w-0 lg:flex-16">
            <h2 className="mb-6">الخطوات</h2>
            <ol className="grid list-none gap-4">
              {method.steps.map((step, i) => (
                <Reveal
                  key={step}
                  as="li"
                  delay={i * 0.08}
                  className={cn(
                    cardStyles({ tone: "page", padding: "none" }),
                    "flex items-start gap-4 p-5",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-inverse-surface font-bold text-on-inverse">
                    {i + 1}
                  </span>
                  <p className="text-base text-ink">{step}</p>
                </Reveal>
              ))}
            </ol>

            <div className="mt-6 flex items-start gap-3 rounded-panel bg-primary p-5 text-on-primary-muted">
              <Lightbulb size={22} aria-hidden="true" className="mt-1 shrink-0" />
              <p className="text-on-primary">
                <strong>نصيحة: </strong>
                {method.tip}
              </p>
            </div>
          </section>
        </div>

        <nav
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3 border-t border-line pt-8 pb-24"
          aria-label="طرق تحضير تانية"
        >
          <p className="font-bold text-ink">جرّب كمان</p>
          <div className="flex flex-wrap gap-2">
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/brewing/${m.slug}`}
                className={cn(chipStyles(), "bg-transparent hover:bg-muted-surface")}
              >
                {m.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
