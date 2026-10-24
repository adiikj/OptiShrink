import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { CompressionFlowArt } from "@/components/visuals/CompressionFlowArt";

export function CtaSection() {
  return (
    <section className="border-b border-line">
      <div className="container-shell py-16 lg:py-20">
        <div className="overflow-hidden rounded-2xl bg-navy px-6 py-10 text-white sm:px-10">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] uppercase tracking-[0.08em] text-[#A9BDFF]">
                Start here
              </p>
              <h2 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.5rem)] text-white">
                Give the next file a little{" "}
                <span className="text-[#A9BDFF]">less weight.</span>
              </h2>
              <p className="mt-4 max-w-md text-[13px] leading-relaxed text-white/65">
                No signup, no queue. Compress a file and see the real before-and-after size in one
                pass.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <ButtonLink
                  href="/compressfile"
                  variant="primary"
                  size="md"
                  className="border-white bg-white text-navy hover:border-[#DCE6FF] hover:bg-[#DCE6FF] hover:text-navy"
                >
                  Compress a file
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <Link
                  href="/signup"
                  className={buttonClass(
                    "ghost",
                    "md",
                    "border-white/20 text-white hover:bg-white/10",
                  )}
                >
                  Create an account
                </Link>
              </div>
            </div>

            <CompressionFlowArt className="mx-auto hidden w-full max-w-[320px] text-white/25 lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}
