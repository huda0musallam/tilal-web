"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "./Button";
import { errorBoxClass, errorTitleClass, messageBoxClass } from "./shared-classes";

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
    <div className={cn(messageBoxClass, errorBoxClass)} role="alert">
      <p className={errorTitleClass}>ما قدرنا نجيب البيانات هلق</p>
      <p>إذا كانت هاي أول زيارة، ممكن السيرفر يكون عم يصحى. جرّب كمان شوي.</p>
      <Button onClick={retry}>
        <RotateCw size={18} />
        جرّب مرة تانية
      </Button>
    </div>
  );
}
