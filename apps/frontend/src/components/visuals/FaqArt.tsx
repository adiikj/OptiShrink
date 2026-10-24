import { cn } from "@/lib/cn";

export function FaqArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" fill="none" aria-hidden className={cn("h-20 w-20", className)}>
      <circle cx="48" cy="48" r="38" fill="rgb(var(--accent-soft))" />
      <path
        d="M36 39c0-7 5.5-12 12-12s12 5 12 12c0 5-3 7.5-7 9.5-2.5 1.2-3.5 2.8-3.5 5"
        stroke="rgb(var(--accent-text))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="49.5" cy="63" r="2.6" fill="rgb(var(--accent-text))" />
      <path
        d="M22 78h52M22 74v8M48 74v8M74 74v8"
        stroke="rgb(var(--line-strong))"
        strokeWidth="1"
      />
      <circle cx="76" cy="26" r="4" fill="rgb(var(--accent))" />
    </svg>
  );
}
