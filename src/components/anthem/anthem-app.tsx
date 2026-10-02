"use client";

import { useState } from "react";

import {
  createOrderNumber,
  expectedDeliveryDate,
  getPharmacy,
} from "@/lib/anthem";

import { BottomNav, type TabId } from "./bottom-nav";
import { ClaimsScreen } from "./claims-screen";
import { HomeScreen } from "./home-screen";
import { LoginScreen } from "./login-screen";
import { OrderConfirmation, type ConfirmedOrder } from "./order-confirmation";
import { PharmacyScreen } from "./pharmacy-screen";
import { RefillConfirmation } from "./refill-confirmation";
import { SettingsScreen } from "./settings-screen";

type Screen =
  | { name: "login" }
  | { name: "tabs"; tab: TabId }
  | { name: "refill"; prescriptionId: string }
  | { name: "order"; order: ConfirmedOrder };

export function AnthemApp() {
  const [screen, setScreen] = useState<Screen>({ name: "login" });

  if (screen.name === "login") {
    return <LoginScreen onSignIn={() => setScreen({ name: "tabs", tab: "home" })} />;
  }

  if (screen.name === "refill") {
    return (
      <RefillConfirmation
        prescriptionId={screen.prescriptionId}
        onBack={() => setScreen({ name: "tabs", tab: "pharmacy" })}
        onConfirm={({ pharmacyId, deliveryMethod }) => {
          const pharmacy = getPharmacy(pharmacyId);
          if (!pharmacy) return;
          setScreen({
            name: "order",
            order: {
              number: createOrderNumber(),
              prescriptionId: screen.prescriptionId,
              pharmacyId,
              deliveryMethod,
              expectedDelivery: expectedDeliveryDate(pharmacy),
            },
          });
        }}
      />
    );
  }

  if (screen.name === "order") {
    return (
      <OrderConfirmation
        order={screen.order}
        onDone={() => setScreen({ name: "tabs", tab: "pharmacy" })}
      />
    );
  }

  // pb-36 keeps the last card above the fixed bottom nav.
  return (
    <div className="flex flex-1 flex-col pb-36">
      <div className="flex-1">
        {screen.tab === "home" ? <HomeScreen /> : null}
        {screen.tab === "claims" ? <ClaimsScreen /> : null}
        {screen.tab === "pharmacy" ? (
          <PharmacyScreen
            onRefill={(prescriptionId) =>
              setScreen({ name: "refill", prescriptionId })
            }
          />
        ) : null}
        {screen.tab === "settings" ? (
          <SettingsScreen onLogout={() => setScreen({ name: "login" })} />
        ) : null}
      </div>
      <BottomNav
        tab={screen.tab}
        onChange={(tab) => setScreen({ name: "tabs", tab })}
      />
    </div>
  );
}
