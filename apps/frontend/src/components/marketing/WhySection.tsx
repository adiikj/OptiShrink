import Link from "next/link";
import { FeatureIcon } from "@/components/visuals/FeatureIcon";
import { QualityMeter } from "@/components/visuals/QualityMeter";

const features = [
  {
    icon: "gauge" as const,
    title: "Quality-first profiles",
    body: "Images only scale down, and PDFs keep their page count. Compression should not quietly rewrite the file.",
  },
  {
    icon: "layers" as const,
    title: "Batch without the mess",
    body: "Queue up to 20 images. Each row keeps its own original name, result size, and download.",
  },
  {
    icon: "history" as const,
    title: "History you can audit",
    body: "Every signed-in run records both byte counts and a timestamp. Delete any entry permanently.",
  },
  {
    icon: "shield" as const,
    title: "Private by default",
    body: "Temporary uploads are removed after each request. Anonymous runs leave no account history.",
  },
];

export function WhySection() {
  return (
    <section className="border-b border-line">
      <div className="container-shell py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="label-mono text-accent-text">The details</p>
            <h2 className="display mt-3 max-w-md text-[clamp(1.9rem,3.2vw,2.5rem)]">
              Built around the file, <span className="text-accent-text">not the dashboard.</span>
            </h2>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-muted">
              The useful parts are visible: the level you chose, the size before and after, and a
              record of what happened. Everything else stays out of the way.
            </p>
            <dl className="mt-8 grid max-w-sm grid-cols-2 gap-4 border-t border-line pt-5">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                  Per file
                </dt>
                <dd className="mt-1 text-[20px] font-semibold text-ink">20 MB</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                  Images per batch
                </dt>
                <dd className="mt-1 text-[20px] font-semibold text-ink">20</dd>
              </div>
            </dl>
            <div className="mt-6 max-w-sm rounded-panel border border-accent/10 bg-accent-soft/40 p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.06em] text-accent-text">
                Three levels
              </p>
              <QualityMeter className="mt-2" />
            </div>
            <Link
              href="/about"
              className="link-underline mt-6 inline-flex text-[12px] font-medium text-accent-text"
            >
              How the studio works
            </Link>
          </div>

          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:col-span-7">
            {features.map((feature) => (
              <div key={feature.title} className="border-t border-line pt-5">
                <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent-text">
                  <FeatureIcon kind={feature.icon} />
                </span>
                <h3 className="mt-3 text-[13px] font-medium text-ink">{feature.title}</h3>
                <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
