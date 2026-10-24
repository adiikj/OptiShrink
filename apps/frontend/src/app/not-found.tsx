import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/brand/Brand";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <div className="container-shell flex h-16 items-center justify-between border-b border-line">
        <Brand />
        <Link href="/" className="text-[12px] text-muted transition hover:text-ink">
          Back to site
        </Link>
      </div>

      <main className="container-shell flex flex-1 flex-col justify-center py-16">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7">
            <p className="label-mono">404 / Page not found</p>
            <h1 className="display mt-3 text-[clamp(2.5rem,5vw,3.6rem)]">
              This page isn&apos;t here.
            </h1>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              It may have moved, been deleted, or never existed. The compressor is still available
              if you need to make a file smaller.
            </p>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <Link href="/" className={buttonClass("primary", "md")}>
                <ArrowLeft className="h-4 w-4" />
                Back to the site
              </Link>
              <Link href="/compressfile" className={buttonClass("secondary", "md")}>
                Compress a file
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-line px-4 py-3">
                <span className="text-[12px] font-medium text-ink">Request</span>
                <span className="font-mono text-[10px] text-muted">404</span>
              </div>
              <dl>
                {[
                  ["Status", "Not found"],
                  ["File", "-"],
                  ["Compression", "Not run"],
                  ["Weight", "0 B"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between border-b border-line px-4 py-3 last:border-b-0"
                  >
                    <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                      {label}
                    </dt>
                    <dd className="font-mono text-[11px] text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="border-t border-line bg-paper-deep/40 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                Nothing was uploaded
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
