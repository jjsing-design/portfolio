import type { CaseStudy } from "@/lib/case-studies";
import { ExternalLinkHint } from "./action-link";
import { StatusBadge } from "./status-badge";

/**
 * A card renders whatever exists. While `caseStudyHref` and `repoUrl` are null the
 * card is plain text with a status — not a link that goes nowhere, and not a fake
 * "coming soon" button. Once a project ships, the same component grows its links.
 */
export function CaseStudyCard({ study }: { study: CaseStudy }) {
  const headingId = `${study.id}-title`;
  const hasLinks = Boolean(study.caseStudyHref || study.repoUrl);

  return (
    <li className="rounded-2xl border border-rule bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="md:max-w-xl">
          <div className="flex flex-wrap items-center gap-3">
            <h3 id={headingId} className="text-xl font-semibold tracking-[-0.01em]">
              {study.title}
            </h3>
            <StatusBadge status={study.status} />
          </div>

          <p className="mt-3 leading-relaxed text-ink-muted">{study.summary}</p>

          {hasLinks ? (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium">
              {study.caseStudyHref ? (
                <a
                  href={study.caseStudyHref}
                  className="underline decoration-rule decoration-2 underline-offset-4 hover:text-accent hover:decoration-accent"
                >
                  Read the case study
                </a>
              ) : null}
              {study.repoUrl ? (
                <a
                  href={study.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 underline decoration-rule decoration-2 underline-offset-4 hover:text-accent hover:decoration-accent"
                >
                  Repository
                  <ExternalLinkHint />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>

        {/*
          The chain is the point of each project, so it is listed rather than
          summarised. aria-labelledby gives the list an accessible name that
          includes which project it belongs to.
        */}
        <div className="md:w-48 md:shrink-0">
          <p
            id={`${study.id}-chain`}
            className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted"
          >
            Will show
          </p>
          <ul
            aria-labelledby={`${study.id}-chain ${headingId}`}
            className="mt-3 space-y-1.5 text-sm text-ink-muted"
          >
            {study.chain.map((step) => (
              <li key={step} className="flex gap-2">
                <span className="text-rule" aria-hidden="true">
                  —
                </span>
                {step}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}
