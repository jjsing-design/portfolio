import type { ClaimStatus, PrescriptionStatus } from "@/lib/anthem";

const prescriptionStyles: Record<
  PrescriptionStatus,
  { label: string; className: string }
> = {
  "refill-available": {
    label: "Refill Available",
    className: "bg-[#e5f4ea] text-[#0b6b3a]",
  },
  active: {
    label: "Active",
    className: "bg-[#eef1f4] text-[#3d4d5f]",
  },
  pending: {
    label: "Pending",
    className: "bg-[#fff1df] text-[#8a4b00]",
  },
  shipped: {
    label: "Shipped",
    className: "bg-[#e5f1fb] text-[#0b4f8a]",
  },
};

const claimStyles: Record<ClaimStatus, { label: string; className: string }> = {
  approved: {
    label: "Approved",
    className: "bg-[#e5f4ea] text-[#0b6b3a]",
  },
  pending: {
    label: "Pending",
    className: "bg-[#fff1df] text-[#8a4b00]",
  },
  denied: {
    label: "Denied",
    className: "bg-[#fde8e8] text-[#9b1c1c]",
  },
};

export function PrescriptionBadge({ status }: { status: PrescriptionStatus }) {
  const style = prescriptionStyles[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.label}
    </span>
  );
}

export function ClaimBadge({ status }: { status: ClaimStatus }) {
  const style = claimStyles[status];
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ${style.className}`}
    >
      {style.label}
    </span>
  );
}
