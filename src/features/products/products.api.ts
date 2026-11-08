import { apiKeys, fetchJson } from "@/shared/api/api";
import { isListOf, isNumber, isOneOf, isRecord, isString } from "@/shared/api/guards";
import type { Product, Roast } from "./product.types";

const isRoast = isOneOf<Roast>(["light", "medium", "dark"]);

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
