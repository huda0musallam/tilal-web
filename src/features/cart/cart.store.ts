import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { isRecord } from "@/shared/api/guards";
import { parseLines } from "./cart.guards";
import {
  addLine,
  cartCount,
  keepKnownBeans,
  keepKnownProducts,
  removeLine,
  setQty,
} from "./cart.logic";
import type { CartLine } from "./cart.types";

type CartState = {
  lines: CartLine[];
  isOpen: boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (): CartState => ({
      lines: [],
      isOpen: false,
    }),
    {
      name: "tilal-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ lines: state.lines }),
      merge: (persisted, current) => ({
        ...current,
        lines: isRecord(persisted) ? parseLines(persisted.lines) : [],
      }),
      skipHydration: true,
    },
  ),
);

const set = useCartStore.setState;
const get = useCartStore.getState;

export const cart = {
  add(line: CartLine) {
    set({ lines: addLine(get().lines, line) });
  },

  setQty(key: string, qty: number) {
    set({ lines: setQty(get().lines, key, qty) });
  },

  remove(key: string) {
    set({ lines: removeLine(get().lines, key) });
  },

  keepProducts(productIds: readonly string[]) {
    const lines = get().lines;
    const kept = keepKnownProducts(lines, productIds);
    if (kept.length !== lines.length) set({ lines: kept });
  },

  keepBeans(beanIds: readonly string[]) {
    const lines = get().lines;
    const kept = keepKnownBeans(lines, beanIds);
    if (kept.length !== lines.length) set({ lines: kept });
  },

  clear() {
    set({ lines: [] });
  },

  open() {
    set({ isOpen: true });
  },

  close() {
    set({ isOpen: false });
  },
};

export const useCartLines = () => useCartStore((s) => s.lines);
export const useCartOpen = () => useCartStore((s) => s.isOpen);
export const useCartCount = () => useCartStore((s) => cartCount(s.lines));

export function useCart() {
  const count = useCartCount();
  return { count };
}
