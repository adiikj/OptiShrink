import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { ProductPreview } from "@/components/visuals/ProductPreview";

const trust = ["20 MB per file", "No account required", "Page counts preserved"];

export function Hero() {
  return (
    <section className="border-b border-line">
      <div className="container-shell py-14 lg:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="mb-6 flex items-center gap-2">
              <span className="h-[2px] w-10 bg-accent" />
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>

            <h1 className="display text-[clamp(2.5rem,4.2vw,3.5rem)]">
              Compress files.
              <br />
              Keep the <span className="text-accent-text">details.</span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
              Reduce PDFs and images without losing what matters. Three clear levels, real
              before-and-after sizes, and no account required to start.
            </p>

            <div className="mt-7 flex flex-col gap-2 sm:flex-row">
              <ButtonLink href="/compressfile" size="lg" variant="primary">
                Compress a file
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/optimizeimage" size="lg" variant="secondary">
                Optimize an image
              </ButtonLink>
            </div>

            <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
              {trust.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[12px] text-muted">
                  <Check className="h-3.5 w-3.5 text-accent-text" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-7">
            <ProductPreview />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
            PDF · JPG · PNG · WebP · GIF
          </p>
          <p className="text-[12px] text-muted">
            A small studio for a small job:{" "}
            <Link href="#tools" className="font-medium text-ink underline decoration-accent/40 underline-offset-4">
              see the tools
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
