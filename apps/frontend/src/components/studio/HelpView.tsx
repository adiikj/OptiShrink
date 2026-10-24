import { ArrowUpRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/faq";
import { PageHeader } from "./PageHeader";

const steps = [
  {
    index: "01",
    title: "Choose a level",
    body: "Light, balanced, or strong. The level changes image quality and maximum dimensions; the page count never changes.",
  },
  {
    index: "02",
    title: "Compress",
    body: "Images are sent to Cloudinary, PDFs to pdf.co. Temporary uploads on our server are removed when the request finishes.",
  },
  {
    index: "03",
    title: "Keep or discard",
    body: "Download right away. If you are signed in, the run is recorded; otherwise nothing is kept in your account.",
  },
];

export function HelpView() {
  return (
    <div>
      <PageHeader
        kicker="Support"
        title="Help & support"
        description="How uploads move through the studio, what each level changes, and where your files actually live."
      />

      <section className="panel overflow-hidden">
        <div className="grid gap-px bg-line sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.index} className="bg-surface p-5">
              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-accent-text">
                {step.index}
              </span>
              <h2 className="mt-2 text-[13px] font-medium text-ink">{step.title}</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
        <section className="panel p-5 lg:col-span-1">
          <p className="label-mono">Frequently asked</p>
          <h2 className="display mt-2 text-[1.5rem]">Before you ask.</h2>
          <p className="mt-3 text-[12px] leading-relaxed text-muted">
            If your question is about a specific file that failed, include the format, size, and
            compression level when you get in touch.
          </p>
        </section>
        <section className="panel p-5 lg:col-span-2">
          <Accordion items={faqItems} />
        </section>
      </div>

      <section className="mt-5 rounded-panel border border-accent/15 bg-accent-soft p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-[14px] font-medium text-ink">Still stuck?</h2>
            <p className="mt-1 max-w-md text-[12px] leading-relaxed text-ink-soft">
              Include the file name and its before-and-after size if something refused to shrink.
            </p>
          </div>
          <a
            href="https://adiikj.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-accent px-4 py-2.5 text-[12px] font-medium text-accent-ink transition hover:bg-accent-text sm:self-auto"
          >
            Contact the builder
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.04em] text-muted">
        Retention: the database stores the result URL, file name, original and compressed bytes,
        page count, and timestamp. The hosted copy is controlled by Cloudinary or pdf.co.
      </p>
    </div>
  );
}
