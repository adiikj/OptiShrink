import type { Metadata } from "next";
import { HelpView } from "@/components/studio/HelpView";

export const metadata: Metadata = {
  title: "Help & support",
};

export default function DashboardHelpPage() {
  return <HelpView />;
}
