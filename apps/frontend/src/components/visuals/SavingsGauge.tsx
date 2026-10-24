import { cn } from "@/lib/cn";

export function SavingsGauge({
  percent,
  size = 112,
  tone = "ink",
  className,
}: {
  percent: number;
  size?: number;
  tone?: "ink" | "bone";
  className?: string;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, percent));
  const offset = circumference - (clamped / 100) * circumference;
  const onBone = tone === "bone";

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      role="img"
      aria-label={`${Math.round(clamped)} percent smaller`}
      className={cn(onBone ? "text-bone/20" : "text-line", className)}
    >
      <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="2" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke="rgb(var(--accent))"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 60 60)"
      />
      <text
        x="60"
        y="58"
        textAnchor="middle"
        fill={onBone ? "rgb(var(--bone))" : "rgb(var(--ink))"}
        fontFamily="var(--font-sans)"
        fontSize="24"
        fontWeight="650"
      >
        {Math.round(clamped)}%
      </text>
      <text
        x="60"
        y="74"
        textAnchor="middle"
        fill={onBone ? "rgb(var(--bone) / 0.45)" : "rgb(var(--muted))"}
        fontFamily="var(--font-mono)"
        fontSize="6.5"
        letterSpacing="1.8"
      >
        SMALLER
      </text>
    </svg>
  );
}
