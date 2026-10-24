import { cn } from "@/lib/cn";

export function CompressionFlowArt({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 360 260"
      fill="none"
      aria-hidden
      className={cn("w-full", className)}
    >
      <g stroke="currentColor" strokeWidth="1.1">
        <rect x="28" y="38" width="118" height="156" rx="6" opacity="0.35" />
        <rect x="40" y="28" width="118" height="156" rx="6" opacity="0.6" />
        <path d="M58 52h54M58 64h42M58 76h50M58 128h54M58 140h30" opacity="0.45" />
        <path d="M58 100h82" opacity="0.25" strokeDasharray="3 4" />
      </g>

      <g stroke="rgb(var(--accent))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M196 106h34" />
        <path d="m224 100 6 6-6 6" />
        <path d="M196 140h24" opacity="0.45" />
      </g>

      <g stroke="currentColor" strokeWidth="1.1">
        <rect x="248" y="80" width="80" height="108" rx="6" />
        <path d="M264 98h36M264 108h28M264 118h20" opacity="0.45" />
        <path d="M264 142h40" opacity="0.25" strokeDasharray="3 4" />
      </g>

      <g stroke="rgb(var(--accent))" strokeWidth="1.2" opacity="0.8">
        <path d="M248 58v14M328 58v14M248 65h-8M328 65h8" />
        <path d="M28 214h300" strokeDasharray="3 5" opacity="0.4" />
        <path d="M40 210v8M158 210v8M248 210v8M328 210v8" opacity="0.4" />
      </g>

      <g fill="currentColor" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1" opacity="0.55">
        <text x="40" y="206">12.4 MB</text>
        <text x="282" y="206">3.7 MB</text>
      </g>

      <circle cx="300" cy="46" r="15" fill="rgb(var(--accent-soft))" stroke="rgb(var(--accent))" strokeWidth="1.2" />
      <path d="M300 39v14m0 0-4-4m4 4 4-4" stroke="rgb(var(--accent))" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
