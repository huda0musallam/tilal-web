import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/api/client";
import { getBeans } from "@/features/blend/beans.api";
import { pageClass, pageLabelClass } from "@/components/ui/shared-classes";
import { blendHeadClass } from "@/features/blend/blend.classes";
import BlendBuilder from "@/features/blend/BlendBuilder";

export const metadata: Metadata = {
  title: "اصنع خلطتك | التلال",
  description: "اختار نوع البن والتحميص والطحنة والهيل، ونحنا منحمّصلك خلطتك.",
};

export default function BlendPage() {
  return (
    <main className={pageClass}>
      <div className="container">
        <header className={blendHeadClass}>
          <p className={pageLabelClass}>اصنع خلطتك</p>
          <h1 className="mb-2">قهوتك، على ذوقك</h1>
          <p>اختار نوع البن والتحميص والكمية بالغرام، وزيد الهيل قد ما بدك، ونحنا منحمّصلك ياها.</p>
        </header>

        <SWRConfig value={{ fallback: { [apiKeys.beans]: getBeans() } }}>
          <BlendBuilder />
        </SWRConfig>
      </div>
    </main>
  );
}
