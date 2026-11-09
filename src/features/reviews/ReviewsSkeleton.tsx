import Skeleton from "@/components/ui/Skeleton";

const SLOTS = ["review-slot-1", "review-slot-2", "review-slot-3"];

export default function ReviewsSkeleton() {
  return (
    <div
      className="container flex gap-5 overflow-hidden py-2"
      role="status"
      aria-label="عم نجيب آراء الزباين"
    >
      {SLOTS.map((id) => (
        <Skeleton key={id} className="h-50 w-67.5 shrink-0 rounded-card sm:w-80" />
      ))}
    </div>
  );
}
