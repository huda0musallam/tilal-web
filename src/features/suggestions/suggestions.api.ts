import { fetchJson } from "@/shared/api/api";
import { isNumber, isOptionalString, isRecord, isString } from "@/shared/api/guards";
import type { Suggestion } from "./suggestion.types";

function isSuggestion(v: unknown): v is Suggestion {
  return (
    isRecord(v) &&
    isOptionalString(v.id) &&
    isOptionalString(v.name) &&
    isString(v.message) &&
    isNumber(v.rating) &&
    isString(v.createdAt)
  );
}

export function postSuggestion(url: string, { arg }: { arg: Omit<Suggestion, "id"> }) {
  return fetchJson(url, isSuggestion, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(arg),
  });
}
