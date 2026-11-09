"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import styles from "./SectionError.module.css";

interface SectionErrorProps {
  message: string;
  onRetry: () => Promise<void>;
}

export default function SectionError({ message, onRetry }: SectionErrorProps) {
  const [busy, setBusy] = useState(false);
  const [failedAgain, setFailedAgain] = useState(false);

  async function handleRetry() {
    setBusy(true);
    try {
      await onRetry();
    } catch {
      setFailedAgain(true);
      setBusy(false);
    }
  }

  return (
    <div className={styles.box} role="alert">
      <p className={styles.title}>{message}</p>
      <p>
        {failedAgain
          ? "لسا ما زبطت. جرّب كمان شوي."
          : "إذا كانت هاي أول زيارة، ممكن السيرفر يكون عم يصحى."}
      </p>
      <button type="button" className="btn btn-outline" onClick={handleRetry} disabled={busy}>
        <RotateCw size={18} aria-hidden="true" />
        {busy ? "عم نجرّب..." : "جرّب مرة تانية"}
      </button>
    </div>
  );
}
