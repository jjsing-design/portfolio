"use client";

import { useState, type FormEvent } from "react";

import {
  deductibleLine,
  formatMoney,
  formatMoneyExact,
  getPharmacy,
  getPrescription,
  isRefillAvailable,
  memberCost,
  outOfPocketLine,
  pharmacies,
  pharmacyOptionLabel,
  pharmacyPlan,
  type DeliveryMethod,
} from "@/lib/anthem";

import { fieldClass, primaryButtonClass, quietButtonClass, Wordmark } from "./ui";

export function RefillConfirmation({
  prescriptionId,
  onBack,
  onConfirm,
}: {
  prescriptionId: string;
  onBack: () => void;
  onConfirm: (selection: {
    pharmacyId: string;
    deliveryMethod: DeliveryMethod;
  }) => void;
}) {
  const prescription = getPrescription(prescriptionId);
  const [pharmacyId, setPharmacyId] = useState(pharmacies[0]?.id ?? "");
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home");

  if (!prescription || !isRefillAvailable(prescription)) {
    return (
      <main id="main" className="flex flex-1 flex-col px-5 py-8">
        <button type="button" className={quietButtonClass} onClick={onBack}>
          Back
        </button>
      </main>
    );
  }

  const pharmacy = getPharmacy(pharmacyId);
  const youPay = memberCost(
    prescription.estimatedCost,
    pharmacyPlan.deductibleRemaining,
  );

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!pharmacyId) return;
    onConfirm({ pharmacyId, deliveryMethod });
  }

  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-8 pt-5">
      <Wordmark />
      <button type="button" className={`${quietButtonClass} mt-3 -ml-3`} onClick={onBack}>
        Back
      </button>
      <h1 className="mt-2 text-[1.75rem] font-semibold tracking-tight">
        Confirm refill
      </h1>

      <section aria-labelledby="medication-recap" className="mt-6">
        <h2 id="medication-recap" className="text-sm font-semibold text-[#3d4d5f]">
          Medication
        </h2>
        <p className="mt-2 text-lg font-semibold">{prescription.name}</p>
        <p className="mt-1 text-sm text-[#3d4d5f]">
          {prescription.dose} · {prescription.quantity}
        </p>
        <p className="mt-1 text-sm text-[#3d4d5f]">{prescription.prescriber}</p>
      </section>

      <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-6">
        <div>
          <label htmlFor="pharmacy" className="text-sm font-semibold">
            Pharmacy
          </label>
          <select
            id="pharmacy"
            name="pharmacy"
            value={pharmacyId}
            onChange={(event) => setPharmacyId(event.target.value)}
            className={fieldClass}
          >
            {pharmacies.map((option) => (
              <option key={option.id} value={option.id}>
                {pharmacyOptionLabel(option)}
              </option>
            ))}
          </select>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold">Delivery method</legend>
          <div className="mt-2 flex flex-col gap-2">
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-[#c5d2e0] px-3 text-base">
              <input
                type="radio"
                name="delivery"
                value="home"
                checked={deliveryMethod === "home"}
                onChange={() => setDeliveryMethod("home")}
              />
              Home delivery
            </label>
            <label className="flex min-h-11 items-center gap-3 rounded-xl border border-[#c5d2e0] px-3 text-base">
              <input
                type="radio"
                name="delivery"
                value="pickup"
                checked={deliveryMethod === "pickup"}
                onChange={() => setDeliveryMethod("pickup")}
              />
              Pickup
            </label>
          </div>
          {pharmacy ? (
            <p className="mt-2 text-sm text-[#3d4d5f]">
              {pharmacy.name} · {pharmacy.deliveryDays}{" "}
              {pharmacy.deliveryDays === 1 ? "delivery day" : "delivery days"}
            </p>
          ) : null}
        </fieldset>

        <section aria-labelledby="cost-breakdown" className="rounded-2xl bg-[#f4f8fc] p-4">
          <h2 id="cost-breakdown" className="text-sm font-semibold">
            Cost
          </h2>
          <dl className="mt-3 space-y-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-[#3d4d5f]">Estimated cost</dt>
              <dd className="font-medium">
                {formatMoneyExact(prescription.estimatedCost)}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#3d4d5f]">Deductible</dt>
              <dd className="text-right font-medium">{deductibleLine()}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-[#3d4d5f]">Out of pocket max</dt>
              <dd className="text-right font-medium">{outOfPocketLine()}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-[#d5e0ea] pt-2">
              <dt className="font-semibold">You pay</dt>
              <dd className="font-semibold">{formatMoney(youPay)}</dd>
            </div>
          </dl>
          <p className="mt-3 text-sm leading-relaxed text-[#3d4d5f]">
            While your deductible is open, you pay the lesser of the medication
            cost and the deductible remaining. After it is met, you pay 20%.
          </p>
        </section>

        <button type="submit" className={primaryButtonClass}>
          Confirm Refill
        </button>
      </form>
    </main>
  );
}
