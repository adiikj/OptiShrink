import HeaderFooterLayout from "@/components/layout/HeaderFooterLayout";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <HeaderFooterLayout>{children}</HeaderFooterLayout>;
}
