/**
 * Mock data for the Anthem prescription prototype.
 *
 * "Today" is fixed at 1 Oct 2026 so Metformin is refillable and the other two
 * medications are not. The cost helper is the prototype shortcut: while the
 * deductible remains, the member pays the lesser of the medication cost and
 * the deductible still open; after it is met, the member pays 20%.
 */

export const TODAY = "2026-10-01";

export type Member = {
  name: string;
};

export type Pharmacy = {
  id: string;
  name: string;
  distanceMiles: number;
  deliveryDays: number;
};

export type Prescription = {
  id: string;
  name: string;
  dose: string;
  quantity: string;
  prescriber: string;
  lastRefilled: string;
  nextRefill: string;
  estimatedCost: number;
  pharmacyId: string;
};

/** Pending and Shipped are part of the badge model. The sample list does not use them. */
export type PrescriptionStatus = "refill-available" | "active" | "pending" | "shipped";

/** Denied is part of the badge model. The sample list does not use it. */
export type ClaimStatus = "approved" | "pending" | "denied";

export type Claim = {
  id: string;
  date: string;
  provider: string;
  service: string;
  amount: number;
  status: ClaimStatus;
};

export type PharmacyPlan = {
  deductibleRemaining: number;
  deductibleMet: number;
  deductibleTotal: number;
  outOfPocketRemaining: number;
  outOfPocketSpent: number;
  outOfPocketTotal: number;
};

export type DeliveryMethod = "home" | "pickup";

export const member: Member = {
  name: "Jeramehl",
};

export const pharmacyPlan: PharmacyPlan = {
  deductibleRemaining: 750,
  deductibleMet: 750,
  deductibleTotal: 1500,
  outOfPocketRemaining: 3800,
  outOfPocketSpent: 1200,
  outOfPocketTotal: 5000,
};

export const pharmacies: readonly Pharmacy[] = [
  {
    id: "caelonrx",
    name: "CaelonRx Pharmacy",
    distanceMiles: 2.3,
    deliveryDays: 3,
  },
  {
    id: "walgreens-downtown",
    name: "Walgreens - Downtown",
    distanceMiles: 1.5,
    deliveryDays: 2,
  },
  {
    id: "cvs",
    name: "CVS Pharmacy",
    distanceMiles: 4.8,
    deliveryDays: 1,
  },
];

export const prescriptions: readonly Prescription[] = [
  {
    id: "metformin",
    name: "Metformin",
    dose: "500mg",
    quantity: "60 tablets",
    prescriber: "Dr. Johnson",
    lastRefilled: "2026-08-01",
    nextRefill: "2026-10-01",
    estimatedCost: 8.5,
    pharmacyId: "caelonrx",
  },
  {
    id: "lisinopril",
    name: "Lisinopril",
    dose: "10mg",
    quantity: "30 tablets",
    prescriber: "Dr. Smith",
    lastRefilled: "2026-08-15",
    nextRefill: "2026-10-15",
    estimatedCost: 15,
    pharmacyId: "caelonrx",
  },
  {
    id: "atorvastatin",
    name: "Atorvastatin",
    dose: "20mg",
    quantity: "30 tablets",
    prescriber: "Dr. Lee",
    lastRefilled: "2026-09-10",
    nextRefill: "2026-10-10",
    estimatedCost: 12.75,
    pharmacyId: "caelonrx",
  },
];

export const claims: readonly Claim[] = [
  {
    id: "office-visit",
    date: "2026-09-15",
    provider: "Dr. Smith",
    service: "Office Visit - General Checkup",
    amount: 150,
    status: "approved",
  },
  {
    id: "blood-work",
    date: "2026-08-20",
    provider: "Lab Services Inc",
    service: "Blood Work",
    amount: 85.5,
    status: "approved",
  },
  {
    id: "urgent-care",
    date: "2026-09-25",
    provider: "Urgent Care Center",
    service: "Urgent Care Visit",
    amount: 200,
    status: "pending",
  },
];

export const homeSuggestions = [
  "Schedule an appointment",
  "Find a primary care doctor",
  "Check my benefits",
] as const;

export const homeCards = [
  "See my benefits",
  "Sign up for care services",
  "See my health records",
] as const;

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

export function parseISODate(iso: string): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) {
    throw new Error(`Invalid date: ${iso}`);
  }
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

export function formatLongDate(iso: string): string {
  const date = parseISODate(iso);
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Parenthetical day in the refill message, e.g. "Oct 15". */
export function formatMonthDay(iso: string): string {
  const date = parseISODate(iso);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}`;
}

export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function daysUntil(iso: string, today = TODAY): number {
  const start = parseISODate(today).getTime();
  const end = parseISODate(iso).getTime();
  return Math.round((end - start) / 86_400_000);
}

export function isRefillAvailable(
  prescription: Prescription,
  today = TODAY,
): boolean {
  return daysUntil(prescription.nextRefill, today) <= 0;
}

export function prescriptionStatus(
  prescription: Prescription,
  today = TODAY,
): PrescriptionStatus {
  return isRefillAvailable(prescription, today) ? "refill-available" : "active";
}

/**
 * Deductible-then-20% shortcut. Not a real Anthem plan calculation.
 * While deductible remains, pay the lesser of the medication cost and the
 * amount still open. Otherwise pay 20% coinsurance.
 */
export function memberCost(
  medicationCost: number,
  deductibleRemaining: number,
): number {
  if (deductibleRemaining > 0) {
    return Math.min(medicationCost, deductibleRemaining);
  }
  return Math.round(medicationCost * 0.2 * 100) / 100;
}

export function formatMoney(amount: number): string {
  const cents = Math.round(amount * 100);
  const negative = cents < 0;
  const absolute = Math.abs(cents);
  const whole = Math.floor(absolute / 100);
  const fraction = absolute % 100;
  const body =
    fraction === 0 ? `${whole}` : `${whole}.${String(fraction).padStart(2, "0")}`;
  return `${negative ? "-" : ""}$${body}`;
}

/** Medication prices always show cents, matching the sample table ($15.00). */
export function formatMoneyExact(amount: number): string {
  const cents = Math.round(Math.abs(amount) * 100);
  const whole = Math.floor(cents / 100);
  const fraction = cents % 100;
  return `$${whole}.${String(fraction).padStart(2, "0")}`;
}

export function nextRefillMessage(
  prescription: Prescription,
  today = TODAY,
): string {
  const days = daysUntil(prescription.nextRefill, today);
  const unit = days === 1 ? "day" : "days";
  return `Next refill available in ${days} ${unit} (${formatMonthDay(prescription.nextRefill)})`;
}

export function pharmacyOptionLabel(pharmacy: Pharmacy): string {
  return `${pharmacy.name} — ${pharmacy.distanceMiles.toFixed(1)} miles`;
}

export function expectedDeliveryDate(pharmacy: Pharmacy, today = TODAY): string {
  return addDays(today, pharmacy.deliveryDays);
}

export function createOrderNumber(now = Date.now()): string {
  return `ORD-${Math.floor(now / 1000)}`;
}

export function getPrescription(id: string): Prescription | undefined {
  return prescriptions.find((item) => item.id === id);
}

export function getPharmacy(id: string): Pharmacy | undefined {
  return pharmacies.find((item) => item.id === id);
}

export function deductibleLine(plan: PharmacyPlan = pharmacyPlan): string {
  return `${formatMoney(plan.deductibleRemaining)} remaining (${formatMoney(plan.deductibleMet)} of ${formatMoney(plan.deductibleTotal)} met)`;
}

export function outOfPocketLine(plan: PharmacyPlan = pharmacyPlan): string {
  return `${formatMoney(plan.outOfPocketRemaining)} remaining (${formatMoney(plan.outOfPocketSpent)} of ${formatMoney(plan.outOfPocketTotal)} spent)`;
}
