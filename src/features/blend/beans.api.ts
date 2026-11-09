import { apiKeys, fetchJson } from "@/lib/client";
import { isListOf, isNumber, isRecord, isString } from "@/shared/api/guards";
import type { Bean } from "./bean.types";

function isBean(v: unknown): v is Bean {
  return (
    isRecord(v) &&
    isString(v.id) &&
    isString(v.name) &&
    isNumber(v.pricePerGram) &&
    isString(v.notes)
  );
}

const isBeanList = isListOf(isBean);

export const fetchBeans = (url: string) => fetchJson(url, isBeanList);
export const getBeans = () => fetchBeans(apiKeys.beans);
