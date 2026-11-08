import styles from "./ReviewsSkeleton.module.css";

const SLOTS = ["review-slot-1", "review-slot-2", "review-slot-3"];

export default function ReviewsSkeleton() {
  return (
    <div className={`container ${styles.row}`} role="status" aria-label="عم نجيب آراء الزباين">
      {SLOTS.map((id) => (
        <div key={id} className={styles.card} />
      ))}
    </div>
  );
}
