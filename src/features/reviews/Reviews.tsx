"use client";

import { mutate } from "swr";
import { apiKeys } from "@/lib/client";
import DataSection from "@/components/ui/DataSection";
import ReviewsMarquee from "./ReviewsMarquee";
import ReviewsSkeleton from "./ReviewsSkeleton";
import { fetchReviews } from "./reviews.api";
import styles from "./Reviews.module.css";

const retry = () => mutate(apiKeys.reviews, fetchReviews(apiKeys.reviews));

export default function Reviews() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.head}`}>
        <p className={styles.label}>آراء العملاء</p>
        <h2>من فناجين زباينا</h2>
      </div>

      <DataSection
        loading={<ReviewsSkeleton />}
        errorMessage="ما قدرنا نجيب آراء الزباين هلق"
        retry={retry}
      >
        <ReviewsMarquee />
      </DataSection>
    </section>
  );
}
