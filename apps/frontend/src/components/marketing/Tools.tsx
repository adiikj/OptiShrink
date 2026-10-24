import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { ToolArt } from "@/components/visuals/ToolArt";

const tools = [
  {
    href: "/compressfile",
    kind: "pdf" as const,
    label: "PDF compressor",
    description:
      "Take weight out of reports, decks, and scanned documents. Page counts stay exactly where they were.",
    points: ["Three compression profiles", "Page count preserved", "Up to 20 MB per file"],
  },
  {
    href: "/optimizeimage",
    kind: "image" as const,
    label: "Image optimizer",
    description:
      "Resize and recompress oversized photos without upscaling small ones or flattening the detail.",
    points: ["JPG, PNG, WebP, GIF", "Batch up to 20 images", "Limit-based resizing"],
  },
];

export function Tools() {
  return (
    <section id="tools" className="border-b border-line">
      <div className="container-shell py-16 lg:py-24">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label-mono text-accent-text">Tools</p>
            <h2 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.5rem)]">
              Two tools. <span className="text-accent-text">No detours.</span>
            </h2>
          </div>
          <p className="max-w-sm text-[13px] leading-relaxed text-muted">
            Choose the file type, pick a level, download the result. The workflow fits on one
            screen.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => {
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group panel flex flex-col p-6 transition duration-200 hover:-translate-y-0.5 hover:border-accent/30"
              >
                <div className="flex items-start justify-between">
                  <ToolArt kind={tool.kind} />
                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-accent-text" />
                </div>

                <h3 className="mt-5 text-[18px] font-semibold tracking-[-0.01em] text-ink">
                  {tool.label}
                </h3>
                <p className="mt-2 max-w-md text-[13px] leading-relaxed text-muted">
                  {tool.description}
                </p>

                <ul className="mt-5 space-y-2 border-t border-line pt-4">
                  {tool.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[12px] text-ink-soft">
                      <Check className="h-3.5 w-3.5 text-accent-text" />
                      {point}
                    </li>
                  ))}
                </ul>

                <span className="mt-5 text-[12px] font-medium text-accent-text">
                  Open {tool.label.toLowerCase()} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
