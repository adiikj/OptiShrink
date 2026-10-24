import { cn } from "@/lib/cn";

type FeatureKind = "gauge" | "layers" | "history" | "shield";

export function FeatureIcon({
  kind,
  className,
}: {
  kind: FeatureKind;
  className?: string;
}) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    className: cn("h-4 w-4", className),
  };

  if (kind === "gauge") {
    return (
      <svg {...common}>
        <path d="M4 16a8 8 0 1 1 16 0" />
        <path d="M12 16 16 10" />
        <circle cx="12" cy="16" r="1.3" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (kind === "layers") {
    return (
      <svg {...common}>
        <rect x="4" y="4.5" width="16" height="5" rx="1.5" />
        <rect x="6" y="11" width="12" height="5" rx="1.5" />
        <rect x="8.5" y="17.5" width="7" height="2.5" rx="1" />
      </svg>
    );
  }

  if (kind === "history") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4.5l3 1.8" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M12 3.5 19 6v5.2c0 4-2.9 7-7 8.3-4.1-1.3-7-4.3-7-8.3V6l7-2.5Z" />
      <path d="m9 11.5 2.1 2.1 4-4" />
    </svg>
  );
}
