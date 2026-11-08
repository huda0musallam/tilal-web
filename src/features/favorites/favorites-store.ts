import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type FavoritesState = {
  ids: string[];
};

export const useFavoritesStore = create<FavoritesState>()(
  persist((): FavoritesState => ({ ids: [] }), {
    name: "tilal-favorites",
    storage: createJSONStorage(() => localStorage),
    skipHydration: true,
  }),
);

const set = useFavoritesStore.setState;
const get = useFavoritesStore.getState;

export const favorites = {
  toggle(id: string): boolean {
    const ids = get().ids;
    const isOn = ids.includes(id);
    set({ ids: isOn ? ids.filter((x) => x !== id) : [...ids, id] });
    return !isOn;
  },
};

export const useIsFavorite = (id: string) => useFavoritesStore((s) => s.ids.includes(id));
export const useFavoritesCount = () => useFavoritesStore((s) => s.ids.length);
export const useFavoriteIds = () => useFavoritesStore((s) => s.ids);
