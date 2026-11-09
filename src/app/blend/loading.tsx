import { pageClass, pageLabelClass } from "@/components/ui/shared-classes";
import { blendHeadClass } from "@/features/blend/blend.classes";

export default function Loading() {
  return (
    <main className={pageClass}>
      <div className="container">
        <header className={blendHeadClass}>
          <p className={pageLabelClass}>اصنع خلطتك</p>
          <h1 className="mb-2">قهوتك، على ذوقك</h1>
        </header>
        <div
          className="h-150 animate-shimmer-soft rounded-media bg-strong-surface"
          role="status"
          aria-label="عم نجيب أنواع البن"
        />
      </div>
    </main>
  );
}
