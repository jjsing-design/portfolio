import { claims, formatLongDate, formatMoney } from "@/lib/anthem";

import { ClaimBadge } from "./status-pill";
import { Wordmark } from "./ui";

const entryCards = ["Claim history", "Claim submission center"] as const;

export function ClaimsScreen() {
  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-6 pt-5">
      <Wordmark />
      <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight">Claims</h1>

      <ul className="mt-6 flex flex-col gap-3">
        {entryCards.map((title) => (
          <li key={title}>
            <article className="rounded-2xl border border-[#d5e0ea] bg-white p-5">
              <h2 className="text-lg font-semibold">{title}</h2>
            </article>
          </li>
        ))}
      </ul>

      <section aria-labelledby="recent-claims" className="mt-8">
        <h2 id="recent-claims" className="text-lg font-semibold">
          Recent claims
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {claims.map((claim) => (
            <li key={claim.id}>
              <article className="rounded-2xl border border-[#d5e0ea] bg-white p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium text-[#3d4d5f]">
                    {formatLongDate(claim.date)}
                  </p>
                  <ClaimBadge status={claim.status} />
                </div>
                <h3 className="mt-2 text-base font-semibold">{claim.provider}</h3>
                <p className="mt-1 text-sm text-[#3d4d5f]">{claim.service}</p>
                <p className="mt-3 text-base font-semibold">{formatMoney(claim.amount)}</p>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
