import Page from "@/components/ui/Page";
import PageHeader from "@/components/ui/PageHeader";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <Page>
      <PageHeader label="اصنع خلطتك" title="قهوتك، على ذوقك" width="narrow" />
      <Skeleton
        variant="strong"
        className="h-150 rounded-media"
        role="status"
        aria-label="عم نجيب أنواع البن"
      />
    </Page>
  );
}
