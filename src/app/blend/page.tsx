import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/api/client";
import { getBeans } from "@/features/blend/beans.api";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import BlendBuilder from "@/features/blend/BlendBuilder";

export const metadata: Metadata = {
  title: "اصنع خلطتك | التلال",
  description: "اختار نوع البن والتحميص والطحنة والهيل، ونحنا منحمّصلك خلطتك.",
};

export default function BlendPage() {
  return (
    <Page>
      <PageHeader label="اصنع خلطتك" title="قهوتك، على ذوقك" width="narrow">
        اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا منحمّصلك ياها.
      </PageHeader>

      <SWRConfig value={{ fallback: { [apiKeys.beans]: getBeans() } }}>
        <BlendBuilder />
      </SWRConfig>
    </Page>
  );
}
