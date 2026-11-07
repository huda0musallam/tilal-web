import { create } from "zustand";
import type { Cardamom, Roast, Weight } from "@/types";

export type Grind = "whole" | "arabic" | "filter" | "moka" | "turkish";

type BlendState = {
  total: Weight;
  shares: Record<string, number> | null; // null يعني لسه ما اخترنا ولا نوع
  roast: Roast;
  grind: Grind;
  cardamom: Cardamom;
};

export const useBlendStore = create<BlendState>()((): BlendState => ({
  total: "250",
  shares: null,
  roast: "medium",
  grind: "whole",
  cardamom: "none",
}));

const set = useBlendStore.setState;
const get = useBlendStore.getState;

// نوزع 100% على الأنواع المختارة بخطوات 10%
function evenShares(ids: string[]) {
  const base = Math.floor(10 / ids.length) * 10;
  const extra = (100 - base * ids.length) / 10;
  const result: Record<string, number> = {};
  ids.forEach((id, i) => {
    result[id] = base + (i < extra ? 10 : 0);
  });
  return result;
}

// ===== الأفعال =====
export const blend = {
  // أول مرة بس: منختار أول نوع بن بـ 100%
  init(firstBeanId?: string) {
    if (get().shares === null) {
      set({ shares: firstBeanId ? { [firstBeanId]: 100 } : {} });
    }
  },

  setTotal(total: Weight) {
    set({ total });
  },

  setRoast(roast: Roast) {
    set({ roast });
  },

  setGrind(grind: Grind) {
    set({ grind });
  },

  setCardamom(cardamom: Cardamom) {
    set({ cardamom });
  },

  toggleBean(id: string) {
    const current = get().shares ?? {};
    const ids =
      id in current ? Object.keys(current).filter((x) => x !== id) : [...Object.keys(current), id];
    set({ shares: ids.length > 0 ? evenShares(ids) : {} });
  },

  setShare(id: string, value: number) {
    set({ shares: { ...(get().shares ?? {}), [id]: value } });
  },

  distribute() {
    set({ shares: evenShares(Object.keys(get().shares ?? {})) });
  },
};

// قيمة فاضية ثابتة: إذا رجّعنا {} جديد بكل مرة، React بيفكر إنها تغيرت وبيعيد الرسم بلا نهاية
const EMPTY: Record<string, number> = {};

export function useShares() {
  return useBlendStore((s) => s.shares ?? EMPTY);
}
