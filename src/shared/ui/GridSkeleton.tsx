import styles from "./GridSkeleton.module.css";

type Props = { count?: number };

export default function GridSkeleton({ count = 6 }: Props) {
  return (
    <div className={styles.grid} role="status" aria-label="عم نجيب البيانات">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={styles.item} />
      ))}
    </div>
  );
}
