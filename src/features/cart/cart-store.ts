import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem } from "./cart.types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (): CartState => ({
      items: [],
      isOpen: false,
    }),
    {
      name: "tilal-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    },
  ),
);

const set = useCartStore.setState;
const get = useCartStore.getState;

export const cart = {
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const { items } = get();
    const exists = items.some((i) => i.key === item.key);
    set({
      items: exists
        ? items.map((i) => (i.key === item.key ? { ...i, qty: i.qty + qty } : i))
        : [...items, { ...item, qty }],
    });
  },

  setQty(key: string, qty: number): void {
    if (qty < 1) {
      cart.remove(key);
      return;
    }
    set({ items: get().items.map((i) => (i.key === key ? { ...i, qty } : i)) });
  },

  remove(key: string) {
    set({ items: get().items.filter((i) => i.key !== key) });
  },

  clear() {
    set({ items: [] });
  },

  open() {
    set({ isOpen: true });
  },

  close() {
    set({ isOpen: false });
  },
};

export function useCart() {
  const items = useCartStore((s) => s.items);
  const isOpen = useCartStore((s) => s.isOpen);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const total = items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);

  return { items, isOpen, count, total };
}
export function useCartCount() {
  return useCartStore((s) => s.items.reduce((sum, i) => sum + i.qty, 0));
}
