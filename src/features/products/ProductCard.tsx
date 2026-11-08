"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import FavoriteButton from "./FavoriteButton";
import ProductPurchase from "./ProductPurchase";
import { roastLabel } from "./product.options";
import type { Product } from "./product.types";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
  index?: number;
  eager?: boolean;
}

export default function ProductCard({ product, index = 0, eager = false }: ProductCardProps) {
  const mediaRef = useRef<HTMLDivElement>(null);
  const href = `/products/${encodeURIComponent(product.id)}`;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
    >
      <div className={styles.media} ref={mediaRef}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className={styles.mediaLink}>
          <Image
            src={product.image}
            alt={`كيس قهوة التلال، ${product.name}`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
        </Link>
        <span className={styles.badge}>{roastLabel(product.roast)}</span>
        <FavoriteButton product={product} sourceRef={mediaRef} />
      </div>

      <div className={styles.body}>
        <div>
          <h3 className={styles.name}>
            <Link href={href} className={styles.nameLink}>
              {product.name}
            </Link>
          </h3>
          <p className={styles.notes}>{product.notes}</p>
        </div>

        <ProductPurchase product={product} sourceRef={mediaRef} />
      </div>
    </motion.article>
  );
}
