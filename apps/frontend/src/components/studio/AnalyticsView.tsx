"use client";

import { useEffect, useState } from "react";
import { FileText, Image as ImageIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { ApiClientError, getStats } from "@/lib/api";
import { formatBytes, formatCount, savingsPercent } from "@/lib/format";
import type { Stats } from "@/lib/types";
import { SavingsGauge } from "@/components/visuals/SavingsGauge";
import { ActivityChart } from "./ActivityChart";
import { MetricGrid } from "./MetricGrid";
import { PageHeader } from "./PageHeader";

export function AnalyticsView() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getStats()
      .then((next) => {
        if (active) setStats(next);
      })
      .catch((caught) => {
        if (!active) return;
        setError(caught instanceof ApiClientError ? caught.message : "Analytics could not load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const totals = stats?.totals;
  const kinds = stats?.kinds;
  const totalOriginal = (kinds?.image.originalBytes ?? 0) + (kinds?.pdf.originalBytes ?? 0);
  const imageShare = totalOriginal > 0 ? ((kinds?.image.originalBytes ?? 0) / totalOriginal) * 100 : 0;
  const hasData = (totals?.files ?? 0) > 0;

  return (
    <div>
      <PageHeader
        kicker="Usage"
        title="Analytics"
        description="Real numbers from your account. Space saved is the difference between original and compressed bytes."
      />

      {error ? (
        <div className="mb-4 rounded-lg border border-danger/20 bg-danger/5 px-3 py-2.5 text-[12px] text-danger">
          {error}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="ml-2 font-medium underline underline-offset-2"
          >
            Retry
          </button>
        </div>
      ) : null}

      <MetricGrid
        loading={loading}
        metrics={[
          {
            label: "Total runs",
            value: totals ? formatCount(totals.files, "run") : "—",
            note: "Images and PDFs combined",
          },
          {
            label: "Space saved",
            value: totals ? formatBytes(totals.savedBytes) : "—",
            note: totals ? `${totals.savedPercent}% average reduction` : "From real byte counts",
          },
          {
            label: "Images",
            value: totals ? formatCount(totals.images, "image") : "—",
            note: kinds ? `${formatBytes(kinds.image.compressedBytes)} after` : undefined,
          },
          {
            label: "PDFs",
            value: totals ? formatCount(totals.pdfs, "PDF") : "—",
            note: kinds ? `${formatBytes(kinds.pdf.compressedBytes)} after` : undefined,
          },
        ]}
      />

      {error ? null : !loading && !hasData ? (
        <div className="mt-5 panel">
          <EmptyState
            title="Analytics needs a first run"
            description="Once you compress a file while signed in, this page will show the real before-and-after bytes, daily savings, and the split between images and PDFs."
            action={
              <ButtonLink href="/dashboard/optimizeimage" size="sm">
                Compress your first file
              </ButtonLink>
            }
          />
        </div>
      ) : (
        <div className="mt-5 grid gap-5 lg:grid-cols-3">
          <section className="panel p-5 lg:col-span-2">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[13px] font-medium text-ink">Space saved per day</h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                Last 14 days
              </span>
            </div>
            <div className="mt-4">
              {stats ? (
                <ActivityChart daily={stats.daily} />
              ) : (
                <div className="h-40 animate-pulse rounded-md bg-paper-deep/60" />
              )}
            </div>
          </section>

          <aside className="panel flex flex-col p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-ink">Average reduction</h2>
              <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                All time
              </span>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center py-5">
              <SavingsGauge percent={totals?.savedPercent ?? 0} size={116} />
              <p className="mt-3 text-[22px] font-semibold tracking-[-0.02em] text-ink">
                {totals ? formatBytes(totals.savedBytes) : "—"}
              </p>
              <p className="mt-1 text-[11px] text-muted">
                {totals ? `from ${formatBytes(totals.originalBytes)} original` : ""}
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-line pt-4">
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  Original
                </dt>
                <dd className="mt-1 font-mono text-[11px] text-ink">
                  {totals ? formatBytes(totals.originalBytes) : "—"}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                  Compressed
                </dt>
                <dd className="mt-1 font-mono text-[11px] text-ink">
                  {totals ? formatBytes(totals.compressedBytes) : "—"}
                </dd>
              </div>
            </dl>
          </aside>

          <section className="panel p-5 lg:col-span-3">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h2 className="text-[13px] font-medium text-ink">Where the weight came from</h2>
              <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.06em] text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-accent" /> Images
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-3 rounded-full bg-signal" /> PDFs
                </span>
              </div>
            </div>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper-deep" aria-hidden>
              <div className="h-full bg-accent" style={{ width: `${imageShare}%` }} />
              <div className="h-full bg-signal" style={{ width: `${100 - imageShare}%` }} />
            </div>

            <div className="mt-5 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {[
                {
                  key: "image" as const,
                  label: "Images",
                  icon: ImageIcon,
                  kind: kinds?.image,
                },
                {
                  key: "pdf" as const,
                  label: "PDFs",
                  icon: FileText,
                  kind: kinds?.pdf,
                },
              ].map((entry) => {
                const Icon = entry.icon;
                const original = entry.kind?.originalBytes ?? 0;
                const compressed = entry.kind?.compressedBytes ?? 0;
                return (
                  <div key={entry.key} className="bg-surface p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent-soft text-accent-text">
                          <Icon className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-[12px] font-medium text-ink">{entry.label}</span>
                      </div>
                      <span className="font-mono text-[9px] text-muted">
                        {formatCount(entry.kind?.files ?? 0, "run")}
                      </span>
                    </div>
                    <p className="mt-3 text-[15px] font-medium text-ink">
                      {formatBytes(original)} <span className="text-muted">→</span>{" "}
                      {formatBytes(compressed)}
                    </p>
                    <p className="mt-1 text-[11px] text-muted">
                      {original > 0
                        ? `${savingsPercent(original, compressed)}% smaller`
                        : "No runs in this category yet"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
