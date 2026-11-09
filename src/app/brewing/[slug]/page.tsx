import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Clock, Scale, Coffee, Flame, Lightbulb, Check } from "lucide-react";
import { BREW_METHODS, getMethod } from "@/features/brewing/brewing";
import { roastLabel } from "@/features/products/product.options";
import RoastBadge from "@/features/products/RoastBadge";
import BackLink from "@/components/ui/BackLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Circle from "@/components/ui/Circle";
import MessageBox from "@/components/ui/MessageBox";
import PhotoScrim from "@/components/ui/PhotoScrim";
import { cardStyles } from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SideColumn from "@/components/ui/SideColumn";
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
    { icon: Flame, label: "التحميص المناسب", value: <RoastBadge roast={method.roast} /> },
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
        <PhotoScrim fade="long" />
        <div className="relative z-1 container py-12">
          <BackLink href="/brewing" tone="onPhoto" className="mb-3">
            كل الطرق
          </BackLink>
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
          <SideColumn className="order-2 lg:order-none">
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

            <MessageBox tone="callout" title="القهوة المناسبة لهالطريقة">
              <ButtonLink href={`/products?roast=${method.roast}`}>
                شوف القهوة ال{roastLabel(method.roast)}
              </ButtonLink>
            </MessageBox>
          </SideColumn>

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
                  <Circle tone="inverse">{i + 1}</Circle>
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
              <ButtonLink
                key={m.slug}
                href={`/brewing/${m.slug}`}
                variant="chip"
                size="chip"
                className="bg-transparent hover:bg-muted-surface"
              >
                {m.name}
              </ButtonLink>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
