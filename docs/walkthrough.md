# Walkthrough: architecture and visual decisions

Written so you can defend this site line by line. Every decision below has a reason
you can say out loud, and where there was a real tradeoff it is named as a tradeoff
rather than smoothed over.

---

## Part 1 — Architecture

### The one rule

Content lives in `src/lib`. Presentation lives in `src/components`.

`src/lib/site.ts`, `src/lib/case-studies.ts`, and `src/lib/process.ts` hold every
sentence and every fact. Components import them and decide only how things look. This
is why editing your positioning statement never means opening a JSX file, and why
adding a case study is a new object in an array rather than a new component.

If you are asked why you bothered separating them on a page this small: because the
next change to this page is content, not layout, and content changes should not be
able to break layout.

### `src/lib/site.ts` — the config seam

Everything a reviewer might click lives here once. The GitHub handle in particular is
stored as `githubUsername` and every link is derived from it:

```ts
export const githubProfileUrl = `https://github.com/${siteConfig.githubUsername}`;
export const portfolioRepoUrl = `${githubProfileUrl}/${siteConfig.portfolioRepoName}`;
```

Three places on the page link to GitHub. None of them contains a URL. Changing the
handle is a one-line change.

The optional fields — `location`, `linkedinUrl`, `resumeUrl`, `background` — are typed
`string | null` and default to `null`. The components that would render them check for
the value and render nothing when it is missing:

```tsx
{siteConfig.linkedinUrl ? <ActionLink href={siteConfig.linkedinUrl}>LinkedIn</ActionLink> : null}
```

**Why this matters, and it is worth saying in an interview:** the alternative was to
ship `https://linkedin.com/in/your-name-here` or a greyed-out "coming soon" button.
Both of those tell a reviewer the site is unfinished. An absent element tells them
nothing at all. Missing content should degrade to silence, not to a broken promise.

### Each project gets its own repository

`CaseStudy.repoUrl` is a full URL, not a path or a slug. Project 1 lives in
`jjsing-design/member-front-door`, not inside this repo. This site is a portfolio, not
a monorepo — the projects have to be independently clonable and independently
deployable, and a reviewer should be able to read one repo without the other.

### `src/components/section.tsx` — the layout primitive

Every section renders through one component, which is why the rhythm is identical down
the page: the same hairline top rule, the same numbered mono label, the same
`md:grid-cols-[9rem_1fr]` grid with the label on the left and content on the right,
collapsing to stacked on phones. Consistency here is structural rather than
disciplined — a section cannot drift, because there is only one of them.

It also sets `aria-labelledby` to the id of its own visible `<h2>`, so assistive
technology announces "Selected work, region" rather than an unnamed region.

### The page is static

`npm run build` prerenders `/`, `/_not-found`, and `/icon.svg` to static files. There
is no server code, no data fetching, and no client-side JavaScript of your own —
nothing on this page is a React client component, so no `"use client"` appears
anywhere. That is why it can be served from a CDN and why it will stay fast as you add
case studies.

The tradeoff: `new Date().getFullYear()` in the footer is evaluated at build time, so
the copyright year is fixed until the next deploy. Since you will deploy more than once
a year, that is the correct trade rather than shipping client JavaScript for a number.

### Accessibility is structural, not a pass at the end

Five decisions, all in the code rather than in a checklist:

1. **One global focus ring.** `:focus-visible` is styled once in `globals.css`, so no
   component can forget it. `:focus-visible` rather than `:focus` keeps the ring off
   mouse clicks and on for keyboard users.
2. **A skip link as the first element in the body.** Off-screen via `sr-only` until it
   receives focus, then it appears. A keyboard user reaches the content in one tab
   instead of seven.
3. **Correct elements.** Everything interactive on this page navigates somewhere, so
   everything is an `<a>`. There is not a single `<button>`, because there is not a
   single in-page action. Using a `<button>` for navigation, or a `<div>` with a click
   handler for either, is the most common way to break keyboard and screen reader
   behaviour.
4. **Markup that carries meaning.** The hero metadata is a `<dl>` because it is
   genuinely label/value pairs. The process is an `<ol>` because the order *is* the
   content. The work queue is a `<ul>`. The numbers in the process cards come from the
   array index, so inserting a step cannot leave the numbering wrong.
5. **A reduced-motion guard.** `scroll-behavior: smooth` is pleasant and also nauseating
   for some people, so `prefers-reduced-motion: reduce` turns it and all transitions off.

`scripts/accessibility-check.mjs` verifies this against a real browser: axe-core with
WCAG 2.1 A/AA rules at 320px, 390px, and 1440px, on both the home page and the 404
page, plus a keyboard walk that asserts the skip link is first, every interactive
element is reachable, and each one has a visible focus indicator, plus a horizontal
overflow check.

Run it against `npm run start`, not `npm run dev`. The dev server injects the Next.js
dev overlay, which is an extra focusable element that never ships — the script skips it
explicitly so you do not get a false failure, but testing what you actually deploy is
the better habit.

---

## Part 2 — Visual decisions

### The type does the work

There is no photography, no illustration, and no decorative gradient, because there is
no real imagery to use yet and invented imagery would be obvious. So the hierarchy is
carried entirely by type, space, and one accent colour. This is a deliberate editorial
choice, not a placeholder for a design that never arrived — and it is the right genre
for a portfolio whose subject is craft.

**Two faces, two jobs.** Geist Sans reads; Geist Mono labels. Every piece of metadata
on the page — the section numbers, the eyebrow, the status chips, the `Tools` label,
the footer — is mono, uppercased, and letterspaced at `0.18em`. That is a quiet signal
that the person who made this site works in code, made without a single line of copy
claiming it.

**The positioning statement is the largest element on the page,** at
`clamp(2.25rem, 7.5vw, 4.5rem)`, because it is the one thing a reviewer should retain
if they read nothing else. `clamp()` rather than breakpoints means it stays a headline
on a phone instead of wrapping into six lines. Tracking is tightened to `-0.035em`:
large type looks loose at default tracking, small type looks cramped when tightened,
so the negative tracking is applied only to the display sizes.

### Colour

Four neutrals and one accent, defined as tokens in the `@theme` block of
`globals.css`:

| Token | Value | Role | Contrast on paper |
| --- | --- | --- | --- |
| `paper` | `#f8f7f4` | Page background | — |
| `surface` | `#ffffff` | Cards | — |
| `ink` | `#141413` | Headings and body | 17.2:1 |
| `ink-muted` | `#5c5a53` | Secondary text | 6.4:1 |
| `rule` | `#dedbd1` | Hairlines and dividers | — |
| `accent` | `#9c3b13` | Section numbers, links, in-progress status | 6.4:1 |

Three things to be able to say about this palette:

- **The background is warm off-white, not white.** `#f8f7f4` against white cards gives
  the cards their edge without a drop shadow. Pure white pages with pure white cards
  need shadows to separate them, and shadows on a typographic layout look bolted on.
- **The ratios were measured, not guessed.** They are in a comment at the top of
  `globals.css`. The lowest is 6.4:1 where AA requires 4.5:1, which leaves room to
  darken the background or add a tint later without re-auditing.
- **The accent is used sparingly on purpose.** Rust appears on the section numbers, the
  eyebrow, links on hover, and the in-progress status. It is the only saturated colour
  on the page, so it means "look here" everywhere it appears. The moment it decorates
  something, it stops working.

`rule` is the only token that intentionally fails contrast — it is never used for text,
only for hairlines and the decorative em-dashes in the card lists, which is why those
dashes are `aria-hidden`.

### One theme, on purpose

There is no dark mode, and `color-scheme: light` is declared so the browser does not
tint form controls dark underneath you. This is a scope decision you should own rather
than apologise for: one theme with measured contrast and verified focus states is worth
more than two themes that are each half-checked. Dark mode is a genuine amount of work
— every token, every border, every focus ring re-verified — and it is a better second
iteration than a rushed first one.

### Status instead of promises

The work section is the most important design decision on the page, and it is a content
decision as much as a visual one.

Each card shows a status chip: **In progress** in accent, **Planned** in muted grey,
**Live** in ink. The status is communicated by its text label first and its colour
second, so it survives greyscale printing and colour-vision differences; the dot is
decorative and hidden from assistive tech.

Cards with no case study and no repo render as plain text with a status. Not a disabled
button, not "coming soon", not a card that looks clickable and is not. When a project
ships, you set `repoUrl` and `caseStudyHref` and the same component grows its links.

The section's own copy says the thing out loud: *"Nothing is listed as done before it
is."* A reviewer who is deciding whether to stake their credibility on you should read
that sentence and relax.

### Responsive behaviour

The layout is one column of content in a `max-w-5xl` measure, which keeps body text
near 70 characters on desktop — long enough not to feel cramped, short enough to read.

Two decisions are worth naming:

- **The section label column collapses.** `md:grid-cols-[9rem_1fr]` becomes a single
  stacked column below `md`, so the numbered label sits above its heading on a phone
  instead of squeezing the content into half the screen.
- **The header nav is hidden on phones.** Four anchor links crowd a narrow header, and
  on a page this length scrolling is faster than a menu anyway. A hamburger menu for
  four in-page anchors would be more code and worse UX. Email stays visible at every
  width, because it is the one thing a reviewer might want immediately.

### The 404

The site is one page today, but `/work/...` routes are coming, so a stale or mistyped
link needs a real answer. `not-found.tsx` reuses the same header, footer, tokens, and
button styles, and returns an actual 404 status — verified in the accessibility script,
because a 404 page that returns 200 is a bug that search engines notice and humans
do not.
