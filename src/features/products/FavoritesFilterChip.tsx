"use client";

import { Heart } from "lucide-react";
import { chipStyles } from "@/components/ui/Chips";
import { useFavoritesCount } from "@/features/favorites/favorites.store";
import { cn } from "@/lib/cn";

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
      className={cn(chipStyles({ active }), "inline-flex items-center gap-1.5")}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
      المفضلة ({count})
    </button>
  );
}
