"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { CompressionLevel } from "@/lib/types";

interface LevelOption {
  value: CompressionLevel;
  label: string;
  description: string;
  detail: string;
}

const imageLevels: LevelOption[] = [
  {
    value: "low",
    label: "Light",
    description: "Keeps detail and colour. Best for print or portfolios.",
    detail: "≤ 2560 px · quality 82",
  },
  {
    value: "medium",
    label: "Balanced",
    description: "The everyday default. Noticeably smaller, still sharp.",
    detail: "≤ 1920 px · quality 68",
  },
  {
    value: "high",
    label: "Strong",
    description: "Smallest output. Best for web, email, and thumbnails.",
    detail: "≤ 1280 px · quality 50",
  },
];

const pdfLevels: LevelOption[] = [
  {
    value: "low",
    label: "Light",
    description: "A light touch. Keeps images crisp for presentations.",
    detail: "JPEG 55 · 170 dpi",
  },
  {
    value: "medium",
    label: "Balanced",
    description: "A sensible default for sending and archiving.",
    detail: "JPEG 35 · 130 dpi",
  },
  {
    value: "high",
    label: "Strong",
    description: "Maximum reduction, greyscale images. Best for scans.",
    detail: "JPEG 20 · 100 dpi",
  },
];

export function LevelPicker({
  kind,
  value,
  onChange,
  disabled,
}: {
  kind: "image" | "pdf";
  value: CompressionLevel;
  onChange: (level: CompressionLevel) => void;
  disabled?: boolean;
}) {
  const options = kind === "image" ? imageLevels : pdfLevels;

  return (
    <fieldset disabled={disabled} className="space-y-2">
      <legend className="label-mono mb-2">Compression level</legend>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition",
              selected
                ? "border-accent bg-accent-soft/60"
                : "border-line bg-surface hover:border-line-strong",
              disabled && "cursor-not-allowed opacity-60",
            )}
          >
            <input
              type="radio"
              name={`level-${kind}`}
              value={option.value}
              checked={selected}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={cn(
                "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                selected ? "border-accent bg-accent text-accent-ink" : "border-line-strong bg-surface",
              )}
            >
              {selected ? <Check className="h-2.5 w-2.5" /> : null}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium text-ink">{option.label}</span>
              <span className="mt-0.5 block text-[11px] leading-relaxed text-muted">
                {option.description}
              </span>
              <span className="mt-1.5 block font-mono text-[8px] uppercase tracking-[0.04em] text-muted">
                {option.detail}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
