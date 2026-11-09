"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { cardStyles } from "@/components/ui/Card";
import { zoomImageClass } from "@/components/ui/shared-classes";
import { cn } from "@/lib/cn";
import FavoriteButton from "./FavoriteButton";
import ProductPurchase from "./ProductPurchase";
import RoastBadge from "./RoastBadge";
import type { Product } from "./product.types";

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
      className={cn(
        cardStyles({ tone: "page", radius: "card", padding: "none" }),
        "group flex h-full flex-col overflow-hidden transition-shadow duration-350 hover:shadow-lift",
      )}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.12 }}
    >
      <div className="relative aspect-square overflow-hidden" ref={mediaRef}>
        <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
          <Image
            src={product.image}
            alt={`كيس قهوة التلال، ${product.name}`}
            fill
            loading={eager ? "eager" : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className={cn(zoomImageClass, "group-hover:scale-104")}
          />
        </Link>
        <RoastBadge
          roast={product.roast}
          className="absolute start-3.5 top-3.5 rounded-pill font-bold"
        />
        <FavoriteButton product={product} sourceRef={mediaRef} />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3 className="text-2xl">
            <Link href={href} className="hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <p className="text-base">{product.notes}</p>
        </div>

        <ProductPurchase product={product} sourceRef={mediaRef} />
      </div>
    </motion.article>
  );
}
