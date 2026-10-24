"use client";

/* eslint-disable @next/next/no-img-element -- Remote and blob URLs are user content; the Next image optimizer cannot safely handle them. */
import { useCallback, useEffect, useState } from "react";
import { Download, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/context/ToastContext";
import { ApiClientError, deleteHistoryFile, getHistory } from "@/lib/api";
import { cn } from "@/lib/cn";
import { downloadFromUrl } from "@/lib/download";
import {
  formatBytes,
  formatRelativeDay,
  optimizedName,
  savingsPercent,
} from "@/lib/format";
import type { CompressedFile, FileKind } from "@/lib/types";
import { FileGlyph } from "@/components/visuals/FileGlyph";
import { PageHeader } from "./PageHeader";

const filters: Array<{ value: "all" | FileKind; label: string }> = [
  { value: "all", label: "All runs" },
  { value: "image", label: "Images" },
  { value: "pdf", label: "PDFs" },
];

export function HistoryView() {
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | FileKind>("all");
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await getHistory(filter === "all" ? undefined : filter);
      setFiles(next);
    } catch (caught) {
      setError(
        caught instanceof ApiClientError ? caught.message : "The history could not be loaded.",
      );
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleDelete = async (file: CompressedFile) => {
    if (!file.id) return;
    setDeletingId(file.id);
    try {
      await deleteHistoryFile(file.id);
      setFiles((current) => current.filter((entry) => entry.id !== file.id));
      setConfirmId(null);
      toast("Removed from your history.", "success");
    } catch (caught) {
      toast(
        caught instanceof ApiClientError ? caught.message : "That file could not be removed.",
        "error",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Records"
        title="History"
        description="Every signed-in run is recorded with its original name, both sizes, and the time it happened. Download it again or delete the record."
        action={
          <ButtonLink href="/dashboard/optimizeimage" size="sm">
            Start a run
          </ButtonLink>
        }
      />

      {error ? (
        <div className="mb-4 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-[12px] text-danger">
          {error}
        </div>
      ) : null}

      <section className="panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <div className="flex items-center gap-1" role="tablist" aria-label="Filter history">
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={filter === item.value}
                onClick={() => {
                  setFilter(item.value);
                  setConfirmId(null);
                }}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-[11px] font-medium transition",
                  filter === item.value
                    ? "bg-accent-soft text-accent-text"
                    : "text-muted hover:bg-paper-deep hover:text-ink",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
              {loading ? "Loading" : `${files.length} ${files.length === 1 ? "run" : "runs"}`}
            </span>
            <button
              type="button"
              onClick={() => void load()}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
              aria-label="Refresh history"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {loading ? (
          <div>
            {[0, 1, 2, 3].map((row) => (
              <div key={row} className="flex items-center gap-3 border-b border-line px-4 py-3.5 last:border-b-0">
                <div className="h-9 w-9 animate-pulse rounded-md bg-paper-deep" />
                <div className="flex-1 space-y-2">
                  <div className="h-2.5 w-48 animate-pulse rounded bg-paper-deep" />
                  <div className="h-2 w-28 animate-pulse rounded bg-paper-deep" />
                </div>
              </div>
            ))}
          </div>
        ) : files.length === 0 ? (
          <EmptyState
            title={filter === "all" ? "No runs yet" : `No ${filter === "pdf" ? "PDFs" : "images"} yet`}
            description={
              filter === "all"
                ? "Run a compression while signed in and it will appear here with its before-and-after sizes."
                : "Switch the filter or compress a file to start this list."
            }
            action={
              <ButtonLink href="/dashboard/optimizeimage" size="sm">
                Compress something
              </ButtonLink>
            }
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-left">
              <thead>
                <tr className="border-b border-line bg-paper-deep/40">
                  {["File", "Type", "Original", "Result", "Saved", "When", ""].map((heading, index) => (
                    <th
                      key={`${heading}-${index}`}
                      scope="col"
                      className={cn(
                        "px-4 py-2.5 font-mono text-[9px] font-normal uppercase tracking-[0.06em] text-muted",
                        index === 6 && "text-right",
                      )}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id ?? file.url} className="border-b border-line last:border-b-0">
                    <td className="max-w-[280px] px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-paper-deep">
                          {file.kind === "image" ? (
                            <img src={file.url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <span className="flex h-full w-full items-center justify-center text-accent-text">
                              <FileGlyph kind="pdf" className="h-4 w-4" />
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-[12px] font-medium text-ink">{file.fileName}</p>
                          <p className="mt-0.5 font-mono text-[9px] text-muted">
                            {file.pageCount ? `${file.pageCount} pages` : "Image"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-muted">
                      {file.kind === "image" ? "Image" : "PDF"}
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted">
                      {formatBytes(file.originalBytes)}
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-ink">
                      {formatBytes(file.compressedBytes)}
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone="success">
                        −{savingsPercent(file.originalBytes, file.compressedBytes)}%
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-[11px] text-muted">
                      {formatRelativeDay(file.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {confirmId === file.id ? (
                          <>
                            <span className="mr-1 text-[10px] text-danger">Remove?</span>
                            <Button
                              variant="danger"
                              size="sm"
                              className="h-7 px-2"
                              loading={deletingId === file.id}
                              onClick={() => void handleDelete(file)}
                            >
                              Yes
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-7 px-2"
                              onClick={() => setConfirmId(null)}
                            >
                              No
                            </Button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                void downloadFromUrl(file.url, optimizedName(file.fileName))
                              }
                              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
                              aria-label={`Download ${file.fileName}`}
                            >
                              <Download className="h-3.5 w-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmId(file.id)}
                              disabled={!file.id}
                              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-danger/10 hover:text-danger disabled:opacity-30"
                              aria-label={`Delete ${file.fileName} from history`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {files.length > 0 ? (
          <div className="border-t border-line px-4 py-3">
            <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.04em] text-muted">
              Showing the latest {files.length} {files.length === 1 ? "run" : "runs"} · deleting a
              record removes it from your account; the hosted copy is controlled by the provider.
            </p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
