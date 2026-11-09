"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import styles from "./RouteError.module.css";

export interface RouteErrorPageProps {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}

interface RouteErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function RouteError({ error, retry }: RouteErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.box} role="alert">
      <p className={styles.title}>ما قدرنا نجيب البيانات هلق</p>
      <p>إذا كانت هاي أول زيارة، ممكن السيرفر يكون عم يصحى. جرّب كمان شوي.</p>
      <button type="button" className="btn btn-primary" onClick={retry}>
        <RotateCw size={18} />
        جرّب مرة تانية
      </button>
    </div>
  );
}
