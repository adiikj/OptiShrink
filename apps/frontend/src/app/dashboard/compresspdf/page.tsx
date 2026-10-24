import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";
import { PageHeader } from "@/components/studio/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Compress PDF",
};

export default function DashboardCompressPdfPage() {
  return (
    <div>
      <PageHeader
        kicker="PDF compressor"
        title="Compress PDF"
        description="One PDF at a time, up to 20 MB. The page count is preserved and the run is recorded when you are signed in."
        action={
          <ButtonLink href="/dashboard/batchcompress/pdf" variant="secondary" size="sm">
            Batch PDFs instead
          </ButtonLink>
        }
      />
      <CompressionWorkspace kind="pdf" mode="studio" />
    </div>
  );
}
