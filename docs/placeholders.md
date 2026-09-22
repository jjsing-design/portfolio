# Content still needing JJ

Nothing on this site invents a fact about you — no employers, no project results, no
metrics, no testimonials. Where a real detail was needed and unavailable, the element
is either absent or the copy is deliberately general. This is the list of what to fill
in, in the order it pays off.

## 1. Missing content — currently not rendered at all

Each of these is `null` in `src/lib/site.ts`. Set the value and the element appears; no
component changes needed.

| Field | What it adds | Where it shows |
| --- | --- | --- |
| `background` | Two or three sentences in your own voice about your path into design engineering | Third paragraph of the About section |
| `location` | e.g. `"Remote — United States"` | Third item in the hero metadata row |
| `linkedinUrl` | Your full LinkedIn profile URL | A LinkedIn button in the Contact section |
| `resumeUrl` | Path or URL to a resume PDF (drop the file in `public/` and use `"/jocosing-resume.pdf"`) | A Resume button in the Contact section |

The `background` paragraph is the highest-value one. Everything else on the page
describes how you work; that paragraph is the only place that says who you are, and it
should not sound like it was written by anyone but you.

## 2. Copy to read in your own voice and change if it is not yours

These are live on the page right now. They are accurate — nothing here claims
experience you do not have — but they are my words, and you have to be able to say them
in an interview without flinching. All of them are in `src/lib/`.

| Where | Current copy | Check |
| --- | --- | --- |
| `site.ts` → `positioning` | "I design product experiences and build them in code." | This is the largest sentence on the page and the one a reviewer remembers. If it is not exactly how you would put it, change it. |
| `site.ts` → `intro` | "I work at the seam between design and engineering…" | Supporting paragraph under the headline. |
| `about-section.tsx` | Two paragraphs on why implementation is where design decisions actually get made | The only copy that lives in a component rather than in `lib`, because it is prose rather than data. Rewrite freely. |
| `process.ts` | The four process steps | These describe the process from your plan. Make sure you actually work this way before a reviewer asks. |

## 3. Case study content — the real gap

`src/lib/case-studies.ts` holds three projects with honest status and no invented
results. To publish one:

1. Set `repoUrl` to the project's own repository, e.g.
   `"https://github.com/jjsing-design/member-front-door"`. Projects live in their own
   repos, not in this one.
2. Add the written case study, then set `caseStudyHref` to its route.
3. Change `status` to `"live"`. The card's chain label switches from "Will show" to
   "Shows" automatically.

The summaries currently describe each project's *problem*, not its outcome, which is
the only honest thing to write before the work exists. When you write the real case
study, that is where outcomes and tradeoffs go.

## 4. Deliberately not built

Not oversights — decisions, each defensible if raised:

- **No dark mode.** One theme with measured contrast beats two half-verified ones.
  Reasoning is in `docs/walkthrough.md`.
- **No contact form.** A form needs a backend, an email service, and spam handling to
  do properly. A `mailto:` link with the address written out plainly is more reliable
  and asks less of the reviewer.
- **No analytics.** Add Vercel Analytics in one line if you want to know whether the
  sponsor opened it.
- **No resume page.** The playbook asks for a web resume plus a PDF. The PDF slot is
  ready via `resumeUrl`; a full `/resume` route is a later addition.
- **No photo of you.** There was no image to use, and a stock headshot would be worse
  than none. If you add one, `public/` plus `next/image` is the path.
- **No Open Graph image.** Link previews will show the title and description but no
  picture. Worth adding before you send the URL to the sponsor, since that preview is
  the first thing he will see in a message.
