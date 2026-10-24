interface Metric {
  label: string;
  value: string;
  note?: string;
}

export function MetricGrid({ metrics, loading }: { metrics: Metric[]; loading?: boolean }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-surface p-4">
          <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
            {metric.label}
          </p>
          {loading ? (
            <div className="mt-2 h-6 w-20 animate-pulse rounded bg-paper-deep" />
          ) : (
            <p className="mt-2 text-[20px] font-semibold tracking-[-0.02em] text-ink">
              {metric.value}
            </p>
          )}
          {metric.note ? (
            <p className="mt-1 text-[11px] leading-snug text-muted">{metric.note}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
