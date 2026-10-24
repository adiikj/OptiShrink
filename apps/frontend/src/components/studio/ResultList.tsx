/* eslint-disable @next/next/no-img-element -- Remote and blob URLs are user content; the Next image optimizer cannot safely handle them. */
import { ArrowUpRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { downloadAll, downloadFromUrl } from "@/lib/download";
import { formatBytes, optimizedName, savingsPercent } from "@/lib/format";
import type { CompressedFile } from "@/lib/types";
import { FileGlyph } from "@/components/visuals/FileGlyph";

export function ResultList({ results }: { results: CompressedFile[] }) {
  if (results.length === 0) return null;

  const originalTotal = results.reduce((sum, file) => sum + file.originalBytes, 0);
  const compressedTotal = results.reduce((sum, file) => sum + file.compressedBytes, 0);
  const saved = Math.max(0, originalTotal - compressedTotal);
  const percent = savingsPercent(originalTotal, compressedTotal);

  return (
    <section className="panel overflow-hidden" aria-label="Compression results">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-accent-soft/50 px-5 py-4">
        <div className="flex items-baseline gap-3">
          <h2 className="text-[13px] font-medium text-ink">Result</h2>
          <Badge tone="success">−{percent}%</Badge>
          <span className="font-mono text-[10px] text-muted">
            {formatBytes(originalTotal)} → {formatBytes(compressedTotal)}
          </span>
        </div>

        {results.length > 1 ? (
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              void downloadAll(
                results.map((file) => ({
                  url: file.url,
                  fileName: optimizedName(file.fileName),
                })),
              )
            }
          >
            <Download className="h-3.5 w-3.5" />
            Download all
          </Button>
        ) : null}
      </div>

      <ul>
        {results.map((file) => (
          <li
            key={`${file.fileName}-${file.url}`}
            className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3.5 last:border-b-0"
          >
            <div className="h-9 w-9 shrink-0 overflow-hidden rounded-md bg-paper-deep">
              {file.kind === "image" ? (
                <img src={file.url} alt="" className="h-full w-full object-cover" />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-accent-text">
                  <FileGlyph kind="pdf" className="h-4 w-4" />
                </span>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-medium text-ink">{file.fileName}</p>
              <p className="mt-0.5 font-mono text-[9px] text-muted">
                {formatBytes(file.originalBytes)} → {formatBytes(file.compressedBytes)}
                <span className="ml-2 text-success">
                  −{savingsPercent(file.originalBytes, file.compressedBytes)}%
                </span>
              </p>
            </div>

            <span className="hidden font-mono text-[9px] text-muted sm:block">
              {formatBytes(saved)} saved
            </span>

            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void downloadFromUrl(file.url, optimizedName(file.fileName))}
                aria-label={`Download ${file.fileName}`}
              >
                <Download className="h-3.5 w-3.5" />
                Download
              </Button>
              <ButtonLink
                href={file.url}
                variant="ghost"
                size="sm"
                className="px-2.5"
                aria-label={`Open ${file.fileName}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
              </ButtonLink>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
