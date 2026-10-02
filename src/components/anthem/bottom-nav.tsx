export type TabId = "home" | "claims" | "pharmacy" | "settings";

const tabs: { id: TabId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "claims", label: "Claims" },
  { id: "pharmacy", label: "Pharmacy" },
  { id: "settings", label: "Settings" },
];

export function BottomNav({
  tab,
  onChange,
}: {
  tab: TabId;
  onChange: (tab: TabId) => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-20 flex justify-center">
      <nav
        aria-label="Primary"
        className="w-full max-w-md border-t border-[#d5e0ea] bg-white"
      >
        <ul className="grid grid-cols-4">
        {tabs.map((item) => {
          const current = item.id === tab;
          return (
            <li key={item.id}>
              <button
                type="button"
                aria-current={current ? "page" : undefined}
                onClick={() => onChange(item.id)}
                className={`flex min-h-14 w-full flex-col items-center justify-center gap-1 border-t-2 text-xs font-medium ${
                  current
                    ? "border-[#005eb8] font-semibold text-[#00427d]"
                    : "border-transparent text-[#3d4d5f]"
                }`}
              >
                <TabIcon id={item.id} />
                {item.label}
              </button>
            </li>
          );
        })}
        </ul>
      </nav>
    </div>
  );
}

function TabIcon({ id }: { id: TabId }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
    className: "size-5",
  };

  if (id === "home") {
    return (
      <svg {...common}>
        <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" />
      </svg>
    );
  }

  if (id === "claims") {
    return (
      <svg {...common}>
        <path d="M7 3.5h7l5 5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z" />
        <path d="M14 3.5V9h5.5M8.5 13h7M8.5 16.5h7" />
      </svg>
    );
  }

  if (id === "pharmacy") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3V20.5M4.8 6.6l1.6 1.5M17.6 15.9l1.6 1.5M3.5 12h2.2M18.3 12h2.2M4.8 17.4l1.6-1.5M17.6 8.1l1.6-1.5" />
    </svg>
  );
}
