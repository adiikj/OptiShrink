import Link from "next/link";
import { Brand } from "@/components/brand/Brand";

const columns = [
  {
    title: "Tools",
    links: [
      { href: "/compressfile", label: "PDF compressor" },
      { href: "/optimizeimage", label: "Image optimizer" },
      { href: "/dashboard/batchcompress", label: "Batch compression" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/history", label: "History" },
      { href: "/dashboard/analytics", label: "Analytics" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/dashboard/help", label: "Help & support" },
      { href: "/signup", label: "Create account" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-surface">
      <div className="container-shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Brand />
            <p className="mt-4 max-w-sm text-[13px] leading-relaxed text-muted">
              A focused compression studio for PDFs and images. Smaller output, the same document,
              and a number you can verify.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {["PDF", "JPG", "PNG", "WEBP", "GIF"].map((format) => (
                <span
                  key={format}
                  className="rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted"
                >
                  {format}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h2 className="font-mono text-[10px] uppercase tracking-[0.08em] text-accent-text">
                  {column.title}
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[12px] text-ink-soft transition-colors hover:text-accent-text"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
            © {new Date().getFullYear()} OptiShrink. All rights reserved.
          </p>
          <p className="text-[11px] text-muted">
            Built by{" "}
            <a
              href="https://adiikj.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-ink underline decoration-accent/40 underline-offset-4"
            >
              Aditya
            </a>
            <span className="mx-2 text-line-strong">·</span>
            Illustrations via Freepik
          </p>
        </div>
      </div>
    </footer>
  );
}
