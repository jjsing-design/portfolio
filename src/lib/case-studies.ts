/**
 * The work section is deliberately built as a designed empty state: these are the
 * projects on JJ's plan, shown with honest status, so the page is useful before a
 * single case study exists.
 *
 * When a project ships, fill in `repoUrl` and `caseStudyHref` and set the status
 * to "live". The card will grow its links automatically; null keeps them hidden
 * rather than linking nowhere.
 */
export type CaseStudyStatus = "live" | "in-progress" | "planned";

export type CaseStudy = {
  /** Used as the React key and to link the card heading to its description. */
  id: string;
  title: string;
  /** One sentence on the product problem, not on the outcome. */
  summary: string;
  /** The parts of the design-to-code chain this project is meant to show. */
  chain: string[];
  status: CaseStudyStatus;
  /**
   * Each project lives in its own repository rather than inside this one, so this
   * is a full URL — e.g. "https://github.com/jjsing-design/member-front-door" —
   * and stays null until that repo is public.
   */
  repoUrl: string | null;
  /** Route to the written case study once one exists, e.g. "/work/front-door". */
  caseStudyHref: string | null;
};

export const statusLabels: Record<CaseStudyStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  planned: "Planned",
};

export const caseStudies: CaseStudy[] = [
  {
    id: "member-front-door",
    title: "Healthcare member front door",
    summary:
      "A member arrives with an unclear need and has to be routed to the right next step, across several different intents.",
    chain: [
      "Requirements",
      "Figma flows and states",
      "React implementation",
      "Accessibility",
    ],
    status: "in-progress",
    repoUrl: null,
    caseStudyHref: null,
  },
  {
    id: "scheduling",
    title: "Scheduling and appointments",
    summary:
      "Choosing a time, confirming it, then rescheduling or cancelling it — including the edge cases real people hit.",
    chain: [
      "Requirements",
      "Date and time interaction design",
      "Validation and error states",
      "Deployed build",
    ],
    status: "planned",
    repoUrl: null,
    caseStudyHref: null,
  },
  {
    id: "design-system",
    title: "Design system in code",
    summary:
      "Tokens and components extracted from the projects above, with names that match the Figma library one to one.",
    chain: [
      "Token architecture",
      "Component API design",
      "Documented states",
      "Usage guidelines",
    ],
    status: "planned",
    repoUrl: null,
    caseStudyHref: null,
  },
];
