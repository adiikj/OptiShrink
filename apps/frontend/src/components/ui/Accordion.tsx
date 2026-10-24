import type { ReactNode } from "react";
import { Plus } from "lucide-react";

export interface AccordionItem {
  question: string;
  answer: ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex items-center justify-between gap-6 py-4 text-left">
            <span className="text-[14px] font-medium leading-snug text-ink">
              {item.question}
            </span>
            <span className="faq-plus flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line text-muted transition duration-200 group-hover:border-line-strong group-hover:text-ink">
              <Plus className="h-3.5 w-3.5" />
            </span>
          </summary>
          <div className="max-w-2xl pb-5 pr-10 text-[13px] leading-relaxed text-muted">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
