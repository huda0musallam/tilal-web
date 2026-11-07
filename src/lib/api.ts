import type { Suggestion } from "@/types";
import { isBeanList, isProductList, isReviewList, isSuggestion } from "./guards";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tilal-api.onrender.com";

// مفاتيح SWR: نفس المفتاح لازم ينستخدم بالسيرفر وبالمتصفح
export const apiKeys = {
  products: `${API_URL}/products`,
  beans: `${API_URL}/beans`,
  reviews: `${API_URL}/reviews`,
  suggestions: `${API_URL}/suggestions`,
};

// بيجيب JSON، وبيتأكد من شكله بالـ guard قبل ما يرجّعه. ما في as ولا any
async function fetchJson<T>(
  url: string,
  guard: (v: unknown) => v is T,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    throw new Error(`ما قدرنا نجيب البيانات من ${url}`);
  }
  const data: unknown = await res.json();
  if (!guard(data)) {
    throw new Error(`البيانات اللي وصلت من ${url} مش بالشكل المتوقع`);
  }
  return data;
}

// fetchers لـ SWR: كل واحد بيفحص نوع البيانات تبعه
export const fetchProducts = (url: string) => fetchJson(url, isProductList);
export const fetchBeans = (url: string) => fetchJson(url, isBeanList);
export const fetchReviews = (url: string) => fetchJson(url, isReviewList);

// للسيرفر: منستخدمهم كقيمة أولية لـ SWR
export const getProducts = () => fetchProducts(apiKeys.products);
export const getBeans = () => fetchBeans(apiKeys.beans);
export const getReviews = () => fetchReviews(apiKeys.reviews);

// لـ useSWRMutation: بياخد المفتاح والبيانات اللي بدنا نبعتها
export function postSuggestion(url: string, { arg }: { arg: Omit<Suggestion, "id"> }) {
  return fetchJson(url, isSuggestion, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}
