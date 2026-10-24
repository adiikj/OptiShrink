import { cn } from "@/lib/cn";

export function DeltaArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 100" fill="none" aria-hidden className={cn("w-full", className)}>
      <text x="8" y="13" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.8">
        ORIGINAL
      </text>
      <rect x="8" y="20" width="248" height="10" rx="5" fill="rgb(var(--line-strong))" opacity="0.35" />

      <text x="8" y="49" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="0.8">
        RESULT
      </text>
      <rect x="8" y="56" width="248" height="10" rx="5" stroke="rgb(var(--line-strong))" strokeOpacity="0.45" strokeDasharray="2 4" />
      <rect x="8" y="56" width="74" height="10" rx="5" fill="rgb(var(--accent))" />

      <path
        d="M264 20v45m0 0-4-4m4 4 4-4"
        stroke="rgb(var(--accent-text))"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="264" y="76" textAnchor="end" fill="rgb(var(--accent-text))" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="0.4">
        −70%
      </text>
      <text x="264" y="86" textAnchor="end" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.4">
        EXAMPLE
      </text>
    </svg>
  );
}
