import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  description,
  action,
}: {
  kicker: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="max-w-2xl">
        <p className="label-mono text-accent-text">{kicker}</p>
        <h1 className="display mt-2 text-[1.75rem] sm:text-[2rem]">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0 md:pt-5">{action}</div> : null}
    </div>
  );
}
