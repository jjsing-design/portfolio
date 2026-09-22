import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero";
import { ProcessSection } from "@/components/process-section";
import { WorkSection } from "@/components/work-section";

/**
 * One page, five stacked sections, in the order a reviewer reads them: who this is,
 * the work, how it gets made, the person, how to reach him. The page component only
 * composes and sets the measure — every section owns its own content.
 */
export default function Home() {
  return (
    <main id="main" className="mx-auto w-full max-w-5xl flex-1 px-6 lg:px-8">
      <Hero />
      <WorkSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
