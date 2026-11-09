import type { Metadata } from "next";
import { SWRConfig } from "swr";
import { apiKeys } from "@/lib/api/client";
import { getProduct } from "@/features/products/products.api";
import Page from "@/components/ui/Page";
import ProductDetails from "@/features/products/ProductDetails";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id).catch(() => null);
  if (!product) return { title: "المنتج | التلال" };
  return { title: `${product.name} | التلال`, description: product.notes };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <Page>
      <SWRConfig value={{ fallback: { [apiKeys.product(id)]: getProduct(id) } }}>
        <ProductDetails id={id} />
      </SWRConfig>
    </Page>
  );
}
