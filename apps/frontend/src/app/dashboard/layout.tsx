import NoHeaderFooterLayout from "@/components/layout/NoHeaderFooterLayout";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <NoHeaderFooterLayout>{children}</NoHeaderFooterLayout>;
}
