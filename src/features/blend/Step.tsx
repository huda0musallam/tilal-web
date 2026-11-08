import type { ReactNode } from "react";
import styles from "./Step.module.css";

interface StepProps {
  n: number;
  title: string;
  hint?: string;
  children: ReactNode;
}

export default function Step({ n, title, hint, children }: StepProps) {
  return (
    <section className={styles.step}>
      <div className={styles.stepHead}>
        <span className={styles.num}>{n}</span>
        <div>
          <h2 className={styles.stepTitle}>{title}</h2>
          {hint && <p className={styles.hint}>{hint}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
