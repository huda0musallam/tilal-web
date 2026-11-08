"use client";

import useSWR from "swr";
import { apiKeys } from "@/shared/api/client";
import EmptyState from "@/shared/ui/EmptyState";
import { fetchBeans } from "./beans.api";
import BeansStep from "./BeansStep";
import BlendSummary from "./BlendSummary";
import CardamomStep from "./CardamomStep";
import GrindStep from "./GrindStep";
import RoastStep from "./RoastStep";
import TotalStep from "./TotalStep";
import styles from "./BlendBuilder.module.css";

export default function BlendBuilder() {
  const { data: beans = [] } = useSWR(apiKeys.beans, fetchBeans, { suspense: true });

  if (beans.length === 0) {
    return <EmptyState title="ما في أنواع بن متوفرة للخلطة هلق. ارجعلنا كمان شوي." />;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.steps}>
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
