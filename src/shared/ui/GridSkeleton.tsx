import styles from "./GridSkeleton.module.css";

interface GridSkeletonProps {
  count?: number;
}

export default function GridSkeleton({ count = 6 }: GridSkeletonProps) {
  return (
    <div className={styles.grid} role="status" aria-label="عم نجيب البيانات">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.item} />
      ))}
    </div>
  );
}
