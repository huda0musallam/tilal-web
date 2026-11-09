"use client";

import { Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import { useFavoritesCount } from "@/features/favorites/favorites.store";

interface FavoritesFilterChipProps {
  active: boolean;
  onToggle: () => void;
}

export default function FavoritesFilterChip({ active, onToggle }: FavoritesFilterChipProps) {
  const count = useFavoritesCount();

  return (
    <Button
      variant={active ? "chipSelected" : "chip"}
      size="chip"
      className="gap-1.5"
      onClick={onToggle}
      aria-pressed={active}
    >
      <Heart size={16} fill={active ? "currentColor" : "none"} />
      المفضلة ({count})
    </Button>
  );
}
