import { statusLabels, type CaseStudyStatus } from "@/lib/case-studies";

/**
 * Status is communicated by the text label first and colour second, so it still
 * reads correctly in greyscale or for anyone who cannot distinguish the tints.
 * The dot is decorative and hidden from assistive tech.
 */
const styles: Record<CaseStudyStatus, { chip: string; dot: string }> = {
  live: { chip: "border-ink text-ink", dot: "bg-ink" },
  "in-progress": { chip: "border-accent text-accent", dot: "bg-accent" },
  planned: { chip: "border-rule text-ink-muted", dot: "bg-rule" },
};

export function StatusBadge({ status }: { status: CaseStudyStatus }) {
  const style = styles[status];

  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] ${style.chip}`}
    >
      <span className={`size-1.5 rounded-full ${style.dot}`} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
