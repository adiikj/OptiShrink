import type { Metadata } from "next";
import { HistoryView } from "@/components/studio/HistoryView";

export const metadata: Metadata = {
  title: "History",
};

export default function DashboardHistoryPage() {
  return <HistoryView />;
}
