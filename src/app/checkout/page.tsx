import type { Metadata } from "next";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import Checkout from "@/features/checkout/Checkout";

export const metadata: Metadata = {
  title: "كمّل الطلب | التلال",
  description: "اكتب معلوماتك، ونحنا منبعت طلبك على واتساب.",
};

export default function CheckoutPage() {
  return (
    <Page>
      <PageHeader label="كمّل الطلب" title="آخر خطوة">
        اكتب معلوماتك، ونحنا منبعتلك رسالة الطلب جاهزة على واتساب.
      </PageHeader>
      <Checkout />
    </Page>
  );
}
