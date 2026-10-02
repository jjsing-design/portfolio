export const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#005eb8] px-4 text-base font-semibold text-white hover:bg-[#004e9c]";

export const quietButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-xl px-3 text-sm font-semibold text-[#00427d]";

export const disabledButtonClass =
  "inline-flex min-h-11 w-full cursor-not-allowed items-center justify-center rounded-xl bg-[#d5dbe3] px-4 text-base font-semibold text-[#3d4d5f] opacity-50";

export const fieldClass =
  "mt-1 w-full min-h-11 rounded-xl border border-[#c5d2e0] bg-white px-3 text-base text-[#102033]";

export function Wordmark() {
  return (
    <p className="text-sm font-semibold tracking-wide text-[#005eb8]">Anthem</p>
  );
}
