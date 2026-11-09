import CardGrid from "./CardGrid";
import Skeleton from "./Skeleton";

function slotIds(count: number) {
  const ids: string[] = [];
  for (let n = 1; n <= count; n++) ids.push(`slot-${n}`);
  return ids;
}

interface GridSkeletonProps {
  count?: number;
}

export default function GridSkeleton({ count = 6 }: GridSkeletonProps) {
  return (
    <CardGrid layout="full3" role="status" aria-label="عم نجيب البيانات">
      {slotIds(count).map((id) => (
        <Skeleton key={id} variant="strong" className="aspect-3/4 rounded-card" />
      ))}
    </CardGrid>
  );
}
