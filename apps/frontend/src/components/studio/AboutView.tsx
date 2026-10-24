import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "./PageHeader";

const stack = [
  ["Frontend", "Next.js · TypeScript · Tailwind CSS"],
  ["API", "Express · TypeScript · Zod"],
  ["Database", "PostgreSQL · Drizzle ORM"],
  ["Processing", "Cloudinary · pdf.co"],
];

export function AboutView() {
  return (
    <div>
      <PageHeader
        kicker="Studio"
        title="About the studio"
        description="OptiShrink is a compression studio built around one job: making a file smaller without quietly changing what it is."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="panel p-5 lg:col-span-2">
          <p className="text-[15px] leading-relaxed text-ink">
            A file is not a problem to be gamified. It is just heavier than it needs to be.
          </p>
          <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-muted">
            <p>
              The first version of this project was built while learning — React on the front, a
              Node API on the back, MongoDB underneath. This revision replaces the data layer with
              PostgreSQL and Drizzle, tightens the upload path, and rebuilds the interface around
              the actual workflow.
            </p>
            <p>
              Compression is delegated to services that do it well: Cloudinary for images and
              pdf.co for PDFs. The studio handles the levels, limits, history, and the
              before-and-after number.
            </p>
          </div>
          <Link
            href="/about"
            className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-text hover:underline"
          >
            Read the full about page
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </section>

        <section className="panel overflow-hidden">
          <div className="border-b border-line px-5 py-3.5">
            <h2 className="text-[13px] font-medium text-ink">The stack</h2>
          </div>
          <dl>
            {stack.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-5 py-3 last:border-b-0"
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  {label}
                </dt>
                <dd className="text-right text-[11px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="border-t border-line bg-paper-deep/40 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.04em] text-muted">
            Designed and maintained by Aditya
          </p>
        </section>
      </div>

      <div className="mt-5 grid gap-px overflow-hidden rounded-panel border border-line bg-line sm:grid-cols-3">
        {[
          {
            title: "20 MB",
            body: "A deliberate per-file ceiling so a single upload cannot stall the studio.",
          },
          {
            title: "03",
            body: "Three levels, enough control without a settings panel full of switches.",
          },
          {
            title: "00",
            body: "Every chart and number comes from your account, or it stays empty.",
          },
        ].map((item) => (
          <div key={item.title} className="bg-surface p-5">
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-ink">{item.title}</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
