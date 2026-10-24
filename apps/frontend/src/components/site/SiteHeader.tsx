"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { Brand } from "@/components/brand/Brand";
import { ButtonLink } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/compressfile", label: "PDF compressor" },
  { href: "/optimizeimage", label: "Image optimizer" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur-md">
        <div className="container-shell flex h-16 items-center justify-between gap-5">
          <Brand />

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[13px] text-muted transition-colors hover:text-ink",
                  pathname === item.href && "font-medium text-ink",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {loading ? (
              <span className="h-9 w-28 animate-pulse rounded-lg bg-paper-deep" />
            ) : user ? (
              <ButtonLink href="/dashboard" size="sm" variant="primary">
                Open studio
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ButtonLink>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="rounded-md px-3 py-2 text-[13px] text-ink transition hover:bg-paper-deep"
                >
                  Sign in
                </Link>
                <ButtonLink href="/signup" size="sm" variant="primary">
                  Create account
                </ButtonLink>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-ink transition hover:bg-paper-deep md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div
          id="mobile-menu"
          className="animate-fade fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-paper px-5 pb-8 pt-4 md:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between border-b border-line py-4 text-[15px] text-ink"
              >
                {item.label}
                <ArrowUpRight className="h-4 w-4 text-muted" />
              </Link>
            ))}
          </nav>

          <div className="mt-6 flex flex-col gap-2">
            {user ? (
              <ButtonLink href="/dashboard" variant="primary" size="lg">
                Open studio
              </ButtonLink>
            ) : (
              <>
                <ButtonLink href="/signup" variant="primary" size="lg">
                  Create account
                </ButtonLink>
                <ButtonLink href="/signin" variant="secondary" size="lg">
                  Sign in
                </ButtonLink>
              </>
            )}
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost btn-md mt-1 justify-start"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Light theme" : "Dark theme"}
            </button>
          </div>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            PDF · JPG · PNG · WebP, up to 20 MB
          </p>
        </div>
      ) : null}
    </>
  );
}
