import { ApiError, apiKeys, fetchJson } from "@/lib/client";
import { isListOf, isNumber, isOneOf, isRecord, isString } from "@/shared/api/guards";
import { ROAST_OPTIONS } from "./product.options";
import type { Product } from "./product.types";

const isRoast = isOneOf(ROAST_OPTIONS.map((o) => o.value));

function isProduct(v: unknown): v is Product {
  if (!isRecord(v)) return false;
  const prices = v.prices;
  if (!isRecord(prices)) return false;

  return (
    isString(v.id) &&
    isString(v.name) &&
    isString(v.origin) &&
    isRoast(v.roast) &&
    isString(v.image) &&
    isString(v.notes) &&
    isNumber(prices["250"]) &&
    isNumber(prices["500"]) &&
    isNumber(prices["1000"]) &&
    typeof v.cardamom === "boolean" &&
    typeof v.featured === "boolean"
  );
}

const isProductList = isListOf(isProduct);

export const fetchProducts = (url: string) => fetchJson(url, isProductList);
export const getProducts = () => fetchProducts(apiKeys.products);

export async function fetchProduct(url: string) {
  try {
    return await fetchJson(url, isProduct);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

export const getProduct = (id: string) => fetchProduct(apiKeys.product(id));
