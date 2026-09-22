import { githubProfileUrl, mailtoUrl, siteConfig } from "@/lib/site";
import { ActionLink, ExternalLinkHint } from "./action-link";
import { Section } from "./section";

export function ContactSection() {
  return (
    <Section
      id="contact"
      index="04"
      label="Contact"
      title="Happy to walk through any of it"
    >
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
        Email is the fastest way to reach me. I am glad to talk through the work in
        detail, including the parts that are not finished yet.
      </p>

      {/*
        The address is written out instead of hidden behind "Email me" so it can be
        copied without opening a mail client — the reviewer may be on a machine where
        mailto: does nothing useful.
      */}
      <p className="mt-8 text-2xl font-medium tracking-[-0.01em] sm:text-3xl">
        <a
          href={mailtoUrl}
          className="underline decoration-rule decoration-2 underline-offset-[6px] hover:text-accent hover:decoration-accent"
        >
          {siteConfig.email}
        </a>
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <ActionLink
          href={githubProfileUrl}
          target="_blank"
          rel="noreferrer"
          variant="secondary"
        >
          GitHub
          <ExternalLinkHint />
        </ActionLink>

        {/* Each of these appears only when its value is set in src/lib/site.ts. */}
        {siteConfig.linkedinUrl ? (
          <ActionLink
            href={siteConfig.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            variant="secondary"
          >
            LinkedIn
            <ExternalLinkHint />
          </ActionLink>
        ) : null}

        {siteConfig.resumeUrl ? (
          <ActionLink href={siteConfig.resumeUrl} variant="secondary">
            Resume
          </ActionLink>
        ) : null}
      </div>
    </Section>
  );
}
