/**
 * How JJ works, in the order it happens. The last step is the one that is specific
 * to design engineering: writing down where the implementation had to diverge from
 * the design, instead of pretending it never did.
 */
export const processSteps = [
  {
    id: "requirements",
    title: "Requirements first",
    description:
      "A written PRD before anything gets designed: the problem, who has it, what is in and out of scope, the states, and what has to be true before it counts as done. A vague requirement produces a vague interface.",
  },
  {
    id: "design",
    title: "Design every state",
    description:
      "Figma flows and screens with the states actually drawn — default, hover, focus, loading, empty, error, disabled — at phone and desktop widths, not one desktop frame and an assurance that it is responsive.",
  },
  {
    id: "build",
    title: "Build it in code",
    description:
      "Implementation in React and TypeScript, with tokens and component names that match the Figma library one to one, so a conversation about a component means the same thing in both places.",
  },
  {
    id: "ship",
    title: "Ship, then explain it",
    description:
      "Deployed to a public URL, with a written note on what changed between the design and the implementation and why. Design only survives contact with code by negotiation; that note is the record of the negotiation.",
  },
];
