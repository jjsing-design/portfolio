import { portfolioRepoUrl, siteConfig } from "@/lib/site";
import { ExternalLinkHint } from "./action-link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-10 font-mono text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p>
          Designed and built by {siteConfig.name} · {new Date().getFullYear()}
        </p>
        <p className="flex items-center gap-4">
          <span>Next.js · TypeScript · Tailwind CSS</span>
          <a
            href={portfolioRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-accent"
          >
            Source
            <ExternalLinkHint />
          </a>
        </p>
      </div>
    </footer>
  );
}
