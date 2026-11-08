import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, Coffee, ArrowLeft } from "lucide-react";
import { BREW_METHODS } from "@/features/brewing/brewing";
import Reveal from "@/shared/ui/Reveal";
import styles from "./brewing.module.css";

export const metadata: Metadata = {
  title: "طرق التحضير | التلال",
  description: "V60، موكا، كولد برو، والقهوة العربية بالهيل. خطوة بخطوة.",
};

export default function BrewingPage() {
  return (
    <main className={styles.page}>
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label}>طرق التحضير</p>
          <h1 className={styles.title}>كل طريقة إلها طقس</h1>
          <p>اختار طريقتك، ومنمشي معك خطوة بخطوة لحد ما يصير الفنجان بإيدك.</p>
        </header>

        <div className={styles.grid}>
          {BREW_METHODS.map((m, i) => (
            <Reveal key={m.slug} delay={i * 0.1}>
              <Link href={`/brewing/${m.slug}`} className={styles.card}>
                <div className={styles.media}>
                  <Image
                    src={m.image}
                    alt={m.alt}
                    fill
                    sizes="(max-width: 900px) 100vw, 25vw"
                    className={styles.image}
                  />
                </div>

                <div className={styles.body}>
                  <h2 className={styles.name}>{m.name}</h2>
                  <p className={styles.tagline}>{m.tagline}</p>

                  <ul className={styles.facts}>
                    <li>
                      <Clock size={16} aria-hidden="true" /> {m.time}
                    </li>
                    <li>
                      <Coffee size={16} aria-hidden="true" /> طحنة {m.grind}
                    </li>
                  </ul>

                  <span className={styles.more}>
                    طريقة التحضير
                    <ArrowLeft size={16} />
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
