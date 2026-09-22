import { caseStudies } from "@/lib/case-studies";
import { CaseStudyCard } from "./case-study-card";
import { Section } from "./section";

export function WorkSection() {
  return (
    <Section id="work" index="01" label="Work" title="Selected work, in the open">
      {/*
        This section is an empty state and says so. Three placeholder cards with
        invented results would be worse than an honest queue, and a reviewer can
        tell the difference immediately.
      */}
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
        Each project below runs through the same chain — requirements, design,
        implementation, deploy, write-up — and shows up here with its repository and
        case study once that chain is finished. Nothing is listed as done before it
        is.
      </p>

      <ul className="mt-10 space-y-4">
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
      </ul>
    </Section>
  );
}
