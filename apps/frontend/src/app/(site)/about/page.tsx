import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import first from "@/assets/files-pile.png";
import second from "@/assets/files-arrange.png";
import { CtaSection } from "@/components/marketing/CtaSection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why OptiShrink exists, what it does, and what it deliberately leaves out. A file compression studio built by Aditya.",
};

const principles = [
  {
    title: "Show the number",
    body: "Every run records the original size, the compressed size, and the difference. A saving should be visible, not implied.",
  },
  {
    title: "Keep the structure",
    body: "PDFs keep their page count. Images keep their aspect ratio. Optimization is not permission to rewrite the file.",
  },
  {
    title: "Leave less behind",
    body: "Temporary uploads are deleted after every request. History is a choice, and any entry can be removed permanently.",
  },
  {
    title: "Stay out of the way",
    body: "No gamification, no fake urgency, no interstitials. The interface is quiet because the job is ordinary.",
  },
];

const stack = [
  ["Frontend", "Next.js · TypeScript · Tailwind CSS"],
  ["Backend", "Express · TypeScript · Zod"],
  ["Database", "PostgreSQL · Drizzle ORM"],
  ["Processing", "Cloudinary · pdf.co"],
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="container-shell py-14 lg:py-20">
          <p className="label-mono">About</p>
          <h1 className="display mt-3 max-w-3xl text-[clamp(2.4rem,4.6vw,3.6rem)]">
            A smaller file should still be the same file.
          </h1>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
            OptiShrink started with a plain problem: files too heavy to send and too important to
            flatten. It is a small studio for the unglamorous work of making them lighter without
            changing what they are.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <figure>
              <div className="overflow-hidden rounded-panel border border-line bg-paper-deep">
                <Image
                  src={first}
                  alt="An oversized pile of files waiting to be compressed"
                  className="aspect-[4/3] w-full object-contain p-5 grayscale contrast-125"
                />
              </div>
              <figcaption className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                <span>Fig. 01</span>
                <span>The pile</span>
              </figcaption>
            </figure>

            <figure>
              <div className="overflow-hidden rounded-panel border border-line bg-paper-deep">
                <Image
                  src={second}
                  alt="A person arranging large image frames"
                  className="aspect-[4/3] w-full object-contain p-5 grayscale contrast-125"
                />
              </div>
              <figcaption className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                <span>Fig. 02</span>
                <span>The edit</span>
              </figcaption>
            </figure>

            <div className="rounded-panel border border-line bg-surface p-5 shadow-sm sm:col-span-2">
              <p className="label-mono">In plain terms</p>
              <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                Compress a PDF or an image, choose how much detail to trade for size, and download
                the result. Signed-in runs are recorded with their exact byte counts.
              </p>
              <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-line pt-4">
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                    Per file
                  </dt>
                  <dd className="mt-1 text-[18px] font-semibold text-ink">20 MB</dd>
                </div>
                <div>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                    Levels
                  </dt>
                  <dd className="mt-1 text-[18px] font-semibold text-ink">03</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-deep/50">
        <div className="container-shell py-14 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="label-mono">Principles</p>
              <h2 className="display mt-3 text-[clamp(1.8rem,2.8vw,2.2rem)]">Small by design.</h2>
              <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted">
                Deliberate limits, visible numbers, and no illusion that compression is magic.
              </p>
            </div>
            <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {principles.map((item) => (
                <div key={item.title} className="border-t border-line pt-4">
                  <h3 className="text-[13px] font-medium text-ink">{item.title}</h3>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-shell grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <p className="label-mono">Under the hood</p>
            <h2 className="display mt-3 text-[clamp(1.8rem,2.8vw,2.2rem)]">Boring pieces.</h2>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-muted">
              The stack is small enough to understand in one sitting. Compression is delegated to
              services that do it well; the studio handles the workflow around it.
            </p>
          </div>
          <dl className="border-t border-line lg:col-span-7">
            {stack.map(([label, value]) => (
              <div
                key={label}
                className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line py-4"
              >
                <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  {label}
                </dt>
                <dd className="text-right text-[12px] text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="container-shell py-14 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label-mono">The short story</p>
              <h2 className="display mt-3 max-w-2xl text-[clamp(1.8rem,2.8vw,2.2rem)]">
                Built in public, revised with intent.
              </h2>
              <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-muted">
                The first version of OptiShrink was a MongoDB and React project built for learning.
                This revision replaces the data layer with PostgreSQL and Drizzle, tightens the
                upload path, and rebuilds the interface around one job: getting a smaller file out
                the other side.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-panel border border-line bg-surface p-5 shadow-sm">
                <p className="label-mono">Maintained by</p>
                <div className="mt-2 flex items-center justify-between gap-4">
                  <p className="text-[15px] font-medium text-ink">Aditya</p>
                  <Link
                    href="https://adiikj.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-text hover:underline"
                  >
                    adiikj.dev
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
                <p className="mt-3 border-t border-line pt-3 text-[12px] leading-relaxed text-muted">
                  Questions, bugs, and strong opinions are welcome. Include the file name and its
                  before-and-after size if something refused to shrink.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
