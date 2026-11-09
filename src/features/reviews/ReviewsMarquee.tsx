"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/api/client";
import { cardStyles } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/cn";
import { fetchReviews } from "./reviews.api";
import Stars from "./Stars";

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
    <div className="group overflow-hidden mask-x-from-92% mask-x-to-100%">
      <div
        className="flex w-max animate-marquee gap-5 py-2 group-hover:paused"
        style={{ animationDuration: `${reviews.length * 7}s` }}
      >
        {loop.map(({ key, review, copy }) => (
          <figure
            key={key}
            className={cn(
              cardStyles({ radius: "card" }),
              "flex w-67.5 shrink-0 flex-col gap-3 sm:w-80",
            )}
            aria-hidden={copy ? true : undefined}
          >
            <Stars rating={review.rating} />
            <blockquote className="flex-1 text-base text-ink">{review.text}</blockquote>
            <figcaption className="text-sm font-bold text-muted-ink">{review.name}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
