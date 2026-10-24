import { formatBytes, formatUtcDay } from "@/lib/format";
import type { DailyStat } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ActivityChart({ daily }: { daily: DailyStat[] }) {
  const values = daily.map((day) => Math.max(0, day.originalBytes - day.compressedBytes));
  const max = Math.max(1, ...values);
  const hasActivity = values.some((value) => value > 0);

  return (
    <div>
      <div className="flex h-40 items-end gap-1.5" role="img" aria-label="Space saved per day over the last 14 days">
        {daily.map((day, index) => {
          const saved = values[index];
          const height = saved > 0 ? Math.max(5, (saved / max) * 100) : 0;
          return (
            <div key={day.date} className="group relative flex h-full flex-1 items-end">
              <div
                className={cn(
                  "w-full rounded-t-[2px] transition-colors duration-200",
                  saved > 0
                    ? "bg-accent/85 group-hover:bg-accent"
                    : "h-[3px] bg-line-strong/35",
                )}
                style={saved > 0 ? { height: `${height}%` } : undefined}
                title={`${formatUtcDay(day.date)}: ${saved > 0 ? `${formatBytes(saved)} saved` : "No activity"}`}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
        <span>{formatUtcDay(daily[0].date)}</span>
        <span className={hasActivity ? "text-ink" : ""}>
          {hasActivity ? `Peak ${formatBytes(max)}` : "No savings yet"}
        </span>
        <span>Today</span>
      </div>
    </div>
  );
}
