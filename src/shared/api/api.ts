const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://tilal-api.onrender.com";

export const apiKeys = {
  products: `${API_URL}/products`,
  beans: `${API_URL}/beans`,
  reviews: `${API_URL}/reviews`,
  suggestions: `${API_URL}/suggestions`,
};

export async function fetchJson<T>(
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
