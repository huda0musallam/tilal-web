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
    <div
      className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3"
      role="status"
      aria-label="عم نجيب البيانات"
    >
      {slotIds(count).map((id) => (
        <Skeleton key={id} variant="strong" className="aspect-3/4 rounded-card" />
      ))}
    </div>
  );
}
