import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";
import { PageHeader } from "@/components/studio/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Batch PDFs",
};

export default function DashboardBatchCompressPdfPage() {
  return (
    <div>
      <PageHeader
        kicker="Batch compression"
        title="Batch PDFs"
        description="PDFs compress one at a time so every document gets a clean response. Page counts are preserved and each result is downloadable on its own."
        action={
          <ButtonLink href="/dashboard/batchcompress" variant="secondary" size="sm">
            Change format
          </ButtonLink>
        }
      />
      <CompressionWorkspace kind="pdf" allowMultiple maxFiles={20} mode="studio" />
    </div>
  );
}
