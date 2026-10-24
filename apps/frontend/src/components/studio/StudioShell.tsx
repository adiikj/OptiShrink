"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Brand } from "@/components/brand/Brand";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/context/AuthContext";
import { StudioSidebar } from "./StudioSidebar";
import { StudioTopbar } from "./StudioTopbar";

export function StudioShell({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/signin");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-paper">
        <Brand href="/" />
        <Spinner className="h-5 w-5 text-muted" />
        <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
          Opening the studio
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <StudioSidebar open={navOpen} onClose={() => setNavOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <StudioTopbar onMenu={() => setNavOpen(true)} />
        <main className="flex-1 px-4 py-7 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[1120px]">{children}</div>
        </main>
      </div>
    </div>
  );
}
