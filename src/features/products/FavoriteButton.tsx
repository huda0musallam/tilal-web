"use client";

import type { RefObject } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { favorites, useIsFavorite } from "@/features/favorites/favorites-store";
import { flyTo } from "@/features/fly/fly-store";
import type { Product } from "./product.types";
import styles from "./FavoriteButton.module.css";

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
      className={`${styles.like} ${liked ? styles.liked : ""}`}
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
        className={styles.icon}
      >
        <Heart size={20} fill={liked ? "currentColor" : "none"} />
      </motion.span>
    </motion.button>
  );
}
