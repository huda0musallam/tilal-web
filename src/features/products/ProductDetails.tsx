"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import useSWR from "swr";
import { apiKeys } from "@/lib/client";
import FavoriteButton from "./FavoriteButton";
import ProductPurchase from "./ProductPurchase";
import { originLabel, roastLabel, roastOption, ROAST_LEVELS } from "./product.options";
import { fetchProduct } from "./products.api";
import styles from "./ProductDetails.module.css";

interface ProductDetailsProps {
  id: string;
}

export default function ProductDetails({ id }: ProductDetailsProps) {
  const { data: product } = useSWR(apiKeys.product(id), fetchProduct, { suspense: true });
  const mediaRef = useRef<HTMLDivElement>(null);

  if (!product) notFound();

  const level = roastOption(product.roast)?.level ?? 0;

  return (
    <article className={styles.layout}>
      <div className={styles.media} ref={mediaRef}>
        <Image
          src={product.image}
          alt={`كيس قهوة التلال، ${product.name}`}
          fill
          priority
          sizes="(min-width: 900px) 50vw, 100vw"
          className={styles.image}
        />
        <FavoriteButton product={product} sourceRef={mediaRef} />
      </div>

      <div className={styles.info}>
        <Link href="/products" className={styles.back}>
          <ArrowRight size={18} aria-hidden="true" />
          كل المنتجات
        </Link>

        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.notes}>{product.notes}</p>

        <dl className={styles.facts}>
          <div>
            <dt>نوع البن</dt>
            <dd>{originLabel(product.origin)}</dd>
          </div>
          <div>
            <dt>التحميص</dt>
            <dd>
              {roastLabel(product.roast)}
              <span className={styles.level}>
                {level} من {ROAST_LEVELS}
              </span>
            </dd>
          </div>
        </dl>

        <div className={styles.purchase}>
          <ProductPurchase product={product} sourceRef={mediaRef} />
        </div>
      </div>
    </article>
  );
}
