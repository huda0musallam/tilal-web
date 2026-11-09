import GridSkeleton from "@/components/ui/GridSkeleton";

export default function CatalogSkeleton() {
  return (
    <>
      <div className="mb-9 h-16.5 rounded-toolbar bg-muted-surface" />
      <GridSkeleton count={6} />
    </>
  );
}
