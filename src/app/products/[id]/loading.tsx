import Page from "@/components/ui/Page";

const blockClass = "rounded-panel bg-muted-surface";

export default function Loading() {
  return (
    <Page>
      <div
        className="grid grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-14"
        role="status"
        aria-label="عم نجيب المنتج"
      >
        <div className={`aspect-square ${blockClass}`} />
        <div className={`h-80 ${blockClass}`} />
      </div>
    </Page>
  );
}
