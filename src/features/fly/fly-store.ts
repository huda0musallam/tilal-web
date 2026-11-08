import { create } from "zustand";

export type FlyTarget = "cart" | "favorites";

type Box = { x: number; y: number; size: number };

type Flight = {
  id: number;
  image: string;
  from: Box;
  to: Box;
  target: FlyTarget;
};

type FlyState = {
  flights: Flight[];
  bump: Record<FlyTarget, number>;
};

export const useFlyStore = create<FlyState>()((): FlyState => ({
  flights: [],
  bump: { cart: 0, favorites: 0 },
}));

const set = useFlyStore.setState;
const get = useFlyStore.getState;
let nextId = 0;

function bump(target: FlyTarget) {
  const current = get().bump;
  set({ bump: { ...current, [target]: current[target] + 1 } });
}

export function flyTo(target: FlyTarget, image: string, fromEl: HTMLElement | null) {
  const toEl = document.querySelector<HTMLElement>(`[data-fly-target="${target}"]`);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!fromEl || !toEl || reduceMotion) {
    bump(target);
    return;
  }

  const a = fromEl.getBoundingClientRect();
  const b = toEl.getBoundingClientRect();
  const size = Math.min(a.width, a.height, 160);

  const flight: Flight = {
    id: nextId++,
    image,
    target,
    from: { x: a.left + a.width / 2 - size / 2, y: a.top + a.height / 2 - size / 2, size },
    to: { x: b.left + b.width / 2 - 12, y: b.top + b.height / 2 - 12, size: 24 },
  };

  set({ flights: [...get().flights, flight] });
}

export function landed(id: number) {
  const flight = get().flights.find((f) => f.id === id);
  set({ flights: get().flights.filter((f) => f.id !== id) });
  if (flight) bump(flight.target);
}
