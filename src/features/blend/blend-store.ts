import { create } from "zustand";
import type { Cardamom, Roast, Weight } from "@/features/products/product.types";
import type { Bean } from "./bean.types";
import { defaultShares } from "./blend.logic";
import type { Grind, Shares } from "./blend.types";

type BlendState = {
  total: Weight;
  shares: Shares | null;
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

function evenShares(ids: string[]) {
  const base = Math.floor(10 / ids.length) * 10;
  const extra = (100 - base * ids.length) / 10;
  const result: Shares = {};
  ids.forEach((id, i) => {
    result[id] = base + (i < extra ? 10 : 0);
  });
  return result;
}

export const blend = {
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

  toggleBean(id: string, current: Shares) {
    const ids =
      id in current ? Object.keys(current).filter((x) => x !== id) : [...Object.keys(current), id];
    set({ shares: ids.length > 0 ? evenShares(ids) : {} });
  },

  setShare(id: string, value: number, current: Shares) {
    set({ shares: { ...current, [id]: value } });
  },

  distribute(current: Shares) {
    set({ shares: evenShares(Object.keys(current)) });
  },
};

export function useShares(beans: readonly Bean[]): Shares {
  const stored = useBlendStore((s) => s.shares);
  return stored ?? defaultShares(beans);
}
