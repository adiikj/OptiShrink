import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";
import { PageHeader } from "@/components/studio/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Batch images",
};

export default function DashboardBatchCompressImagePage() {
  return (
    <div>
      <PageHeader
        kicker="Batch compression"
        title="Batch images"
        description="Files are processed in the order you add them. Each row reports its own before-and-after size, and the whole set can be downloaded at once."
        action={
          <ButtonLink href="/dashboard/batchcompress" variant="secondary" size="sm">
            Change format
          </ButtonLink>
        }
      />
      <CompressionWorkspace kind="image" allowMultiple maxFiles={20} mode="studio" />
    </div>
  );
}
