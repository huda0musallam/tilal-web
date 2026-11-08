import type { Metadata } from "next";
import { Aref_Ruqaa, Tajawal } from "next/font/google";
import Header from "@/shared/layout/Header";
import Footer from "@/shared/layout/Footer";
import "./tailwind.css";
import "./globals.css";
import CartDrawer from "@/features/cart/CartDrawer";
import FlyLayer from "@/features/fly/FlyLayer";
const display = Aref_Ruqaa({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "التلال | قهوة محمّصة بالبيت",
  description: "بن محمّص بإيدينا بدفعات صغيرة، من التلال لفنجانك.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${display.variable} ${body.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <CartDrawer />
        <FlyLayer />
      </body>
    </html>
  );
}
