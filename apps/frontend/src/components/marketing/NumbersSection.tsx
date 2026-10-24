import { ArrowRight } from "lucide-react";
import { DeltaArt } from "@/components/visuals/DeltaArt";

const examples = [
  { name: "annual-report-2026.pdf", before: "12.4 MB", after: "3.7 MB", saved: "−70%" },
  { name: "product-shot.png", before: "4.2 MB", after: "1.1 MB", saved: "−74%" },
  { name: "contract-scan.pdf", before: "8.0 MB", after: "2.6 MB", saved: "−68%" },
];

export function NumbersSection() {
  return (
    <section className="border-b border-line bg-accent-soft/30">
      <div className="container-shell py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="label-mono text-accent-text">The result</p>
            <h2 className="display mt-3 max-w-md text-[clamp(1.9rem,3.2vw,2.5rem)]">
              Every run has <span className="text-accent-text">a number.</span>
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              No vague “optimized” label. You see the original size, the compressed size, and the
              difference before you download.
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
              Sample output, not account data
            </p>
            <DeltaArt className="mt-6 max-w-sm" />
          </div>

          <div className="lg:col-span-7">
            <div className="panel overflow-hidden">
              <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-line px-5 py-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  File
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  Before
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  After
                </span>
                <span className="text-right font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                  Saved
                </span>
              </div>
              {examples.map((example) => (
                <div
                  key={example.name}
                  className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0"
                >
                  <span className="truncate text-[12px] font-medium text-ink">{example.name}</span>
                  <span className="font-mono text-[11px] text-muted">{example.before}</span>
                  <span className="flex items-center gap-2 font-mono text-[11px] text-ink">
                    <ArrowRight className="h-3 w-3 text-muted" />
                    {example.after}
                  </span>
                  <span className="text-right font-mono text-[11px] text-success">
                    {example.saved}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
