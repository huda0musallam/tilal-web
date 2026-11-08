import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, Clock, Scale, Coffee, Flame, Lightbulb, Check } from "lucide-react";
import { BREW_METHODS, getMethod } from "@/features/brewing/brewing";
import { roastLabel } from "@/features/products/product.options";
import Reveal from "@/shared/ui/Reveal";
import styles from "./method.module.css";

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
      <section className={styles.hero}>
        <Image
          src={method.image}
          alt={method.alt}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <Link href="/brewing" className={styles.back}>
            <ArrowRight size={18} />
            كل الطرق
          </Link>
          <h1 className={styles.heroTitle}>{method.name}</h1>
          <p className={styles.heroTagline}>{method.tagline}</p>
        </div>
      </section>

      <div className="container">
        <dl className={styles.facts}>
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles.fact}>
              <Icon size={22} strokeWidth={1.8} aria-hidden="true" className={styles.factIcon} />
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.content}>
          <aside className={styles.side}>
            <div className={styles.box}>
              <h2 className={styles.boxTitle}>الأدوات</h2>
              <ul className={styles.list}>
                {method.tools.map((t) => (
                  <li key={t}>
                    <Check size={16} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.box}>
              <h2 className={styles.boxTitle}>المقادير</h2>
              <ul className={styles.list}>
                {method.ingredients.map((t) => (
                  <li key={t}>
                    <Check size={16} aria-hidden="true" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.cta}>
              <p>القهوة المناسبة لهالطريقة</p>
              <Link href={`/products?roast=${method.roast}`} className="btn btn-primary">
                شوف القهوة ال{roastLabel(method.roast)}
              </Link>
            </div>
          </aside>

          <section>
            <h2 className={styles.stepsTitle}>الخطوات</h2>
            <ol className={styles.steps}>
              {method.steps.map((step, i) => (
                <Reveal key={step} as="li" delay={i * 0.08} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <p>{step}</p>
                </Reveal>
              ))}
            </ol>

            <div className={styles.tip}>
              <Lightbulb size={22} aria-hidden="true" />
              <p>
                <strong>نصيحة: </strong>
                {method.tip}
              </p>
            </div>
          </section>
        </div>

        <nav className={styles.others} aria-label="طرق تحضير تانية">
          <p className={styles.othersTitle}>جرّب كمان</p>
          <div className={styles.othersList}>
            {others.map((m) => (
              <Link key={m.slug} href={`/brewing/${m.slug}`} className={styles.otherLink}>
                {m.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}
