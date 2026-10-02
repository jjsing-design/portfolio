import {
  formatLongDate,
  getPharmacy,
  getPrescription,
  type DeliveryMethod,
} from "@/lib/anthem";

import { primaryButtonClass, Wordmark } from "./ui";

const deliveryLabels: Record<DeliveryMethod, string> = {
  home: "Home delivery",
  pickup: "Pickup",
};

export type ConfirmedOrder = {
  number: string;
  prescriptionId: string;
  pharmacyId: string;
  deliveryMethod: DeliveryMethod;
  expectedDelivery: string;
};

export function OrderConfirmation({
  order,
  onDone,
}: {
  order: ConfirmedOrder;
  onDone: () => void;
}) {
  const prescription = getPrescription(order.prescriptionId);
  const pharmacy = getPharmacy(order.pharmacyId);

  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-8 pt-5">
      <Wordmark />
      <h1 className="mt-6 text-[1.75rem] font-semibold tracking-tight text-[#0b6b3a]">
        Refill confirmed
      </h1>

      <dl className="mt-6 space-y-4 rounded-2xl border border-[#d5e0ea] p-4 text-sm">
        <div>
          <dt className="text-[#3d4d5f]">Order number</dt>
          <dd className="mt-1 font-mono text-lg font-semibold text-[#102033]">
            {order.number}
          </dd>
        </div>
        <div>
          <dt className="text-[#3d4d5f]">Medication</dt>
          <dd className="mt-1 font-medium">
            {prescription
              ? `${prescription.name} ${prescription.dose}`
              : "Medication"}
          </dd>
        </div>
        <div>
          <dt className="text-[#3d4d5f]">Pharmacy</dt>
          <dd className="mt-1 font-medium">{pharmacy?.name ?? "Pharmacy"}</dd>
        </div>
        <div>
          <dt className="text-[#3d4d5f]">Delivery</dt>
          <dd className="mt-1 font-medium">{deliveryLabels[order.deliveryMethod]}</dd>
        </div>
        <div>
          <dt className="text-[#3d4d5f]">Expected delivery</dt>
          <dd className="mt-1 font-medium">{formatLongDate(order.expectedDelivery)}</dd>
        </div>
      </dl>

      <section aria-labelledby="whats-next" className="mt-6">
        <h2 id="whats-next" className="text-base font-semibold">
          What&apos;s next
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#3d4d5f]">
          Email confirmation, SMS tracking, and you can view the order in the app.
        </p>
      </section>

      <button type="button" className={`${primaryButtonClass} mt-8`} onClick={onDone}>
        Back to Pharmacy
      </button>
    </main>
  );
}
