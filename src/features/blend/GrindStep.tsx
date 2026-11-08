"use client";

import Chips from "@/shared/ui/Chips";
import { blend, useBlendStore } from "./blend-store";
import { GRIND_OPTIONS } from "./blend.options";
import Step from "./Step";

export default function GrindStep() {
  const grind = useBlendStore((s) => s.grind);
  return (
    <Step n={4} title="الطحنة" hint="إذا ما بتعرف، اختار حبوب كاملة وطحنها قبل التحضير.">
      <Chips options={GRIND_OPTIONS} value={grind} onChange={blend.setGrind} label="الطحنة" />
    </Step>
  );
}
