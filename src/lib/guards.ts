import type { Bean, Product, Review, Suggestion } from "@/types";

type UnknownRecord = Record<string, unknown>;

const isRecord = (v: unknown): v is UnknownRecord => typeof v === "object" && v !== null;
const isString = (v: unknown): v is string => typeof v === "string";
const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const isOptionalString = (v: unknown) => v === undefined || isString(v);

const ROASTS: readonly string[] = ["light", "medium", "dark"];

export function isProduct(v: unknown): v is Product {
  if (!isRecord(v)) return false;
  const prices = v.prices;
  if (!isRecord(prices)) return false;

  return (
    isString(v.id) &&
    isString(v.name) &&
    isString(v.origin) &&
    isString(v.roast) &&
    ROASTS.includes(v.roast) &&
    isString(v.image) &&
    isString(v.notes) &&
    isNumber(prices["250"]) &&
    isNumber(prices["500"]) &&
    isNumber(prices["1000"]) &&
    typeof v.cardamom === "boolean" &&
    typeof v.featured === "boolean"
  );
}

export function isBean(v: unknown): v is Bean {
  return (
    isRecord(v) &&
    isString(v.id) &&
    isString(v.name) &&
    isNumber(v.pricePerGram) &&
    isString(v.notes)
  );
}

export function isReview(v: unknown): v is Review {
  return (
    isRecord(v) && isString(v.id) && isString(v.name) && isString(v.text) && isNumber(v.rating)
  );
}

export function isSuggestion(v: unknown): v is Suggestion {
  return (
    isRecord(v) &&
    isOptionalString(v.id) &&
    isOptionalString(v.name) &&
    isString(v.message) &&
    isNumber(v.rating) &&
    isString(v.createdAt)
  );
}

// بيحوّل guard لعنصر واحد لـ guard لقائمة
function isListOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => Array.isArray(v) && v.every(guard);
}

export const isProductList = isListOf(isProduct);
export const isBeanList = isListOf(isBean);
export const isReviewList = isListOf(isReview);
