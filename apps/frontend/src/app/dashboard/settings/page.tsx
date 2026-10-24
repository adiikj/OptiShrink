import type { Metadata } from "next";
import { SettingsView } from "@/components/studio/SettingsView";

export const metadata: Metadata = {
  title: "Settings",
};

export default function DashboardSettingsPage() {
  return <SettingsView />;
}
