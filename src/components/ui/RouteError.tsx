"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import Button from "./Button";
import MessageBox from "./MessageBox";

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
    <MessageBox tone="error" role="alert" title="ما قدرنا نجيب البيانات هلق">
      <p>إذا كانت هاي أول زيارة، ممكن السيرفر يكون عم يصحى. جرّب كمان شوي.</p>
      <Button onClick={retry}>
        <RotateCw size={18} />
        جرّب مرة تانية
      </Button>
    </MessageBox>
  );
}
