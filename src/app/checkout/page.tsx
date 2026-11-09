import type { Metadata } from "next";
import { pageClass, pageHeadClass, pageLabelClass } from "@/components/ui/shared-classes";
import Checkout from "@/features/checkout/Checkout";

export const metadata: Metadata = {
  title: "كمّل الطلب | التلال",
  description: "اكتب معلوماتك، ونحنا منبعت طلبك على واتساب.",
};

export default function CheckoutPage() {
  return (
    <main className={pageClass}>
      <div className="container">
        <header className={pageHeadClass}>
          <p className={pageLabelClass}>كمّل الطلب</p>
          <h1 className="mb-2">آخر خطوة</h1>
          <p>اكتب معلوماتك، ونحنا منبعتلك رسالة الطلب جاهزة على واتساب.</p>
        </header>
        <Checkout />
      </div>
    </main>
  );
}
