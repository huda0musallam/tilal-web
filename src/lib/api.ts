import type { Bean, Product, Review, Suggestion } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tilal-api.onrender.com";

// مفاتيح SWR: نفس المفتاح لازم ينستخدم بالسيرفر وبالمتصفح
export const apiKeys = {
  products: `${API_URL}/products`,
  beans: `${API_URL}/beans`,
  reviews: `${API_URL}/reviews`,
  suggestions: `${API_URL}/suggestions`,
};

// fetcher واحد لكل طلبات GET، بيشتغل بالسيرفر وبالمتصفح
export async function fetcher<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`ما قدرنا نجيب البيانات من ${url}`);
  }
  return res.json();
}

// للسيرفر: منستخدمهم كقيمة أولية لـ SWR
export const getProducts = () => fetcher<Product[]>(apiKeys.products);
export const getBeans = () => fetcher<Bean[]>(apiKeys.beans);
export const getReviews = () => fetcher<Review[]>(apiKeys.reviews);

// لـ useSWRMutation: بياخد المفتاح والبيانات اللي بدنا نبعتها
export async function postSuggestion(url: string, { arg }: { arg: Omit<Suggestion, "id"> }) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
  if (!res.ok) {
    throw new Error("ما قدرنا نبعت الاقتراح");
  }
  return res.json() as Promise<Suggestion>;
}
