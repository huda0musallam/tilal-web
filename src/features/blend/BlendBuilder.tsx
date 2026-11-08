"use client";

import useSWR from "swr";
import { apiKeys } from "@/shared/api/api";
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
