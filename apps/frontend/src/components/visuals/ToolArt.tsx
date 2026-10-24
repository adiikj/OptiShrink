import { cn } from "@/lib/cn";

export function ToolArt({
  kind,
  className,
}: {
  kind: "pdf" | "image";
  className?: string;
}) {
  if (kind === "pdf") {
    return (
      <svg viewBox="0 0 64 64" fill="none" aria-hidden className={cn("h-14 w-14", className)}>
        <rect width="64" height="64" rx="14" fill="rgb(var(--accent-soft))" />
        <rect
          x="17"
          y="11"
          width="24"
          height="32"
          rx="3"
          fill="rgb(var(--surface))"
          stroke="rgb(var(--accent-text))"
          strokeWidth="1.1"
          opacity="0.5"
        />
        <rect
          x="25"
          y="17"
          width="25"
          height="33"
          rx="3"
          fill="rgb(var(--surface))"
          stroke="rgb(var(--accent-text))"
          strokeWidth="1.2"
        />
        <path
          d="M31 26h13M31 31h13M31 36h8"
          stroke="rgb(var(--accent-text))"
          strokeWidth="1.1"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          d="M49 27v12m0 0-3.2-3.2M49 39l3.2-3.2"
          stroke="rgb(var(--accent-text))"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="15" cy="49" r="3" fill="rgb(var(--accent))" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden className={cn("h-14 w-14", className)}>
      <rect width="64" height="64" rx="14" fill="rgb(var(--accent-soft))" />
      <rect
        x="14"
        y="15"
        width="36"
        height="28"
        rx="3.5"
        fill="rgb(var(--surface))"
        stroke="rgb(var(--accent-text))"
        strokeWidth="1.2"
      />
      <circle cx="23" cy="24" r="3" stroke="rgb(var(--accent-text))" strokeWidth="1.1" />
      <path
        d="m16 39 10.5-9L34 37l6.5-7L48 40"
        stroke="rgb(var(--accent-text))"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M26 49h15m0 0-3.2-3.2M41 49l-3.2 3.2"
        stroke="rgb(var(--accent-text))"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="49" cy="49" r="3" fill="rgb(var(--accent))" />
    </svg>
  );
}
