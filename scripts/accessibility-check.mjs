/**
 * Accessibility and responsiveness check.
 *
 *   npm run build
 *   npm run start -- --port 43317    # in one terminal
 *   npm run check:a11y               # in another
 *
 * Run it against the production server, not `npm run dev`: the dev server injects
 * the Next.js dev overlay, which is an extra tab stop that never ships.
 *
 * Three things are verified, because these are the three most often claimed without
 * evidence:
 *
 *   1. axe-core finds no WCAG 2.1 A/AA violations, at three widths, on the home
 *      page and on the 404 page.
 *   2. Tabbing from the top of the document reaches the skip link first and then
 *      every interactive element, and each one has a visible focus indicator.
 *   3. Nothing overflows horizontally, down to 320px — the narrowest width worth
 *      supporting.
 *
 * Exits non-zero on any failure so it can gate a commit or a deploy.
 */
import { AxeBuilder } from "@axe-core/playwright";
import { chromium } from "playwright";

const baseUrl = process.env.CHECK_URL ?? "http://127.0.0.1:43317";

const viewports = [
  { name: "small phone", width: 320, height: 640 },
  { name: "phone", width: 390, height: 844 },
  { name: "desktop", width: 1440, height: 900 },
];

const pages = [
  { name: "home", path: "/" },
  { name: "404", path: "/a-page-that-does-not-exist" },
];

const failures = [];

function report(ok, message) {
  console.log(`${ok ? "  pass" : "  FAIL"}  ${message}`);
  if (!ok) failures.push(message);
}

const browser = await chromium.launch();

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });

  for (const target of pages) {
    const page = await context.newPage();
    const response = await page.goto(`${baseUrl}${target.path}`, {
      waitUntil: "load",
    });

    console.log(`\n${target.name} @ ${viewport.name} (${viewport.width}px)`);

    // The 404 route must actually return 404, not a 200 with sad copy on it.
    const expectedStatus = target.name === "404" ? 404 : 200;
    report(
      response?.status() === expectedStatus,
      `HTTP ${response?.status()} (expected ${expectedStatus})`,
    );

    const { violations } = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    report(violations.length === 0, `axe: ${violations.length} violation(s)`);
    for (const violation of violations) {
      console.log(
        `        ${violation.id} (${violation.impact}): ${violation.help}`,
      );
      for (const node of violation.nodes) {
        console.log(`          ${node.target.join(" ")}`);
      }
    }

    // Horizontal overflow: compare the document width to the viewport width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    report(overflow <= 0, `no horizontal overflow (${overflow}px past the fold)`);

    await page.close();
  }

  await context.close();
}

// Keyboard walk, desktop only — the header nav is hidden on phones by design.
console.log("\nkeyboard order @ desktop");
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(baseUrl, { waitUntil: "load" });
  await page.evaluate(() => document.body.focus());

  const interactiveCount = await page.locator("a[href], button").count();
  const seen = [];

  for (let i = 0; i < interactiveCount + 2; i += 1) {
    await page.keyboard.press("Tab");
    const focused = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      // The dev server's overlay is a shadow host with its own focusable button.
      // It is absent from a production build, so ignore it rather than fail on it.
      if (el.tagName === "NEXTJS-PORTAL") return { skip: true };
      const style = getComputedStyle(el);
      return {
        text: (el.textContent ?? "").trim().slice(0, 40),
        // A focus ring counts if the browser draws an outline or a box-shadow.
        hasIndicator:
          (style.outlineStyle !== "none" &&
            parseFloat(style.outlineWidth) > 0) ||
          style.boxShadow !== "none",
      };
    });
    if (!focused) break;
    if (focused.skip) continue;
    seen.push(focused);
  }

  report(
    seen.length > 0 && seen[0].text.startsWith("Skip to main content"),
    `first tab stop is the skip link (got "${seen[0]?.text ?? "nothing"}")`,
  );
  report(
    seen.length >= interactiveCount,
    `reached ${seen.length} of ${interactiveCount} interactive elements by keyboard`,
  );

  const withoutIndicator = seen.filter((item) => !item.hasIndicator);
  report(
    withoutIndicator.length === 0,
    `every tab stop shows a focus indicator (${withoutIndicator.length} missing)`,
  );
  for (const item of withoutIndicator) {
    console.log(`        no visible focus: "${item.text}"`);
  }

  await context.close();
}

await browser.close();

console.log(
  failures.length === 0
    ? "\nAll accessibility checks passed.\n"
    : `\n${failures.length} check(s) failed.\n`,
);
process.exit(failures.length === 0 ? 0 : 1);
