"use client";

import { useState } from "react";
import { RotateCw } from "lucide-react";
import Button from "./Button";
import MessageBox from "./MessageBox";

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
    <MessageBox tone="error" role="alert" title={message}>
      <p>
        {failedAgain
          ? "لسا ما زبطت. جرّب كمان شوي."
          : "إذا كانت هاي أول زيارة، ممكن السيرفر يكون عم يصحى."}
      </p>
      <Button variant="secondary" onClick={handleRetry} disabled={busy}>
        <RotateCw size={18} aria-hidden="true" />
        {busy ? "عم نجرّب..." : "جرّب مرة تانية"}
      </Button>
    </MessageBox>
  );
}
