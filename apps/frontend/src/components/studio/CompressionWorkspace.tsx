"use client";

/* eslint-disable @next/next/no-img-element -- Remote and blob URLs are user content; the Next image optimizer cannot safely handle them. */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ApiClientError, uploadImages, uploadPdf } from "@/lib/api";
import { cn } from "@/lib/cn";
import { formatBytes, savingsPercent } from "@/lib/format";
import type { CompressionLevel, CompressedFile, FileKind } from "@/lib/types";
import { FileGlyph } from "@/components/visuals/FileGlyph";
import { Dropzone } from "./Dropzone";
import { LevelPicker } from "./LevelPicker";
import { ResultList } from "./ResultList";

const MAX_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 20;

const imageTypes: Record<string, true> = {
  "image/jpeg": true,
  "image/png": true,
  "image/webp": true,
  "image/gif": true,
};

interface QueueItem {
  id: string;
  file: File;
  preview?: string;
}

interface ResultItem {
  queueId: string;
  file: CompressedFile;
}

export function CompressionWorkspace({
  kind,
  allowMultiple = false,
  maxFiles = MAX_FILES,
  mode = "public",
}: {
  kind: FileKind;
  allowMultiple?: boolean;
  maxFiles?: number;
  mode?: "public" | "studio";
}) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [level, setLevel] = useState<CompressionLevel>("medium");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<ResultItem[]>([]);
  const [failures, setFailures] = useState<Record<string, string>>({});
  const previews = useRef<string[]>([]);

  useEffect(() => {
    const urls = previews.current;
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const isSupported = (file: File) =>
    kind === "image"
      ? imageTypes[file.type] === true
      : file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");

  const addFiles = (files: File[]) => {
    const available = allowMultiple ? Math.max(0, maxFiles - queue.length) : 1;
    const accepted: QueueItem[] = [];
    const rejected: string[] = [];

    for (const file of files) {
      if (accepted.length >= available) break;
      if (!isSupported(file)) {
        rejected.push(`${file.name} is not a supported ${kind === "image" ? "image" : "PDF"}.`);
        continue;
      }
      if (file.size > MAX_BYTES) {
        rejected.push(`${file.name} is over the 20 MB limit.`);
        continue;
      }

      const preview = kind === "image" ? URL.createObjectURL(file) : undefined;
      if (preview) previews.current.push(preview);
      accepted.push({ id: crypto.randomUUID(), file, preview });
    }

    if (files.length > available && accepted.length === available) {
      rejected.push(
        allowMultiple
          ? `You can add up to ${maxFiles} files at a time.`
          : "Only one file can be added at a time.",
      );
    }

    if (accepted.length > 0) {
      if (allowMultiple) {
        setQueue((current) => [...current, ...accepted]);
      } else {
        queue.forEach((item) => {
          if (item.preview) URL.revokeObjectURL(item.preview);
        });
        setQueue(accepted);
      }
      setResults([]);
      setFailures({});
      setProgress(0);
    }

    if (rejected.length > 0) {
      toast(rejected[0], "error");
    }
  };

  const removeItem = (id: string) => {
    setQueue((current) => {
      const item = current.find((entry) => entry.id === id);
      if (item?.preview) URL.revokeObjectURL(item.preview);
      return current.filter((entry) => entry.id !== id);
    });
    setResults((current) => current.filter((entry) => entry.queueId !== id));
    setFailures((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
  };

  const reset = () => {
    queue.forEach((item) => {
      if (item.preview) URL.revokeObjectURL(item.preview);
    });
    setQueue([]);
    setResults([]);
    setFailures({});
    setProgress(0);
  };

  const compress = async () => {
    if (queue.length === 0 || busy) return;

    setBusy(true);
    setProgress(0);
    setResults([]);
    setFailures({});

    const nextResults: ResultItem[] = [];
    const nextFailures: Record<string, string> = {};

    for (let index = 0; index < queue.length; index++) {
      const item = queue[index];
      const onUpload = (within: number) => {
        setProgress(
          Math.max(1, Math.round(((index + within / 100) / queue.length) * 100)),
        );
      };

      try {
        if (kind === "image") {
          const [file] = await uploadImages([item.file], level, onUpload);
          if (!file) throw new ApiClientError("The server returned no result for this file.");
          nextResults.push({ queueId: item.id, file });
        } else {
          const file = await uploadPdf(item.file, level, onUpload);
          nextResults.push({ queueId: item.id, file });
        }
        setResults([...nextResults]);
      } catch (error) {
        nextFailures[item.id] =
          error instanceof ApiClientError
            ? error.message
            : "This file could not be compressed. Try again.";
        setFailures({ ...nextFailures });
      }

      setProgress(Math.round(((index + 1) / queue.length) * 100));
    }

    setBusy(false);

    if (nextResults.length > 0) {
      toast(
        nextResults.length === 1
          ? "Compressed and ready to download."
          : `${nextResults.length} files compressed.`,
        "success",
      );
    }
    if (Object.keys(nextFailures).length > 0) {
      toast("Some files could not be compressed. Check the queue for details.", "error");
    }
  };

  const resultFor = (id: string) => results.find((entry) => entry.queueId === id);
  const resultFiles = results.map((entry) => entry.file);
  const canCompress = queue.length > 0 && !busy;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.55fr_0.45fr] lg:items-start">
      <div className="space-y-4">
        <Dropzone
          kind={kind}
          multiple={allowMultiple}
          busy={busy}
          compact={queue.length > 0}
          onFiles={addFiles}
        />

        {queue.length > 0 ? (
          <section className="panel overflow-hidden">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2">
                <h2 className="text-[12px] font-medium text-ink">Queue</h2>
                <span className="rounded-md bg-paper-deep px-1.5 py-0.5 font-mono text-[9px] text-muted">
                  {queue.length}
                </span>
              </div>
              <button
                type="button"
                onClick={reset}
                disabled={busy}
                className="text-[11px] text-muted transition hover:text-ink disabled:opacity-40"
              >
                Clear all
              </button>
            </div>

            <ul>
              {queue.map((item) => {
                const result = resultFor(item.id);
                const failure = failures[item.id];
                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 border-b border-line px-4 py-3 last:border-b-0"
                  >
                    <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-paper-deep">
                      {item.preview ? (
                        <img src={item.preview} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-accent-text">
                          <FileGlyph kind="pdf" className="h-4 w-4" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[12px] font-medium text-ink">{item.file.name}</p>
                      <p
                        className={cn(
                          "mt-0.5 font-mono text-[9px] text-muted",
                          failure && "text-danger",
                        )}
                      >
                        {failure ?? formatBytes(item.file.size)}
                      </p>
                    </div>

                    {result ? (
                      <Badge tone="success">
                        −{savingsPercent(result.file.originalBytes, result.file.compressedBytes)}%
                      </Badge>
                    ) : failure ? (
                      <AlertCircle className="h-4 w-4 shrink-0 text-danger" />
                    ) : null}

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      disabled={busy}
                      className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink disabled:opacity-30"
                      aria-label={`Remove ${item.file.name}`}
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <ResultList results={resultFiles} />

        {results.length > 0 && !busy ? (
          <div className="flex justify-end">
            <Button variant="ghost" size="sm" onClick={reset}>
              <RotateCcw className="h-3.5 w-3.5" />
              Start another run
            </Button>
          </div>
        ) : null}
      </div>

      <aside className="panel p-4 lg:sticky lg:top-20">
        <div className="flex items-center justify-between">
          <h2 className="text-[12px] font-medium text-ink">Settings</h2>
          <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
            {kind === "pdf" ? "PDF" : "Image"}
          </span>
        </div>

        <div className="mt-4">
          <LevelPicker kind={kind} value={level} onChange={setLevel} disabled={busy} />
        </div>

        <div className="mt-4">
          <Button
            onClick={() => void compress()}
            disabled={!canCompress}
            loading={busy}
            className="w-full"
            size="lg"
          >
            {busy
              ? "Compressing…"
              : results.length > 0
                ? "Compress again"
                : queue.length > 1
                  ? `Compress ${queue.length} files`
                  : "Compress file"}
          </Button>

          {busy ? (
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  Working
                </span>
                <span className="text-[12px] font-medium text-ink">{progress}%</span>
              </div>
              <div
                role="progressbar"
                aria-label="Compression progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-paper-deep"
              >
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ) : null}

          <p className="mt-3 text-[11px] leading-relaxed text-muted">
            {mode === "public" && !user ? (
              <>
                No account needed.{" "}
                <Link href="/signin" className="font-medium text-accent-text hover:underline">
                  Sign in
                </Link>{" "}
                to keep a record of this run.
              </>
            ) : user ? (
              "This run will be saved to your history."
            ) : (
              "Batch runs are saved to your history."
            )}
          </p>
        </div>
      </aside>
    </div>
  );
}
