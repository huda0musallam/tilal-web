import { cardGridStyles } from "@/components/ui/CardGrid";
import Page from "@/components/ui/Page";

const blockClass = "rounded-panel bg-muted-surface";

export default function Loading() {
  return (
    <Page>
      <div
        className={cardGridStyles({ layout: "split" })}
        role="status"
        aria-label="عم نجيب المنتج"
      >
        <div className={`aspect-square ${blockClass}`} />
        <div className={`h-80 ${blockClass}`} />
      </div>
    </Page>
  );
}
