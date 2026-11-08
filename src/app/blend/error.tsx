"use client";

import RouteError, { type RouteErrorPageProps } from "@/shared/ui/RouteError";

export default function BlendError({ error, unstable_retry }: RouteErrorPageProps) {
  return (
    <main className="container">
      <RouteError error={error} retry={unstable_retry} />
    </main>
  );
}
