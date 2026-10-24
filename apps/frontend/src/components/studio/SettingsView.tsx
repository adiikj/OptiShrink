"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, LogOut, Moon, Sun } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useToast } from "@/context/ToastContext";
import { cn } from "@/lib/cn";
import { formatDate, initials } from "@/lib/format";
import { PageHeader } from "./PageHeader";

export function SettingsView() {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    toast("Signed out of the studio.", "info");
    router.replace("/");
    router.refresh();
  };

  if (!user) return null;

  return (
    <div>
      <PageHeader
        kicker="Preferences"
        title="Settings"
        description="Your account details, appearance, and session controls."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="panel p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-[12px] font-medium text-accent-ink">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[14px] font-medium text-ink">{user.name}</p>
              <p className="truncate font-mono text-[9px] text-muted">@{user.username}</p>
            </div>
          </div>
          <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-muted">
            Member since {formatDate(user.createdAt)}. Your compression history is tied to this
            account.
          </p>
        </section>

        <section className="panel overflow-hidden lg:col-span-2">
          <div className="border-b border-line px-5 py-3.5">
            <h2 className="text-[13px] font-medium text-ink">Account details</h2>
          </div>
          <dl>
            {[
              { label: "Full name", value: user.name },
              { label: "Username", value: `@${user.username}` },
              { label: "Email", value: user.email },
              { label: "Member since", value: formatDate(user.createdAt) },
            ].map((row) => (
              <div
                key={row.label}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line px-5 py-3.5 last:border-b-0"
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  {row.label}
                </dt>
                <dd className="text-right text-[12px] text-ink">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-2">
        <section className="panel p-5">
          <h2 className="text-[13px] font-medium text-ink">Appearance</h2>
          <p className="mt-1 text-[11px] text-muted">Saved to this browser only.</p>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
            {[
              { value: "light" as const, label: "Light", icon: Sun },
              { value: "dark" as const, label: "Dark", icon: Moon },
            ].map((option) => {
              const Icon = option.icon;
              const active = theme === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTheme(option.value)}
                  aria-pressed={active}
                  className={cn(
                    "flex items-center gap-2 rounded-lg border px-3 py-2 text-[12px] font-medium transition",
                    active
                      ? "border-accent bg-accent-soft text-accent-text"
                      : "border-line text-ink-soft hover:border-line-strong",
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {option.label}
                </button>
              );
            })}
          </div>
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-line px-5 py-3.5">
            <h2 className="text-[13px] font-medium text-ink">Session & data</h2>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line px-5 py-4">
            <div>
              <p className="text-[12px] font-medium text-ink">Compression history</p>
              <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-muted">
                Review or permanently remove individual runs.
              </p>
            </div>
            <ButtonLink href="/dashboard/history" variant="secondary" size="sm">
              Open
              <ArrowUpRight className="h-3 w-3" />
            </ButtonLink>
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4 px-5 py-4">
            <div>
              <p className="text-[12px] font-medium text-ink">This session</p>
              <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-muted">
                Signing out clears the refresh token and both auth cookies in this browser.
              </p>
            </div>
            <Button variant="secondary" size="sm" onClick={() => void handleSignOut()}>
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </Button>
          </div>
          <p className="border-t border-line bg-paper-deep/40 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.04em] text-muted">
            Signed in as {user.email}
          </p>
        </section>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-panel border border-line bg-surface px-5 py-4">
        <p className="text-[12px] text-muted">Want the longer version of how compression works here?</p>
        <Link
          href="/dashboard/help"
          className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-text hover:underline"
        >
          Read the help page
          <ArrowUpRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );
}
