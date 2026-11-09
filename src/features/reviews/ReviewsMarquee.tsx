"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/client";
import EmptyState from "@/components/ui/EmptyState";
import { fetchReviews } from "./reviews.api";
import Stars from "./Stars";
import styles from "./ReviewsMarquee.module.css";

export default function ReviewsMarquee() {
  const { data: reviews = [] } = useSWR(apiKeys.reviews, fetchReviews, { suspense: true });

  if (reviews.length === 0) {
    return <EmptyState title="لسا ما في آراء. كون أول حدا يكتبلنا رأيه تحت." />;
  }

  const loop = [
    ...reviews.map((review) => ({ key: review.id, review, copy: false })),
    ...reviews.map((review) => ({ key: `${review.id}-copy`, review, copy: true })),
  ];

  return (
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
  );
}
