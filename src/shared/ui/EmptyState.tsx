import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
}

export default function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className={styles.box} role="status">
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
}
