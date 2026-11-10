"use client";

import "./globals.css";
import RouteError from "@/components/ui/RouteError";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <main className="container">
          <RouteError error={error} retry={unstable_retry} />
        </main>
      </body>
    </html>
  );
}
