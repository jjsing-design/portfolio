import { processSteps } from "@/lib/process";
import { Section } from "./section";

export function ProcessSection() {
  return (
    <Section
      id="process"
      index="02"
      label="Process"
      title="From requirements to a deployed URL"
    >
      <p className="mt-5 max-w-2xl leading-relaxed text-ink-muted">
        The same four steps on every project. The order matters more than any single
        tool in it.
      </p>

      {/*
        An ordered list, because the order is the content. The numbers are rendered
        from the index rather than typed into the copy, so inserting a step cannot
        leave the numbering wrong.
      */}
      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-rule bg-rule sm:grid-cols-2">
        {processSteps.map((step, i) => (
          <li key={step.id} className="bg-surface p-6 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
              Step {i + 1}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-[-0.01em]">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
