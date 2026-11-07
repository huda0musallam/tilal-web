import type { Bean, Product, Review, Suggestion } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://tilal-api.onrender.com";

// دالة عامة لجلب البيانات
async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`ما قدرنا نجيب البيانات من ${path}`);
  }
  return res.json();
}

// المنتجات
export function getProducts() {
  return get<Product[]>("/products");
}

export async function getFeaturedProducts() {
  const products = await getProducts();
  return products.filter((product) => product.featured);
}

// أنواع البن لصفحة الخلطة
export function getBeans() {
  return get<Bean[]>("/beans");
}

// آراء العملاء
export function getReviews() {
  return get<Review[]>("/reviews");
}

// إرسال اقتراح
export async function sendSuggestion(data: Omit<Suggestion, "id">) {
  const res = await fetch(`${API_URL}/suggestions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("ما قدرنا نبعت الاقتراح");
  }
  return res.json() as Promise<Suggestion>;
}
