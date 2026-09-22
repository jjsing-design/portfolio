import { caseStudies } from "@/lib/case-studies";
import { githubProfileUrl, mailtoUrl, siteConfig } from "@/lib/site";
import { ActionLink, ExternalLinkHint } from "./action-link";

/**
 * Derived rather than written down twice: whatever is in progress in the work
 * list is what the hero says JJ is currently building, so the two can never
 * disagree.
 */
const currentWork = caseStudies.find((study) => study.status === "in-progress");

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-heading" className="pb-16 pt-14 sm:pb-20 sm:pt-20 lg:pt-28">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
        <span className="text-accent">{siteConfig.role}</span>
        <span className="mx-2 text-rule" aria-hidden="true">
          /
        </span>
        Product design + front-end
      </p>

      {/*
        The positioning statement is the largest element on the page because it is
        the one thing a reviewer should retain if they read nothing else. The type
        scales with the viewport via clamp() so it stays a headline on a phone
        instead of wrapping into six lines.
      */}
      <h1
        id="hero-heading"
        className="mt-6 max-w-4xl text-balance text-[clamp(2.25rem,7.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]"
      >
        {siteConfig.positioning}
      </h1>

      <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-muted sm:text-xl">
        {siteConfig.intro}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <ActionLink href={mailtoUrl}>Get in touch</ActionLink>
        <ActionLink
          href={githubProfileUrl}
          variant="secondary"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ExternalLinkHint />
        </ActionLink>
      </div>

      {/*
        A definition list, not a row of divs: these are genuinely label/value
        pairs, and <dl> is what screen readers use to pair them up.
      */}
      <dl className="mt-14 grid gap-6 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
            Tools
          </dt>
          <dd className="mt-2 text-sm leading-relaxed">
            {siteConfig.tools.join(", ")}
          </dd>
        </div>

        {currentWork ? (
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Currently building
            </dt>
            <dd className="mt-2 text-sm leading-relaxed">
              <a href="#work" className="underline decoration-rule decoration-2 underline-offset-4 hover:decoration-accent">
                {currentWork.title}
              </a>
            </dd>
          </div>
        ) : null}

        {siteConfig.location ? (
          <div>
            <dt className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">
              Based in
            </dt>
            <dd className="mt-2 text-sm leading-relaxed">{siteConfig.location}</dd>
          </div>
        ) : null}
      </dl>
    </section>
  );
}
