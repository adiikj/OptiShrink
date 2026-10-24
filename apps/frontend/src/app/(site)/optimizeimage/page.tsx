import type { Metadata } from "next";
import { CompressionWorkspace } from "@/components/studio/CompressionWorkspace";

export const metadata: Metadata = {
  title: "Image optimizer",
  description:
    "Optimize JPG, PNG, WebP, and GIF images in batches of up to 20. Limit-based resizing keeps small images untouched.",
};

const facts = [
  { value: "20", label: "Images per batch" },
  { value: "04", label: "Formats supported" },
  { value: "20 MB", label: "Per image" },
];

export default function OptimizeImagePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-shell py-10 lg:py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="label-mono">Tool 02 / Images</p>
              <h1 className="display mt-3 text-[clamp(2rem,4vw,2.9rem)]">
                Take the weight out. <span className="text-accent-text">Keep the detail.</span>
              </h1>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-muted">
                Oversized photos get scaled down, recompressed, and served in a modern format.
                Small images are left alone — the profiles only ever limit dimensions.
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
            <CompressionWorkspace kind="image" allowMultiple maxFiles={20} />
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-shell grid gap-8 py-10 sm:grid-cols-3">
          {[
            {
              title: "Only scales down",
              body: "The limit-based resize means a 1200 px photo stays 1200 px. Nothing is upscaled or sharpened into artifacts.",
            },
            {
              title: "Batch in order",
              body: "Drop up to 20 images. They are processed one by one, with per-file results and a single download-all action.",
            },
            {
              title: "Transparent savings",
              body: "Every result shows the original size, compressed size, and the percentage saved before you download it.",
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
