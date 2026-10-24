import type { Metadata } from "next";
import { AboutView } from "@/components/studio/AboutView";

export const metadata: Metadata = {
  title: "About",
};

export default function DashboardAboutPage() {
  return <AboutView />;
}
