"use client";

import { Heart } from "lucide-react";
import { useFavoritesCount } from "@/features/favorites/favorites.store";
import styles from "./FavoritesFilterChip.module.css";

interface FavoritesFilterChipProps {
  active: boolean;
  onToggle: () => void;
}

export default function FavoritesFilterChip({ active, onToggle }: FavoritesFilterChipProps) {
  const count = useFavoritesCount();

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      className={`${styles.chip} ${active ? styles.active : ""}`}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
      المفضلة ({count})
    </button>
  );
}
