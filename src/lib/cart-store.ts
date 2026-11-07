import { useSyncExternalStore } from "react";
import type { CartItem } from "@/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

const STORAGE_KEY = "tilal-cart";
const SERVER_STATE: CartState = { items: [], isOpen: false };

let state: CartState = { items: [], isOpen: false };
let loaded = false;
const listeners = new Set<() => void>();

// نقرا السلة المحفوظة من المتصفح أول مرة بس
function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) state = { ...state, items: JSON.parse(saved) };
  } catch {
    // إذا المتصفح مانع التخزين، منكمل بسلة فاضية
  }
}

function update(next: Partial<CartState>) {
  state = { ...state, ...next };
  if (next.items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {}
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  load();
  return state;
}

function getServerSnapshot() {
  return SERVER_STATE;
}

// ===== الأفعال =====
export const cart = {
  add(item: Omit<CartItem, "qty">, qty = 1) {
    const exists = state.items.some((i) => i.key === item.key);
    const items = exists
      ? state.items.map((i) =>
          i.key === item.key ? { ...i, qty: i.qty + qty } : i,
        )
      : [...state.items, { ...item, qty }];
    update({ items, isOpen: true });
  },

  setQty(key: string, qty: number) {
    if (qty < 1) return cart.remove(key);
    update({
      items: state.items.map((i) => (i.key === key ? { ...i, qty } : i)),
    });
  },

  remove(key: string) {
    update({ items: state.items.filter((i) => i.key !== key) });
  },

  clear() {
    update({ items: [] });
  },

  open() {
    update({ isOpen: true });
  },

  close() {
    update({ isOpen: false });
  },
};

// ===== الـ hook اللي بتستخدمه الـ components =====
export function useCart() {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const count = current.items.reduce((sum, i) => sum + i.qty, 0);
  const total = current.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0);
  return { ...current, count, total };
}
