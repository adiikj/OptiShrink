import type { Metadata } from "next";
import { DashboardOverview } from "@/components/studio/DashboardOverview";

export const metadata: Metadata = {
  title: "Studio overview",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
