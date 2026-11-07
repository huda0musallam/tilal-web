import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  Clock,
  Scale,
  Coffee,
  Flame,
  Lightbulb,
  Check,
} from "lucide-react";
import { BREW_METHODS, ROAST_LABEL, getMethod } from "@/data/brewing";
import Reveal from "@/components/ui/Reveal";
import styles from "./method.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

// منقول لـ Next.js شو الروابط الموجودة، فبيجهزها مسبقاً
export function generateStaticParams() {
  return BREW_METHODS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const method = getMethod(slug);
  if (!method) return {};
  return {
    title: `${method.name} | طرق التحضير | التلال`,
    description: method.tagline,
  };
}

// ===== الصفحة: بتفتح فوراً، والمحتوى بيوصل جوا Suspense =====
export default function MethodPage({ params }: Props) {
  return (
    <main>
      <Suspense fallback={<div className={styles.loading} />}>
        <MethodContent params={params} />
      </Suspense>
    </main>
  );
}

// ===== المحتوى: بيقرا الرابط ويعرض الطريقة =====
async function MethodContent({ params }: Props) {
  const { slug } = await params;
  const method = getMethod(slug);

  // إذا الرابط غلط متل /brewing/abc بتطلع صفحة 404
  if (!method) notFound();

  const others = BREW_METHODS.filter((m) => m.slug !== method.slug);

  const facts = [
    { icon: Clock, label: "الوقت", value: method.time },
    { icon: Scale, label: "المقادير", value: method.ratio },
    { icon: Coffee, label: "الطحنة", value: method.grind },
    { icon: Flame, label: "التحميص المناسب", value: ROAST_LABEL[method.roast] },
  ];

  return (
    <>
      {/* ===== الصورة الكبيرة ===== */}
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
        {/* ===== معلومات سريعة ===== */}
        <dl className={styles.facts}>
          {facts.map(({ icon: Icon, label, value }) => (
            <div key={label} className={styles.fact}>
              <Icon
                size={22}
                strokeWidth={1.8}
                aria-hidden="true"
                className={styles.factIcon}
              />
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.content}>
          {/* ===== الأدوات والمقادير ===== */}
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
              <Link
                href={`/products?roast=${method.roast}`}
                className="btn btn-primary"
              >
                شوف القهوة ال{ROAST_LABEL[method.roast]}
              </Link>
            </div>
          </aside>

          {/* ===== الخطوات ===== */}
          <section>
            <h2 className={styles.stepsTitle}>الخطوات</h2>
            <ol className={styles.steps}>
              {method.steps.map((step, i) => (
                <Reveal
                  key={i}
                  as="li"
                  delay={i * 0.08}
                  className={styles.step}
                >
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

        {/* ===== طرق تانية ===== */}
        <nav className={styles.others} aria-label="طرق تحضير تانية">
          <p className={styles.othersTitle}>جرّب كمان</p>
          <div className={styles.othersList}>
            {others.map((m) => (
              <Link
                key={m.slug}
                href={`/brewing/${m.slug}`}
                className={styles.otherLink}
              >
                {m.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
