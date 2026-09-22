import type { ComponentProps } from "react";

/**
 * Every call to action on this page navigates somewhere — an email client, GitHub,
 * or another part of the page — so all of them are anchors styled to look like
 * buttons. Nothing here is a <button>, because nothing here performs an action
 * in the page, and using the wrong element is the most common way to break
 * keyboard and screen reader behaviour.
 */
type ActionLinkProps = ComponentProps<"a"> & {
  variant?: "primary" | "secondary";
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

const variants = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary:
    "border border-rule bg-surface text-ink hover:border-ink hover:text-accent",
} as const;

export function ActionLink({
  variant = "primary",
  className = "",
  ...props
}: ActionLinkProps) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

/**
 * Marks a link as leaving the site. `rel="noreferrer"` is the safe default for
 * target="_blank"; the visually hidden suffix tells screen reader users that the
 * link opens a new tab, which sighted users infer from the arrow glyph.
 */
export function ExternalLinkHint() {
  return (
    <>
      <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}
