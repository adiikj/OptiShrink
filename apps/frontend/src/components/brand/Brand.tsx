import Link from "next/link";
import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" fill="none" aria-hidden className={cn("h-7 w-7", className)}>
      <rect width="28" height="28" rx="7" fill="rgb(var(--accent))" />
      <path
        d="M7.5 9.5h8.5M7.5 13.5h6M7.5 17.5h3.5"
        stroke="rgb(var(--accent-ink))"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M19.5 9v6.5m0 0-2.4-2.4m2.4 2.4 2.4-2.4"
        stroke="rgb(var(--accent-ink))"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Brand({
  href = "/",
  className,
  markClassName,
}: {
  href?: string;
  className?: string;
  markClassName?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="OptiShrink home"
      className={cn("inline-flex items-center gap-2.5 transition-opacity hover:opacity-80", className)}
    >
      <BrandMark className={markClassName} />
      <span className="wordmark text-[19px] text-current">OptiShrink</span>
    </Link>
  );
}
