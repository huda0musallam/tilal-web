import { Star } from "lucide-react";
import { getReviews } from "@/lib/api";
import type { Review } from "@/types";
import styles from "./Reviews.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className={styles.stars}
      role="img"
      aria-label={`تقييم ${rating} من 5`}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          fill={n <= rating ? "currentColor" : "none"}
          className={n <= rating ? styles.starOn : styles.starOff}
        />
      ))}
    </div>
  );
}

export default async function Reviews() {
  let reviews: Review[];

  try {
    reviews = await getReviews();
  } catch {
    return null; // إذا الـ API طافي منخفي القسم
  }

  if (reviews.length === 0) return null;

  // منكرر الآراء مرتين عشان الشريط يضل مليان ويلف بدون فراغ
  const loop = [...reviews, ...reviews];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>آراء العملاء</p>
        <h2>من فناجين زباينا</h2>
      </div>

      <div className={styles.marquee}>
        <div
          className={styles.track}
          style={{ animationDuration: `${reviews.length * 7}s` }}
        >
          {loop.map((review, i) => (
            <figure
              key={`${review.id}-${i}`}
              className={styles.card}
              aria-hidden={i >= reviews.length ? true : undefined}
            >
              <Stars rating={review.rating} />
              <blockquote className={styles.text}>{review.text}</blockquote>
              <figcaption className={styles.name}>{review.name}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
