import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { githubProfileUrl, siteConfig } from "@/lib/site";

/*
  The link preview image — the picture a messaging app or Slack shows when someone
  pastes this URL. Next.js turns any `opengraph-image` file in a route segment into
  an image route and writes the matching <meta> tags for it, so nothing here has to
  be registered anywhere else.

  It is generated from code rather than exported from Figma for one reason: the text
  comes from `src/lib/site.ts`, the same file the page reads. Change the positioning
  statement and the preview changes with it. A PNG would quietly go stale.

  The layout is the hero, reduced: name row over a hairline, mono eyebrow, the
  positioning statement at display size, and the metadata row along the bottom. Same
  tokens as `globals.css`, repeated here as literals because this image is rendered
  by Satori, which does not run Tailwind.
*/

const color = {
  paper: "#f8f7f4",
  ink: "#141413",
  inkMuted: "#5c5a53",
  rule: "#dedbd1",
  accent: "#9c3b13",
};

export const alt = `${siteConfig.name} — ${siteConfig.role}. ${siteConfig.positioning}`;

/** 1200×630 is the size Slack, iMessage, LinkedIn, and X all crop from. */
export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

/*
  Read once at module scope, not per request: these files never change, and the
  image is generated at build time anyway. Satori needs real font data — it cannot
  use the `next/font` faces the page uses, so the same two families are committed
  as .ttf under `assets/fonts` (SIL Open Font License, included alongside them).
*/
const [geistRegular, geistSemiBold, geistMonoMedium, markSvg] = await Promise.all([
  readFile(join(process.cwd(), "assets/fonts/Geist-Regular.ttf")),
  readFile(join(process.cwd(), "assets/fonts/Geist-SemiBold.ttf")),
  readFile(join(process.cwd(), "assets/fonts/GeistMono-Medium.ttf")),
  readFile(join(process.cwd(), "src/app/icon.svg"), "base64"),
]);

/** The favicon, reused so the preview and the browser tab show the same mark. */
const markSrc = `data:image/svg+xml;base64,${markSvg}`;

/** Mono, uppercase, letterspaced — the label treatment used everywhere on the page. */
const monoLabel = {
  fontFamily: "Geist Mono",
  fontSize: 17,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
} as const;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "68px 80px",
          backgroundColor: color.paper,
          color: color.ink,
          fontFamily: "Geist",
        }}
      >
        {/* The site header, restated: mark, name, and the hairline under it. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 26,
            borderBottom: `1px solid ${color.rule}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <img src={markSrc} width={46} height={46} alt="" />
            <span style={{ fontFamily: "Geist Mono", fontSize: 26 }}>
              {siteConfig.name}
            </span>
          </div>
          <span style={{ ...monoLabel, color: color.inkMuted }}>
            {githubProfileUrl.replace("https://", "")}
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: 50 }}>
          <span style={{ ...monoLabel, color: color.accent }}>{siteConfig.role}</span>
          <span style={{ ...monoLabel, color: color.rule, margin: "0 14px" }}>/</span>
          <span style={{ ...monoLabel, color: color.inkMuted }}>
            Product design + front-end
          </span>
        </div>

        {/*
          The one sentence a reviewer should retain, at the same weight and negative
          tracking the page gives it. Sized so it lands on two lines at 1200px.
        */}
        <div
          style={{
            display: "flex",
            marginTop: 28,
            maxWidth: 820,
            fontSize: 62,
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
          }}
        >
          {siteConfig.positioning}
        </div>

        {/* Pushes the metadata row to the bottom edge whatever the headline wraps to. */}
        <div style={{ display: "flex", flexGrow: 1 }} />

        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: 28,
            borderTop: `1px solid ${color.rule}`,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ ...monoLabel, color: color.inkMuted }}>Tools</span>
            <span style={{ marginTop: 12, fontSize: 24 }}>
              {siteConfig.tools.join(", ")}
            </span>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}
          >
            <span style={{ ...monoLabel, color: color.inkMuted }}>Contact</span>
            <span style={{ marginTop: 12, fontSize: 24 }}>{siteConfig.email}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Geist", data: geistRegular, weight: 400, style: "normal" },
        { name: "Geist", data: geistSemiBold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: geistMonoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
