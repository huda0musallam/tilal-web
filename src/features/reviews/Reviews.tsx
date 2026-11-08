"use client";
import useSWR from "swr";
import { apiKeys } from "@/shared/api/api";
import { fetchReviews } from "./reviews.api";

import Stars from "./Stars";
import styles from "./Reviews.module.css";

export default function Reviews() {
  const { data: reviews } = useSWR(apiKeys.reviews, fetchReviews);
  if (!reviews || reviews.length === 0) return null;

  const loop = [
    ...reviews.map((review) => ({ key: review.id, review, copy: false })),
    ...reviews.map((review) => ({ key: `${review.id}-copy`, review, copy: true })),
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>آراء العملاء</p>
        <h2>من فناجين زباينا</h2>
      </div>

      <div className={styles.marquee}>
        <div className={styles.track} style={{ animationDuration: `${reviews.length * 7}s` }}>
          {loop.map(({ key, review, copy }) => (
            <figure key={key} className={styles.card} aria-hidden={copy ? true : undefined}>
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
