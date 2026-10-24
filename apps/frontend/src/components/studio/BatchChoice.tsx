import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FileGlyph } from "@/components/visuals/FileGlyph";
import { PageHeader } from "./PageHeader";

const options = [
  {
    href: "/dashboard/batchcompress/image",
    kind: "image" as const,
    label: "Batch images",
    description:
      "Drop up to 20 JPG, PNG, WebP, or GIF files. Each one is processed in order and shows its own result.",
    meta: ["20 files per run", "20 MB each", "Download all"],
  },
  {
    href: "/dashboard/batchcompress/pdf",
    kind: "pdf" as const,
    label: "Batch PDFs",
    description:
      "Queue several documents and compress them one at a time so each run gets a clean response.",
    meta: ["Sequential runs", "20 MB each", "Page count kept"],
  },
];

export function BatchChoice() {
  return (
    <div>
      <PageHeader
        kicker="Workspace"
        title="Batch compression"
        description="Choose a format. Every file in the queue gets the same profile, its own sizes, and its own download."
      />

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option) => (
          <Link
            key={option.href}
            href={option.href}
            className="group panel flex flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30"
          >
            <div className="flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-soft text-accent-text">
                <FileGlyph kind={option.kind} className="h-5 w-5" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-accent-text" />
            </div>

            <h2 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-ink">
              {option.label}
            </h2>
            <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
              {option.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5 border-t border-line pt-4">
              {option.meta.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line px-2 py-1 font-mono text-[9px] text-muted"
                >
                  {item}
                </span>
              ))}
            </div>

            <span className="mt-4 text-[12px] font-medium text-accent-text">
              Open {option.label.toLowerCase()} →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
