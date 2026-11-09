"use client";

import { motion } from "motion/react";
import { landed, useFlyStore } from "./fly.store";

export default function FlyLayer() {
  const flights = useFlyStore((s) => s.flights);

  return (
    <div className="pointer-events-none fixed inset-0 z-200" aria-hidden="true">
      {flights.map((f) => {
        const midX = (f.from.x + f.to.x) / 2;
        const peakY = Math.max(8, Math.min(f.from.y, f.to.y) - 80);

        return (
          <motion.div
            key={f.id}
            className="absolute top-0 left-0 rounded-thumb bg-cover bg-center shadow-fly"
            style={{ backgroundImage: `url(${f.image})` }}
            initial={{ x: f.from.x, y: f.from.y, width: f.from.size, height: f.from.size }}
            animate={{
              x: [f.from.x, midX, f.to.x],
              y: [f.from.y, peakY, f.to.y],
              width: f.to.size,
              height: f.to.size,
              opacity: [1, 1, 0.5],
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            onAnimationComplete={() => landed(f.id)}
          />
        );
      })}
    </div>
  );
}
