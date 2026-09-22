import { siteConfig } from "@/lib/site";
import { Section } from "./section";

export function AboutSection() {
  return (
    <Section
      id="about"
      index="03"
      label="About"
      title="A designer who stays in the codebase"
    >
      <div className="mt-5 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-muted">
        <p>
          Most of what makes an interface good is decided during implementation —
          focus order, what the empty state says, how a layout behaves at 360 pixels
          wide, what the screen does when a request fails. Those are design
          decisions, and they only get made properly by someone who is in the code.
        </p>
        <p>
          So I work the whole chain rather than handing it off in the middle:
          requirements, then the design, then the build, then a written account of
          what changed between the two. Figma and Cursor are both part of that, and I
          use AI the way I would use any other tool — to move faster through work I
          can still explain line by line.
        </p>
        {/* Rendered only once JJ fills in `background` in src/lib/site.ts. */}
        {siteConfig.background ? <p>{siteConfig.background}</p> : null}
      </div>
    </Section>
  );
}
