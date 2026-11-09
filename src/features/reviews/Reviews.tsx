"use client";

import { mutate } from "swr";
import { apiKeys } from "@/lib/api/client";
import DataSection from "@/components/ui/DataSection";
import Section from "@/components/ui/Section";
import SectionLabel from "@/components/ui/SectionLabel";
import ReviewsMarquee from "./ReviewsMarquee";
import ReviewsSkeleton from "./ReviewsSkeleton";
import { fetchReviews } from "./reviews.api";

const retry = () => mutate(apiKeys.reviews, fetchReviews(apiKeys.reviews));

export default function Reviews() {
  return (
    <Section className="overflow-hidden sm:py-28">
      <div className="container mb-12 text-center">
        <SectionLabel>آراء العملاء</SectionLabel>
        <h2>من فناجين زباينا</h2>
      </div>

      <DataSection
        loading={<ReviewsSkeleton />}
        errorMessage="ما قدرنا نجيب آراء الزباين هلق"
        retry={retry}
      >
        <ReviewsMarquee />
      </DataSection>
    </Section>
  );
}
