"use client";

import type { RefObject } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { favorites, useIsFavorite } from "@/features/favorites/favorites.store";
import { flyTo } from "@/features/fly/fly.store";
import { buttonStyles } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Product } from "./product.types";

interface FavoriteButtonProps {
  product: Product;
  sourceRef: RefObject<HTMLElement | null>;
}

export default function FavoriteButton({ product, sourceRef }: FavoriteButtonProps) {
  const liked = useIsFavorite(product.id);

  function handleLike() {
    const nowLiked = favorites.toggle(product.id);
    if (nowLiked) flyTo("favorites", product.image, sourceRef.current);
  }

  return (
    <motion.button
      type="button"
      className={cn(
        buttonStyles({ variant: "ghost", size: "icon" }),
        "absolute end-2.5 top-2.5 size-10.5 bg-surface/92 hover:bg-surface/92",
        liked && "text-danger",
      )}
      onClick={handleLike}
      whileTap={{ scale: 0.85 }}
      aria-pressed={liked}
      aria-label={liked ? `شيل ${product.name} من المفضلة` : `أضف ${product.name} للمفضلة`}
    >
      <motion.span
        key={liked ? "on" : "off"}
        initial={{ scale: 0.6 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 15 }}
        className="grid"
      >
        <Heart size={20} fill={liked ? "currentColor" : "none"} />
      </motion.span>
    </motion.button>
  );
}
