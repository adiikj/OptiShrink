import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { Brand } from "@/components/brand/Brand";
import { CompressionFlowArt } from "@/components/visuals/CompressionFlowArt";

const promises = [
  "Three compression levels with clear trade-offs",
  "Batch up to 20 images per run",
  "History you can delete permanently",
];

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen bg-paper lg:grid-cols-[0.9fr_1.1fr]">
      <aside className="relative hidden flex-col justify-between border-r border-line bg-accent-soft p-10 lg:flex xl:p-14">
        <Brand />

        <div className="max-w-md">
          <p className="label-mono text-accent-text">The file studio</p>
          <h1 className="display mt-4 text-[clamp(2.4rem,3.6vw,3.4rem)]">
            Compression without the guesswork.
          </h1>
          <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-ink-soft">
            Keep a record of every run, download past results again, and batch images without
            leaving the studio.
          </p>

          <ul className="mt-7 space-y-3">
            {promises.map((promise) => (
              <li key={promise} className="flex items-start gap-2.5 text-[12px] text-ink-soft">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-text" />
                {promise}
              </li>
            ))}
          </ul>
        </div>

        <div className="max-w-md">
          <CompressionFlowArt className="w-full text-ink/35" />
          <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
            Original → result / measured in bytes
          </p>
        </div>
      </aside>

      <main className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-8">
          <Brand className="lg:hidden" />
          <Link
            href="/"
            className="ml-auto inline-flex items-center gap-1.5 text-[12px] text-muted transition hover:text-ink"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to site
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-14 pt-2 sm:px-8">
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </main>
    </div>
  );
}
