export type UnknownRecord = Record<string, unknown>;

export const isRecord = (v: unknown): v is UnknownRecord => typeof v === "object" && v !== null;
export const isString = (v: unknown): v is string => typeof v === "string";
export const isNumber = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
export const isOptionalString = (v: unknown) => v === undefined || isString(v);

export function isOneOf<T extends string>(values: readonly T[]) {
  return (v: unknown): v is T => values.some((value) => value === v);
}

export function isListOf<T>(guard: (v: unknown) => v is T) {
  return (v: unknown): v is T[] => Array.isArray(v) && v.every(guard);
}
