"use client";

import { useRef, useState } from "react";
import { Plus, Upload } from "lucide-react";
import { cn } from "@/lib/cn";

const accepts: Record<"image" | "pdf", string> = {
  image: "image/jpeg,image/png,image/webp,image/gif",
  pdf: "application/pdf,.pdf",
};

export function Dropzone({
  kind,
  multiple,
  busy,
  compact,
  onFiles,
}: {
  kind: "image" | "pdf";
  multiple: boolean;
  busy: boolean;
  compact: boolean;
  onFiles: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const openPicker = () => {
    if (!busy) inputRef.current?.click();
  };

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    onFiles(Array.from(list));
    if (inputRef.current) inputRef.current.value = "";
  };

  if (compact) {
    return (
      <label
        tabIndex={0}
        role="button"
        aria-label={`Add more ${kind === "image" ? "images" : "files"}`}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openPicker();
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!busy) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          if (!busy) handleFiles(event.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-dashed border-line-strong bg-surface px-4 py-3 transition hover:border-accent/50",
          dragging && "border-accent bg-accent-soft/50",
          busy && "pointer-events-none opacity-50",
        )}
      >
        <span className="flex items-center gap-2 text-[12px] text-ink">
          <Plus className="h-3.5 w-3.5 text-accent-text" />
          Add more {kind === "image" ? "images" : "files"}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
          {kind === "image" ? "JPG · PNG · WEBP · GIF" : "PDF"}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accepts[kind]}
          multiple={multiple}
          className="hidden"
          onChange={(event) => handleFiles(event.target.files)}
          disabled={busy}
        />
      </label>
    );
  }

  return (
    <label
      tabIndex={0}
      role="button"
      aria-label={`Choose ${kind === "image" ? "images" : "a PDF"} to compress`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openPicker();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        if (!busy) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        if (!busy) handleFiles(event.dataTransfer.files);
      }}
      className={cn(
        "flex min-h-[300px] cursor-pointer flex-col items-center justify-center rounded-panel border border-dashed border-line-strong bg-surface px-6 py-12 text-center transition duration-200 hover:border-accent/50 hover:bg-accent-soft/20",
        dragging && "border-accent bg-accent-soft/50",
        busy && "pointer-events-none opacity-50",
      )}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent-text">
        <Upload className="h-5 w-5" />
      </span>
      <p className="mt-4 text-[15px] font-medium text-ink">
        Drop {kind === "image" ? "images" : "your PDF"} here
      </p>
      <p className="mt-1.5 max-w-sm text-[12px] leading-relaxed text-muted">
        or{" "}
        <span className="font-medium text-accent-text underline underline-offset-2">browse files</span>
        {" — "}
        {kind === "image" ? "JPG, PNG, WebP, or GIF" : "PDF document"} up to 20 MB each.
      </p>
      <div className="mt-5 flex items-center gap-2">
        <span className="rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
          {kind === "image" ? "Multiple files" : "One file"}
        </span>
        <span className="rounded-md border border-line px-2 py-1 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
          Max 20 MB
        </span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accepts[kind]}
        multiple={multiple}
        className="hidden"
        onChange={(event) => handleFiles(event.target.files)}
        disabled={busy}
      />
    </label>
  );
}
