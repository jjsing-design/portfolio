import { primaryButtonClass, Wordmark } from "./ui";

export function SettingsScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-8 pt-5">
      <Wordmark />
      <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight">Settings</h1>
      <p className="mt-6 text-base text-[#3d4d5f]">Settings page coming soon</p>
      <button type="button" className={`${primaryButtonClass} mt-8`} onClick={onLogout}>
        Logout
      </button>
    </main>
  );
}
