"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { useRef } from "react";
import useSWR from "swr";
import { apiKeys } from "@/lib/api/client";
import FavoriteButton from "./FavoriteButton";
import BackLink from "@/components/ui/BackLink";
import { cardGridStyles } from "@/components/ui/CardGrid";
import ProductPurchase from "./ProductPurchase";
import RoastBadge from "./RoastBadge";
import { originLabel, roastOption, ROAST_LEVELS } from "./product.options";
import { fetchProduct } from "./products.api";

const factTermClass = "text-xs text-muted-ink";
const factValueClass = "font-bold text-ink";

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const { data: product } = useSWR(apiKeys.product(id), fetchProduct, { suspense: true });
  const mediaRef = useRef<HTMLDivElement>(null);

  if (!product) notFound();

  const level = roastOption(product.roast)?.level ?? 0;

  return (
    <article className={cardGridStyles({ layout: "split" })}>
      <div
        className="relative aspect-square overflow-hidden rounded-panel bg-muted-surface"
        ref={mediaRef}
      >
        <Image
          src={product.image}
          alt={`كيس قهوة التلال، ${product.name}`}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <FavoriteButton product={product} sourceRef={mediaRef} />
      </div>

      <div className="flex flex-col gap-4">
        <BackLink href="/products">كل المنتجات</BackLink>

        <h1 className="text-4xl lg:text-5xl">{product.name}</h1>
        <p className="text-lg">{product.notes}</p>

        <dl className="grid grid-cols-2 gap-3 rounded-control bg-muted-surface p-4">
          <div>
            <dt className={factTermClass}>نوع البن</dt>
            <dd className={factValueClass}>{originLabel(product.origin)}</dd>
          </div>
          <div>
            <dt className={factTermClass}>التحميص</dt>
            <dd className={factValueClass}>
              <RoastBadge roast={product.roast} />
              <span className="ms-2 text-xs font-normal text-muted-ink">
                {level} من {ROAST_LEVELS}
              </span>
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-4">
          <ProductPurchase product={product} sourceRef={mediaRef} />
        </div>
      </div>
    </article>
  );
}
