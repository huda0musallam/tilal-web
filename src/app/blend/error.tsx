"use client";

import RouteError from "@/shared/ui/RouteError";

export default function BlendError({
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
