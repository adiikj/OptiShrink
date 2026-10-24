import { cn } from "@/lib/cn";

export function FileGlyph({
  kind,
  className,
}: {
  kind: "image" | "pdf";
  className?: string;
}) {
  if (kind === "image") {
    return (
      <svg viewBox="0 0 48 48" fill="none" aria-hidden className={cn(className)}>
        <rect x="6.5" y="8.5" width="35" height="31" stroke="currentColor" strokeWidth="1.2" />
        <path d="M6.5 31.5 17 22l8.5 7.5L31 24l10.5 9" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="30.5" cy="16.5" r="3.25" stroke="currentColor" strokeWidth="1.2" />
        <rect x="34" y="3.5" width="10" height="10" fill="rgb(var(--accent))" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={cn(className)}>
      <path d="M11.5 4.5h18l8 8v31h-26v-39Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M29.5 4.5v8h8" stroke="currentColor" strokeWidth="1.2" />
      <path d="M17 22h11M17 27h11M17 32h7" stroke="currentColor" strokeWidth="1.2" />
      <rect x="33" y="3.5" width="10" height="10" fill="rgb(var(--accent))" />
    </svg>
  );
}
