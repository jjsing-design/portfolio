import {
  deductibleLine,
  formatLongDate,
  formatMoneyExact,
  getPharmacy,
  isRefillAvailable,
  nextRefillMessage,
  outOfPocketLine,
  prescriptions,
  prescriptionStatus,
} from "@/lib/anthem";

import { PrescriptionBadge } from "./status-pill";
import { disabledButtonClass, primaryButtonClass, Wordmark } from "./ui";

export function PharmacyScreen({
  onRefill,
}: {
  onRefill: (prescriptionId: string) => void;
}) {
  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-6 pt-5">
      <Wordmark />
      <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight">Pharmacy</h1>

      <section
        aria-labelledby="pharmacy-plan"
        className="mt-6 rounded-2xl border border-[#d5e0ea] bg-[#f4f8fc] p-4"
      >
        <h2 id="pharmacy-plan" className="text-sm font-semibold text-[#00427d]">
          Pharmacy Plan
        </h2>
        <dl className="mt-4 space-y-4">
          <div>
            <dt className="text-sm text-[#3d4d5f]">Deductible</dt>
            <dd className="mt-1 text-base font-semibold">{deductibleLine()}</dd>
          </div>
          <div>
            <dt className="text-sm text-[#3d4d5f]">Out of pocket max</dt>
            <dd className="mt-1 text-base font-semibold">{outOfPocketLine()}</dd>
          </div>
        </dl>
      </section>

      <h2 className="mt-8 text-lg font-semibold">Active prescriptions</h2>
      <ul className="mt-3 flex flex-col gap-4">
        {prescriptions.map((prescription) => {
          const available = isRefillAvailable(prescription);
          const pharmacy = getPharmacy(prescription.pharmacyId);
          return (
            <li key={prescription.id}>
              <article className="rounded-2xl border border-[#d5e0ea] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 id={prescription.id} className="text-lg font-semibold">
                    {prescription.name}
                  </h3>
                  <PrescriptionBadge status={prescriptionStatus(prescription)} />
                </div>
                <p className="mt-1 text-sm text-[#3d4d5f]">
                  {prescription.dose} · {prescription.quantity}
                </p>
                <p className="mt-1 text-sm text-[#3d4d5f]">
                  {prescription.prescriber}
                </p>
                {pharmacy ? (
                  <p className="mt-1 text-sm text-[#3d4d5f]">
                    Filled at {pharmacy.name}
                  </p>
                ) : null}
                <dl className="mt-3 space-y-1 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#3d4d5f]">Last refilled</dt>
                    <dd className="font-medium">
                      {formatLongDate(prescription.lastRefilled)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#3d4d5f]">Est. cost</dt>
                    <dd className="font-medium">
                      {formatMoneyExact(prescription.estimatedCost)}
                    </dd>
                  </div>
                </dl>
                {available ? (
                  <button
                    type="button"
                    className={`${primaryButtonClass} mt-4`}
                    onClick={() => onRefill(prescription.id)}
                  >
                    Refill Now
                  </button>
                ) : (
                  <div className="mt-4">
                    <button type="button" className={disabledButtonClass} disabled>
                      Cannot Refill
                    </button>
                    <p className="mt-2 text-sm text-[#3d4d5f]">
                      {nextRefillMessage(prescription)}
                    </p>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
