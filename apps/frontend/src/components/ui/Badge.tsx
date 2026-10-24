import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "accent" | "success" | "signal";

const tones: Record<Tone, string> = {
  neutral: "border-line text-muted",
  accent: "border-accent bg-accent text-accent-ink",
  success: "border-success/25 bg-success/10 text-success",
  signal: "border-signal/25 bg-signal/10 text-signal",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase leading-none tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
