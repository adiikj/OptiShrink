import type { Metadata } from "next";
import { AnalyticsView } from "@/components/studio/AnalyticsView";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function DashboardAnalyticsPage() {
  return <AnalyticsView />;
}
