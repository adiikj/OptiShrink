import { cn } from "@/lib/cn";

export function EmptyArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 140" fill="none" aria-hidden className={cn("h-32 w-32", className)}>
      <rect x="34" y="28" width="62" height="84" rx="6" stroke="currentColor" strokeWidth="1.1" strokeDasharray="3 4" opacity="0.35" />
      <rect x="46" y="20" width="62" height="84" rx="6" fill="rgb(var(--surface))" stroke="currentColor" strokeWidth="1.1" opacity="0.7" />
      <path d="M60 40h34M60 51h26M60 62h18" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
      <path d="M60 76h22" stroke="currentColor" strokeWidth="1.1" opacity="0.25" strokeDasharray="3 4" />
      <g stroke="rgb(var(--accent))" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M120 58v24" />
        <path d="m113 75 7 7 7-7" />
      </g>
      <circle cx="120" cy="44" r="14" fill="rgb(var(--accent-soft))" stroke="rgb(var(--accent))" strokeWidth="1.1" />
      <path d="M120 38v12m0 0-3.5-3.5M120 50l3.5-3.5" stroke="rgb(var(--accent))" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
