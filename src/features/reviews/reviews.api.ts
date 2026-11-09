import { apiKeys, fetchJson } from "@/lib/client";
import { isListOf, isNumber, isRecord, isString } from "@/shared/api/guards";
import type { Review } from "./review.types";

function isReview(v: unknown): v is Review {
  return (
    isRecord(v) && isString(v.id) && isString(v.name) && isString(v.text) && isNumber(v.rating)
  );
}

const isReviewList = isListOf(isReview);

export const fetchReviews = (url: string) => fetchJson(url, isReviewList);
export const getReviews = () => fetchReviews(apiKeys.reviews);
