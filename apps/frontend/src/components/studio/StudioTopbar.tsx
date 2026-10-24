"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Plus, Sun } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import { studioNav } from "./StudioSidebar";

export function StudioTopbar({ onMenu }: { onMenu: () => void }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const activeItem = studioNav
    .flatMap((group) => group.items)
    .filter((item) => (item.exact ? pathname === item.href : pathname.startsWith(item.href)))
    .sort((a, b) => b.href.length - a.href.length)[0];

  return (
    <div className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-line bg-surface/90 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenu}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink transition hover:bg-paper-deep lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>

        <div className="flex min-w-0 items-center gap-2 text-[12px]">
          <Link href="/dashboard" className="hidden text-muted transition hover:text-ink sm:block">
            Studio
          </Link>
          <span className="hidden text-line-strong sm:block">/</span>
          <span className="truncate font-medium text-ink">{activeItem?.label ?? "Studio"}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <ButtonLink href="/dashboard/optimizeimage" size="sm" variant="primary">
          <Plus className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">New compression</span>
          <span className="sm:hidden">New</span>
        </ButtonLink>
      </div>
    </div>
  );
}
