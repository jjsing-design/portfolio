import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anthem — Healthcare Made Simple",
  description: "Sign in to manage prescriptions, claims, and plan details.",
};

/**
 * Prototype shell. Intentionally does not render SiteHeader or SiteFooter.
 */
export default function AnthemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="anthem flex flex-1 flex-col bg-[#e7eef5] text-[#102033]">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col bg-white shadow-[0_0_0_1px_rgba(16,32,51,0.06)]">
        {children}
      </div>
    </div>
  );
}
