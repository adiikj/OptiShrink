import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";
import { PageHeader } from "@/components/studio/PageHeader";

export const metadata: Metadata = {
  title: "Optimize images",
};

export default function DashboardOptimizeImagePage() {
  return (
    <div>
      <PageHeader
        kicker="Image optimizer"
        title="Optimize images"
        description="Drop one file or a whole set. Limit-based resizing keeps small images untouched; every result is saved to your history."
      />
      <CompressionWorkspace kind="image" allowMultiple maxFiles={20} mode="studio" />
    </div>
  );
}
