import type { ReactNode } from "react";
import { EmptyArt } from "@/components/visuals/EmptyArt";

export function EmptyState({
  title,
  description,
  action,
  compact = false,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <EmptyArt className={compact ? "h-24 w-24" : "h-32 w-32"} />
      <h3 className="mt-6 font-display text-2xl text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
