import { cn } from "@/lib/cn";

export function QualityMeter({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 78" fill="none" aria-hidden className={cn("w-full", className)}>
      <rect x="10" y="31" width="260" height="6" rx="3" fill="rgb(var(--line))" />
      <rect x="10" y="31" width="156" height="6" rx="3" fill="rgb(var(--accent-soft))" />
      <rect x="10" y="31" width="72" height="6" rx="3" fill="rgb(var(--accent))" opacity="0.35" />

      {[10, 75, 140, 205, 270].map((x) => (
        <line
          key={x}
          x1={x}
          y1={x === 140 ? 24 : 27}
          x2={x}
          y2={x === 140 ? 44 : 41}
          stroke={x === 140 ? "rgb(var(--accent-text))" : "rgb(var(--line-strong))"}
          strokeWidth={x === 140 ? 1.6 : 1}
        />
      ))}

      <circle cx="140" cy="34" r="5.5" fill="rgb(var(--accent))" stroke="rgb(var(--surface))" strokeWidth="2" />
      <path d="M140 20v6" stroke="rgb(var(--accent-text))" strokeWidth="1" strokeDasharray="2 2" />
      <text
        x="140"
        y="13"
        textAnchor="middle"
        fill="rgb(var(--accent-text))"
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="0.6"
      >
        BALANCED
      </text>

      <text x="10" y="60" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.8">
        LIGHT
      </text>
      <text x="140" y="60" textAnchor="middle" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.8">
        BALANCED
      </text>
      <text x="270" y="60" textAnchor="end" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.8">
        STRONG
      </text>

      <text x="10" y="72" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.4">
        MORE DETAIL
      </text>
      <text x="270" y="72" textAnchor="end" fill="rgb(var(--muted))" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="0.4">
        SMALLER FILE
      </text>
    </svg>
  );
}
