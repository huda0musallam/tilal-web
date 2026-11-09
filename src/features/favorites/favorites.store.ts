import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isRecord, isString } from "@/lib/api/guards";

function parseIds(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  const ids: string[] = [];
  for (const id of v) {
    if (isString(id) && !ids.includes(id)) ids.push(id);
  }
  return ids;
}

type FavoritesState = {
  ids: string[];
};

export const useFavoritesStore = create<FavoritesState>()(
  persist((): FavoritesState => ({ ids: [] }), {
    name: "tilal-favorites",
    storage: createJSONStorage(() => localStorage),
    merge: (persisted, current) => ({
      ...current,
      ids: isRecord(persisted) ? parseIds(persisted.ids) : [],
    }),
    skipHydration: true,
  }),
);

const NO_IDS: readonly string[] = [];

const set = useFavoritesStore.setState;
const get = useFavoritesStore.getState;

export const favorites = {
  keep(productIds: readonly string[]) {
    const ids = get().ids;
    const kept = ids.filter((id) => productIds.includes(id));
    if (kept.length !== ids.length) set({ ids: kept });
  },

  toggle(id: string): boolean {
    const ids = get().ids;
    const isOn = ids.includes(id);
    set({ ids: isOn ? ids.filter((x) => x !== id) : [...ids, id] });
    return !isOn;
  },
};

export const useIsFavorite = (id: string) => useFavoritesStore((s) => s.ids.includes(id));
export const useFavoritesCount = () => useFavoritesStore((s) => s.ids.length);
export const useFavoriteIds = (enabled: boolean) =>
  useFavoritesStore((s) => (enabled ? s.ids : NO_IDS));
