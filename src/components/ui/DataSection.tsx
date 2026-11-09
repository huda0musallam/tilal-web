"use client";

import { Suspense, type ReactNode } from "react";
import ErrorBoundary from "./ErrorBoundary";
import SectionError from "./SectionError";

interface DataSectionProps {
  loading: ReactNode;
  errorMessage: string;
  retry: () => Promise<unknown>;
  children: ReactNode;
}

export default function DataSection({ loading, errorMessage, retry, children }: DataSectionProps) {
  return (
    <ErrorBoundary
      fallback={(reset) => (
        <SectionError
          message={errorMessage}
          onRetry={async () => {
            await retry();
            reset();
          }}
        />
      )}
    >
      <Suspense fallback={loading}>{children}</Suspense>
    </ErrorBoundary>
  );
}
