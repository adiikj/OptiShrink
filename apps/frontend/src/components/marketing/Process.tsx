import { Download, FileUp, SlidersHorizontal } from "lucide-react";

const steps = [
  {
    index: "01",
    title: "Add a file",
    body: "Choose a PDF or image, or drag up to 20 files into the queue. Each file can be up to 20 MB.",
    icon: FileUp,
  },
  {
    index: "02",
    title: "Choose a level",
    body: "Light keeps more detail. Balanced is the default. Strong takes the most weight off.",
    icon: SlidersHorizontal,
  },
  {
    index: "03",
    title: "Download the result",
    body: "The new size is shown before you download. Sign in if you want the run added to your history.",
    icon: Download,
  },
];

export function Process() {
  return (
    <section className="border-b border-line bg-accent-soft/30">
      <div className="container-shell py-16 lg:py-24">
        <div className="max-w-xl">
          <p className="label-mono text-accent-text">How it works</p>
          <h2 className="display mt-3 text-[clamp(1.9rem,3.2vw,2.5rem)]">
            Three steps, <span className="text-accent-text">one screen.</span>
          </h2>
          <p className="mt-3 text-[13px] leading-relaxed text-muted">
            Nothing is hidden behind an account wall or a second workflow. The result is ready as
            soon as the request finishes.
          </p>
        </div>

        <div className="relative mt-10">
          <svg
            className="pointer-events-none absolute left-[8%] right-[8%] top-5 hidden h-2 md:block"
            viewBox="0 0 1000 8"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 4h1000"
              stroke="rgb(var(--accent))"
              strokeOpacity="0.25"
              strokeWidth="1.4"
              strokeDasharray="4 7"
            />
          </svg>

          <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <li key={step.index}>
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-accent/20 bg-surface text-accent-text shadow-sm">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="mt-4 block font-mono text-[10px] tracking-[0.06em] text-accent-text">
                    {step.index}
                  </span>
                  <h3 className="mt-1 text-[15px] font-medium text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-muted">{step.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
