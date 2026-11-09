import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/api/client";
import { getProducts } from "@/features/products/products.api";
import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import ProductsCatalog from "@/features/products/ProductsCatalog";

export const metadata: Metadata = {
  title: "المنتجات | التلال",
  description: "بن برازيلي وكولومبي بثلاث درجات تحميص، مع خيار الهيل.",
};

export default function ProductsPage() {
  return (
    <Page>
      <PageHeader label="المنتجات" title="قهوتنا">
        اختار البن ودرجة التحميص، وحدد الوزن والهيل على ذوقك.
      </PageHeader>

      <SWRConfig value={{ fallback: { [apiKeys.products]: getProducts() } }}>
        <ProductsCatalog />
      </SWRConfig>
    </Page>
  );
}
