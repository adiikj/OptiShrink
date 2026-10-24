"use client";

/* eslint-disable @next/next/no-img-element -- Remote and blob URLs are user content; the Next image optimizer cannot safely handle them. */
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Image as ImageIcon,
  Layers,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useAuth } from "@/context/AuthContext";
import { ApiClientError, getHistory, getStats } from "@/lib/api";
import { downloadFromUrl } from "@/lib/download";
import {
  formatBytes,
  formatCount,
  formatRelativeDay,
  optimizedName,
  savingsPercent,
} from "@/lib/format";
import type { CompressedFile, Stats } from "@/lib/types";
import { FileGlyph } from "@/components/visuals/FileGlyph";
import { SavingsGauge } from "@/components/visuals/SavingsGauge";
import { ActivityChart } from "./ActivityChart";
import { MetricGrid } from "./MetricGrid";

const quickTools = [
  {
    href: "/dashboard/optimizeimage",
    label: "Optimize images",
    description: "JPG, PNG, WebP, GIF",
    icon: ImageIcon,
  },
  {
    href: "/dashboard/compresspdf",
    label: "Compress PDF",
    description: "Page count preserved",
    icon: FileText,
  },
  {
    href: "/dashboard/batchcompress",
    label: "Batch compression",
    description: "Up to 20 images per run",
    icon: Layers,
  },
];

export function DashboardOverview() {
  const { user } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    Promise.all([getStats(), getHistory()])
      .then(([nextStats, nextFiles]) => {
        if (!active) return;
        setStats(nextStats);
        setFiles(nextFiles.slice(0, 5));
      })
      .catch((caught) => {
        if (!active) return;
        setError(
          caught instanceof ApiClientError ? caught.message : "The studio could not load your data.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const totals = stats?.totals;
  const firstName = user?.name.split(/\s+/)[0] ?? "there";

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="label-mono">Overview</p>
          <h1 className="display mt-2 text-[1.75rem] sm:text-[2rem]">
            Welcome back, <span className="text-accent-text">{firstName}</span>
          </h1>
          <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted">
            A clear view of what you have compressed, what it saved, and the fastest way into a new
            run.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ButtonLink href="/dashboard/history" variant="secondary" size="sm">
            Open history
            <ArrowRight className="h-3.5 w-3.5" />
          </ButtonLink>
          <ButtonLink href="/dashboard/optimizeimage" size="sm">
            New compression
          </ButtonLink>
        </div>
      </div>

      {error ? (
        <div className="mb-4 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-[12px] text-danger">
          {error}
        </div>
      ) : null}

      <MetricGrid
        loading={loading}
        metrics={[
          {
            label: "Files compressed",
            value: totals ? formatCount(totals.files, "file") : "-",
            note: "Across the whole account",
          },
          {
            label: "Space saved",
            value: totals ? formatBytes(totals.savedBytes) : "-",
            note: totals ? `${totals.savedPercent}% smaller overall` : "From real byte counts",
          },
          {
            label: "Images",
            value: totals ? formatCount(totals.images, "image") : "-",
            note: "Optimized through Cloudinary",
          },
          {
            label: "PDFs",
            value: totals ? formatCount(totals.pdfs, "PDF") : "-",
            note: "Compressed through pdf.co",
          },
        ]}
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="panel lg:col-span-2">
          <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
            <h2 className="text-[13px] font-medium text-ink">Recent runs</h2>
            <Link
              href="/dashboard/history"
              className="text-[11px] font-medium text-accent-text hover:underline"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div>
              {[0, 1, 2].map((row) => (
                <div key={row} className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-b-0">
                  <div className="h-9 w-9 animate-pulse rounded-md bg-paper-deep" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-40 animate-pulse rounded bg-paper-deep" />
                    <div className="h-2 w-24 animate-pulse rounded bg-paper-deep" />
                  </div>
                </div>
              ))}
            </div>
          ) : error && files.length === 0 ? (
            <p className="px-5 py-10 text-center text-[12px] text-muted">
              Recent runs are unavailable. Refresh the page to try again.
            </p>
          ) : files.length === 0 ? (
            <EmptyState
              compact
              title="No runs yet"
              description="Compress a PDF or an image and it will appear here with its before-and-after size."
              action={
                <ButtonLink href="/dashboard/optimizeimage" size="sm">
                  Start a run
                </ButtonLink>
              }
            />
          ) : (
            <ul>
              {files.map((file) => (
                <li
                  key={file.id ?? file.url}
                  className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-b-0"
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
                      {formatRelativeDay(file.createdAt)}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] text-muted sm:hidden">
                      {formatBytes(file.originalBytes)} → {formatBytes(file.compressedBytes)}
                    </p>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="font-mono text-[10px] text-muted">
                      {formatBytes(file.originalBytes)} → {formatBytes(file.compressedBytes)}
                    </p>
                    <p className="mt-0.5 font-mono text-[9px] text-success">
                      −{savingsPercent(file.originalBytes, file.compressedBytes)}%
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => void downloadFromUrl(file.url, optimizedName(file.fileName))}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted transition hover:bg-paper-deep hover:text-ink"
                    aria-label={`Download ${file.fileName}`}
                  >
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <aside className="panel flex flex-col p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-medium text-ink">Space saved</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
              All time
            </span>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center py-5">
            <SavingsGauge percent={totals?.savedPercent ?? 0} size={116} />
            <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">
              {totals ? formatBytes(totals.savedBytes) : "-"}
            </p>
            <p className="mt-1 text-[11px] text-muted">
              {totals && totals.files > 0
                ? `across ${formatCount(totals.files, "run")}`
                : "Your first run will show up here"}
            </p>
          </div>

          <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                Original
              </dt>
              <dd className="mt-1 font-mono text-[11px] text-ink">
                {totals ? formatBytes(totals.originalBytes) : "-"}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                Result
              </dt>
              <dd className="mt-1 font-mono text-[11px] text-ink">
                {totals ? formatBytes(totals.compressedBytes) : "-"}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="panel p-5 lg:col-span-2">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[13px] font-medium text-ink">Space saved per day</h2>
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
              Last 14 days
            </span>
          </div>
          <div className="mt-4">
            {stats ? (
              <ActivityChart daily={stats.daily} />
            ) : loading ? (
              <div className="h-40 animate-pulse rounded-md bg-paper-deep/60" />
            ) : (
              <p className="flex h-40 items-center justify-center text-[12px] text-muted">
                Activity data is unavailable.
              </p>
            )}
          </div>
        </section>

        <section className="panel p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-medium text-ink">Quick tools</h2>
            <Layers className="h-4 w-4 text-muted" />
          </div>
          <ul className="mt-3">
            {quickTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex items-center gap-3 border-t border-line py-3 first:border-t-0"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent-soft text-accent-text">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[12px] font-medium text-ink">{tool.label}</span>
                      <span className="mt-0.5 block text-[10px] text-muted">
                        {tool.description}
                      </span>
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted transition group-hover:text-accent-text" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
