"use client";

import { WEIGHT_OPTIONS } from "@/features/products/product.options";
import Chips from "@/components/ui/Chips";
import { blend, useBlendStore } from "./blend.store";
import Step from "./Step";

export default function TotalStep() {
  const total = useBlendStore((s) => s.total);
  return (
    <Step n={1} title="الكمية الكلية">
      <Chips
        options={WEIGHT_OPTIONS}
        value={total}
        onChange={blend.setTotal}
        label="الكمية الكلية"
      />
    </Step>
  );
}
