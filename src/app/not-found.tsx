import { ActionLink } from "@/components/action-link";
import { mailtoUrl } from "@/lib/site";

/**
 * The site is one page today, but case study routes are coming, so a mistyped or
 * stale URL needs a real answer rather than the framework default. It reuses the
 * same header, footer, tokens, and button styles as the rest of the site.
 */
export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-24 lg:px-8"
    >
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
        Error 404
      </p>
      <h1 className="mt-6 max-w-2xl text-balance text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
        That page does not exist.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
        It may be a case study that has not been published yet, or a link that has
        moved. The home page has everything that is currently live.
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-3">
        <ActionLink href="/">Back to the home page</ActionLink>
        <ActionLink href={mailtoUrl} variant="secondary">
          Tell me the link is broken
        </ActionLink>
      </div>
    </main>
  );
}
