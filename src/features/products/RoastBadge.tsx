import Badge from "@/components/ui/Badge";
import { roastBadge, roastLabel } from "./product.options";
import type { Roast } from "./product.types";

interface RoastBadgeProps {
  roast: Roast;
  className?: string;
}

export default function RoastBadge({ roast, className }: RoastBadgeProps) {
  return (
    <Badge variant={roastBadge(roast)} className={className}>
      {roastLabel(roast)}
    </Badge>
  );
}
