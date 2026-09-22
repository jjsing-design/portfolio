# Portfolio — Jeramehl "JJ" Jocosing

The portfolio site for a design engineer: one page that states a position, shows the
work queue honestly, explains how the work gets made, and makes it easy to get in
touch. It is built to be extended into full case studies rather than rebuilt when
they exist.

**Repository:** `jjsing-design/portfolio`
**Live URL:** _add the Vercel URL here once the first deploy finishes._

---

## The problem this site solves

A sponsor inside a hiring company needs to put this work in front of leadership. He
asked for a site that shows the work *and how JJ thinks*. That reframes the brief: a
grid of pretty screenshots is not the deliverable — evidence of a repeatable
design-to-code process is.

Two consequences shaped the build:

- **The work section is a designed empty state.** No case studies exist yet, so the
  page shows the real project queue with honest status instead of placeholder cards
  with invented results. A reviewer can tell the difference instantly.
- **Process is a first-class section**, not a line in an About paragraph.

## Stack, and why

| Choice | Why |
| --- | --- |
| **Next.js 16, App Router** | Zero-config on Vercel; static by default, so this page ships as prerendered HTML with no server to pay for. Room for `/work/[slug]` case study routes without re-platforming. |
| **TypeScript** | Content is typed (`CaseStudy`, `CaseStudyStatus`), so adding a project cannot silently omit a field. |
| **Tailwind CSS v4** | Design tokens live in one `@theme` block in `globals.css`, which is where a designer wants them. No separate config file, no CSS files drifting out of sync with components. |
| **`next/font`** | Both faces are downloaded at build time and self-hosted, so there is no runtime request to Google and no layout shift. |
| **No component library** | Nothing on this page is a `Dialog` or a combobox. Every interactive element is a link. Pulling in a library to style anchors would add code JJ did not write and cannot defend. |
| **Playwright + axe-core** | Accessibility is verified by a script that anyone can re-run, not asserted in a README. |

## Setup

Requires Node 22 or newer.

```bash
npm install
npm run dev -- --port 43317
```

Then open http://localhost:43317.

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build; fails on type errors |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (`eslint-config-next`) |
| `npm run check:a11y` | axe-core, keyboard, and overflow checks against a running server |

## Architecture

```
src/
  app/
    layout.tsx        Fonts, metadata, skip link, header and footer shell
    page.tsx          Composes the five sections; owns the page measure only
    globals.css       Design tokens, base styles, global focus ring
    not-found.tsx     Styled 404
    icon.svg          Favicon
  components/         Presentational only — no content lives here
  lib/
    site.ts           Every fact about JJ, including the GitHub handle
    case-studies.ts   The work queue and its status type
    process.ts        The four process steps
scripts/
  accessibility-check.mjs
```

One rule holds the whole thing together: **content lives in `src/lib`, presentation
lives in `src/components`.** Changing a sentence never means opening a component, and
adding a case study is a new object in an array.

`src/lib/site.ts` is the single source for the GitHub handle, the email address, and
the optional fields (location, LinkedIn, resume, background). Optional fields are
`null` by default and the components that would render them are skipped, so an
unfinished link is absent rather than broken.

There is a longer walkthrough of both the architecture and the visual decisions in
[`docs/walkthrough.md`](docs/walkthrough.md), and the list of copy still needing real
content is in [`docs/placeholders.md`](docs/placeholders.md).

## Accessibility

Verified with `npm run check:a11y` against the production build at 320px, 390px, and
1440px, on the home page and the 404 page:

- axe-core reports no WCAG 2.1 A/AA violations.
- The first tab stop is the skip link; all 14 interactive elements are reachable by
  keyboard and every one shows a visible focus indicator.
- No horizontal overflow at any of the three widths.

Colour contrast was measured rather than assumed; the ratios are recorded in a comment
at the top of `globals.css`. The lowest is 6.4:1 against a 4.5:1 requirement.

## Deployment

Vercel, with no configuration files. Import `jjsing-design/portfolio`, accept the
detected Next.js defaults, and deploy. Push to `main` deploys to production; every
other branch gets a preview URL.

Netlify also works but needs `@netlify/plugin-nextjs`; Vercel is the shorter path and
Next.js is a Vercel project, so it is the better-supported target.
