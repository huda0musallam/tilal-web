import GridSkeleton from "@/shared/ui/GridSkeleton";
import styles from "./CatalogSkeleton.module.css";

export default function CatalogSkeleton() {
  return (
    <>
      <div className={styles.bar} />
      <GridSkeleton count={6} />
    </>
  );
}
