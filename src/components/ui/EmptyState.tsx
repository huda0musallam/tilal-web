import type { ReactNode } from "react";
import MessageBox from "./MessageBox";

interface EmptyStateProps {
  title: string;
  children?: ReactNode;
}

export default function EmptyState({ title, children }: EmptyStateProps) {
  return (
    <MessageBox tone="empty" role="status" title={title}>
      {children}
    </MessageBox>
  );
}
