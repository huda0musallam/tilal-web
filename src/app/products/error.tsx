"use client";

import RouteError, { type RouteErrorPageProps } from "@/components/ui/RouteError";

export default function ProductsError({ error, unstable_retry }: RouteErrorPageProps) {
  return (
    <main className="container">
      <RouteError error={error} retry={unstable_retry} />
    </main>
  );
}
