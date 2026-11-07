"use client";
import { Star } from "lucide-react";
import useSWR from "swr";
import { apiKeys, fetchReviews } from "@/lib/api";

import styles from "./Reviews.module.css";

function Stars({ rating }: { rating: number }) {
  return (
    <div className={styles.stars} role="img" aria-label={`تقييم ${rating} من 5`}>
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

export default function Reviews() {
  // إذا لسه عم يحمّل أو صار خطأ، منخفي القسم
  const { data: reviews } = useSWR(apiKeys.reviews, fetchReviews);
  if (!reviews || reviews.length === 0) return null;

  // منكرر الآراء مرتين عشان الشريط يضل مليان ويلف بدون فراغ
  const loop = [...reviews, ...reviews];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>آراء العملاء</p>
        <h2>من فناجين زباينا</h2>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track} style={{ animationDuration: `${reviews.length * 7}s` }}>
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
