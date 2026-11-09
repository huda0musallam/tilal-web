"use client";

import { CARDAMOM_OPTIONS } from "@/features/products/product.options";
import Chips from "@/components/ui/Chips";
import { blend, useBlendStore } from "./blend.store";
import Step from "./Step";

export default function CardamomStep() {
  const cardamom = useBlendStore((s) => s.cardamom);
  return (
    <Step n={5} title="الهيل">
      <Chips
        options={CARDAMOM_OPTIONS}
        value={cardamom}
        onChange={blend.setCardamom}
        label="الهيل"
      />
    </Step>
  );
}
