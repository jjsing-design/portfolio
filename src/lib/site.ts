/**
 * Every fact about JJ that appears on the page lives here, so copy changes never
 * require touching a component.
 *
 * Optional fields are typed `string | null` on purpose: when a value is null the
 * component that would render it is skipped entirely. That way an unfinished
 * link is simply absent instead of shipping as a dead link.
 */
export const siteConfig = {
  name: "Jeramehl Jocosing",
  shortName: "JJ",
  role: "Design Engineer",

  /** The one-line positioning statement. It is the largest text on the page. */
  positioning: "I design product experiences and build them in code.",

  /** Supporting paragraph under the positioning statement. */
  intro:
    "I work at the seam between design and engineering — turning requirements into flows, flows into components, and components into interfaces that are responsive, accessible, and actually shipped.",

  email: "jjsing.design@gmail.com",

  /**
   * GitHub handle. Referenced through `githubProfileUrl` below rather than being
   * written out anywhere else, so it changes in exactly one place.
   */
  githubUsername: "jjsing-design",

  /** The tools JJ actually works in, shown as a short list in the hero. */
  tools: ["Figma", "Cursor", "Claude", "TypeScript", "React", "GitHub"],

  /**
   * The repo holding this site. Linked as "Source" in the footer. Every other
   * project lives in its own repo, so per-project links are set on the case
   * study itself, not derived from here.
   */
  portfolioRepoName: "portfolio",

  // ---------------------------------------------------------------------------
  // Optional — null until JJ supplies the real value. See docs/placeholders.md.
  // ---------------------------------------------------------------------------

  /** e.g. "Remote — United States". Rendered in the hero meta list when set. */
  location: null as string | null,

  /** Full LinkedIn profile URL. Adds a LinkedIn link to the contact section. */
  linkedinUrl: null as string | null,

  /** Path or URL to a resume PDF. Adds a resume link to the contact section. */
  resumeUrl: null as string | null,

  /**
   * Two or three sentences in JJ's own voice about his background and how he got
   * to design engineering. Rendered as an extra paragraph in the About section.
   */
  background: null as string | null,
} as const;

/** Single derived source for the GitHub profile link used across the page. */
export const githubProfileUrl = `https://github.com/${siteConfig.githubUsername}`;

/** This site's own repository, linked from the footer. */
export const portfolioRepoUrl = `${githubProfileUrl}/${siteConfig.portfolioRepoName}`;

export const mailtoUrl = `mailto:${siteConfig.email}`;
