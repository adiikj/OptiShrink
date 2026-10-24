import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems } from "@/lib/faq";
import { FaqArt } from "@/components/visuals/FaqArt";

export function FaqSection() {
  return (
    <section className="border-b border-line">
      <div className="container-shell grid gap-10 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-4">
          <p className="label-mono text-accent-text">Questions</p>
          <h2 className="display mt-3 text-[clamp(1.9rem,3vw,2.3rem)]">
            Before you <span className="text-accent-text">start.</span>
          </h2>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-muted">
            The short answers are here. The help page has the longer version, including how files
            move through the compression providers.
          </p>
          <Link
            href="/dashboard/help"
            className="link-underline mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-accent-text"
          >
            Visit help
            <ArrowUpRight className="h-3 w-3" />
          </Link>
          <FaqArt className="mt-8" />
        </div>
        <div className="lg:col-span-8">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
}
