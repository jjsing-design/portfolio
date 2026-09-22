import type { ReactNode } from "react";

type SectionProps = {
  /** Anchor target for the header nav. */
  id: string;
  /** Editorial index, e.g. "01". Decorative. */
  index: string;
  /** Short name shown in the numbered label, matching the nav item. */
  label: string;
  /** The section's real heading. */
  title: string;
  children: ReactNode;
};

/**
 * The page's one layout primitive. Every section gets the same hairline rule, the
 * same numbered label, and the same two-column grid: label on the left, content on
 * the right from the medium breakpoint up, stacked below it on phones.
 *
 * `aria-labelledby` ties the landmark to its visible heading, so assistive tech
 * announces "Selected work, region" instead of an unnamed region.
 */
export function Section({ id, index, label, title, children }: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="border-t border-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="grid gap-6 md:grid-cols-[9rem_1fr] md:gap-12 lg:gap-20">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
          <span className="text-accent">{index}</span>
          <span className="mx-2 text-rule" aria-hidden="true">
            /
          </span>
          {label}
        </p>

        <div>
          <h2
            id={headingId}
            className="max-w-2xl text-balance text-3xl font-semibold leading-[1.15] tracking-[-0.02em] sm:text-4xl"
          >
            {title}
          </h2>
          {children}
        </div>
      </div>
    </section>
  );
}
