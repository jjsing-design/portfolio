import { githubProfileUrl, mailtoUrl, siteConfig } from "@/lib/site";
import { ExternalLinkHint } from "./action-link";

/**
 * The nav is a single source list so the labels always match the section labels
 * further down the page.
 */
const navItems = [
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

/**
 * Sticky header. The in-page nav is hidden on phones — four anchor links crowd a
 * narrow header, and on a single page of this length scrolling is the faster
 * interaction anyway. Email stays visible at every width because it is the one
 * thing a reviewer might want immediately.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6 lg:px-8">
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-tight hover:text-accent"
        >
          {siteConfig.name}
          <span className="sr-only"> — back to top</span>
        </a>

        <nav aria-label="Sections" className="hidden sm:block">
          <ul className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-ink-muted hover:text-accent">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <a
            href={githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1 text-ink-muted hover:text-accent sm:inline-flex"
          >
            GitHub
            <ExternalLinkHint />
          </a>
          <a href={mailtoUrl} className="font-medium hover:text-accent">
            Email
          </a>
        </div>
      </div>
    </header>
  );
}
