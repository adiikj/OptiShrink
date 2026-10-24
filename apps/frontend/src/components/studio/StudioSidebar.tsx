"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  HelpCircle,
  History,
  Image as ImageIcon,
  Info,
  Layers,
  LayoutDashboard,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import { Brand } from "@/components/brand/Brand";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/cn";
import { initials } from "@/lib/format";

export const studioNav = [
  {
    label: "Workspace",
    items: [
      { href: "/dashboard", label: "Overview", icon: LayoutDashboard, exact: true },
      { href: "/dashboard/optimizeimage", label: "Optimize images", icon: ImageIcon },
      { href: "/dashboard/compresspdf", label: "Compress PDF", icon: FileText },
      { href: "/dashboard/batchcompress", label: "Batch compress", icon: Layers },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/dashboard/history", label: "History", icon: History },
      { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
  },
  {
    label: "Support",
    items: [
      { href: "/dashboard/help", label: "Help & support", icon: HelpCircle },
      { href: "/dashboard/about", label: "About", icon: Info },
    ],
  },
];

export function StudioSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast("Signed out of the studio.", "info");
    router.replace("/");
    router.refresh();
  };

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[248px] flex-col border-r border-line bg-surface transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <Brand href="/dashboard" />
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          {studioNav.map((group, groupIndex) => (
            <div key={group.label} className={groupIndex === 0 ? "" : "mt-6"}>
              <p className="px-3 pb-2 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {group.label}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const active = item.exact
                    ? pathname === item.href
                    : pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-2.5 rounded-md px-3 py-2 text-[13px] transition",
                          active
                            ? "bg-accent-soft font-medium text-accent-text"
                            : "text-ink-soft hover:bg-paper-deep hover:text-ink",
                        )}
                        aria-current={active ? "page" : undefined}
                      >
                        <Icon className={cn("h-4 w-4", active ? "text-accent-text" : "text-muted")} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="shrink-0 border-t border-line p-3">
          {user ? (
            <div className="flex items-center gap-3 rounded-md px-2 py-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[10px] font-medium text-accent-ink">
                {initials(user.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-ink">{user.name}</p>
                <p className="truncate font-mono text-[9px] text-muted">@{user.username}</p>
              </div>
              <button
                type="button"
                onClick={() => void handleSignOut()}
                className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
                aria-label="Sign out"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          <Link
            href="/"
            className="mt-1 flex items-center justify-between rounded-md px-3 py-2 text-[11px] text-muted transition hover:bg-paper-deep hover:text-ink"
          >
            Back to site
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </aside>
    </>
  );
}
