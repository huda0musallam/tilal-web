"use client";

import useSWR from "swr";
import { apiKeys } from "@/lib/api/client";
import EmptyState from "@/components/ui/EmptyState";
import { fetchBeans } from "./beans.api";
import BeansStep from "./BeansStep";
import BlendSummary from "./BlendSummary";
import CardamomStep from "./CardamomStep";
import GrindStep from "./GrindStep";
import RoastStep from "./RoastStep";
import TotalStep from "./TotalStep";

export default function BlendBuilder() {
  const { data: beans = [] } = useSWR(apiKeys.beans, fetchBeans, { suspense: true });

  if (beans.length === 0) {
    return <EmptyState title="ما في أنواع بن متوفرة للخلطة هلق. ارجعلنا كمان شوي." />;
  }

  return (
    <div className="grid grid-cols-1 items-start gap-10 lg:flex">
      <div className="grid gap-5 lg:min-w-0 lg:flex-16">
        <TotalStep />
        <BeansStep beans={beans} />
        <RoastStep />
        <GrindStep />
        <CardamomStep />
      </div>
      <BlendSummary beans={beans} />
    </div>
  );
}
