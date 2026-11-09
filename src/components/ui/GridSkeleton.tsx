import styles from "./GridSkeleton.module.css";

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
    <div className={styles.grid} role="status" aria-label="عم نجيب البيانات">
      {slotIds(count).map((id) => (
        <div key={id} className={styles.item} />
      ))}
    </div>
  );
}
