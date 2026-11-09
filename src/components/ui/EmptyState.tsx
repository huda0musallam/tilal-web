import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { messageBoxClass } from "./shared-classes";

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
}

export default function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <div className={cn(messageBoxClass, "my-8 border-line")} role="status">
      <p className="text-lg font-bold text-ink">{title}</p>
      {children}
    </div>
  );
}
