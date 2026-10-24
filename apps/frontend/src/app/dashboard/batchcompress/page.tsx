import type { Metadata } from "next";
import { BatchChoice } from "@/components/studio/BatchChoice";

export const metadata: Metadata = {
  title: "Batch compression",
};

export default function DashboardBatchCompressPage() {
  return <BatchChoice />;
}
