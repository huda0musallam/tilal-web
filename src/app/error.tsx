"use client";

import RouteError from "@/components/ui/RouteError";

// ملفات error لازم تكون client components
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <main className="container">
      <RouteError error={error} retry={unstable_retry} />
    </main>
  );
}
