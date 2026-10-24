import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";

export const metadata: Metadata = {
  title: "PDF compressor",
  description:
    "Compress PDFs up to 20 MB with three tuned profiles. Page count preserved, download immediately, no account required.",
};

const facts = [
  { value: "20 MB", label: "Maximum file size" },
  { value: "03", label: "Compression profiles" },
  { value: "100%", label: "Page count preserved" },
];

export default function CompressFilePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-shell py-10 lg:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="label-mono">Tool 01 / PDF</p>
              <h1 className="display mt-3 text-[clamp(2rem,4vw,2.9rem)]">
                Make the PDF <span className="text-accent-text">lighter.</span>
              </h1>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                Drop a document, choose how much to take off, and download the result. The page
                count stays exactly where it was, and nothing is queued behind a signup.
              </p>
            </div>

            <dl className="grid shrink-0 grid-cols-3 rounded-panel border border-line bg-surface md:w-[340px]">
              {facts.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`px-3 py-3 ${index > 0 ? "border-l border-line" : ""}`}
                >
                  <dt className="font-mono text-[8px] uppercase leading-tight tracking-[0.04em] text-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[14px] font-medium text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8">
            <CompressionWorkspace kind="pdf" />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-shell grid gap-8 py-10 sm:grid-cols-3">
          {[
            {
              title: "Page count stays put",
              body: "The optimization profiles recompress images inside the document. They do not drop pages or rewrite the layout.",
            },
            {
              title: "Three honest profiles",
              body: "Light keeps more detail, balanced is the everyday default, and strong trades image quality for the smallest file.",
            },
            {
              title: "Signed-in history",
              body: "Sign in before you compress and the result is recorded with its original and compressed size, ready to re-download.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-line pt-4">
              <h2 className="text-[13px] font-medium text-ink">{item.title}</h2>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
