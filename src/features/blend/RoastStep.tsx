"use client";

import { ROAST_OPTIONS } from "@/features/products/product.options";
import Chips from "@/components/ui/Chips";
import { blend, useBlendStore } from "./blend.store";
import Step from "./Step";

export default function RoastStep() {
  const roast = useBlendStore((s) => s.roast);
  return (
    <Step n={3} title="درجة التحميص">
      <Chips options={ROAST_OPTIONS} value={roast} onChange={blend.setRoast} label="درجة التحميص" />
    </Step>
  );
}
