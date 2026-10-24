import { ArrowDown, Check, FileText, Upload } from "lucide-react";

const levels = ["Light", "Balanced", "Strong"];

export function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[560px]">
      <div className="absolute -inset-x-6 -top-6 bottom-8 rounded-3xl bg-accent-soft/70" />
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-lift">
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-line-strong/60" />
            <span className="h-2 w-2 rounded-full bg-line-strong/40" />
            <span className="h-2 w-2 rounded-full bg-accent/50" />
          </div>
          <span className="rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
            PDF
          </span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="rounded-xl border border-dashed border-line-strong bg-paper/70 p-5 text-center">
            <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-accent-soft text-accent-text">
              <Upload className="h-4 w-4" />
            </span>
            <p className="mt-3 text-[13px] font-medium text-ink">Drop a PDF or browse</p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
              Up to 20 MB
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3 rounded-lg border border-line px-3 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent-soft text-accent-text">
              <FileText className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-ink">annual-report-2026.pdf</p>
              <p className="mt-0.5 font-mono text-[9px] text-muted">18 pages · 12.4 MB</p>
            </div>
            <Check className="h-4 w-4 text-success" />
          </div>

          <div className="mt-4 grid grid-cols-3 rounded-lg border border-line bg-paper-deep p-1">
            {levels.map((level) => (
              <span
                key={level}
                className={
                  level === "Balanced"
                    ? "rounded-md bg-surface px-2 py-1.5 text-center text-[11px] font-medium text-ink shadow-sm"
                    : "px-2 py-1.5 text-center text-[11px] text-muted"
                }
              >
                {level}
              </span>
            ))}
          </div>

          <div className="mt-4 rounded-lg border border-line bg-surface p-3">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                  Compressed
                </p>
                <p className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-ink">
                  3.7 <span className="text-[12px] font-normal text-muted">MB</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium text-success">−70%</p>
                <p className="mt-0.5 font-mono text-[9px] text-muted">8.7 MB saved</p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper-deep">
              <div className="h-full w-[30%] rounded-full bg-accent" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
              Example output
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-[11px] font-medium text-accent-ink">
              Download
              <ArrowDown className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}
