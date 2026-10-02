"use client";

import { useState } from "react";

import { homeCards, homeSuggestions, member } from "@/lib/anthem";

import { fieldClass, Wordmark } from "./ui";

export function HomeScreen() {
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [card, setCard] = useState<string | null>(null);

  return (
    <main id="main" className="flex flex-1 flex-col px-5 pb-6 pt-5">
      <Wordmark />
      <h1 className="mt-4 text-[1.75rem] font-semibold tracking-tight">
        Hello, {member.name}
      </h1>

      <form
        className="mt-6 rounded-2xl border border-[#d5e0ea] bg-[#f4f8fc] p-4"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="assistant" className="text-lg font-semibold">
          How can I help?
        </label>
        <p id="assistant-hint" className="mt-2 text-sm leading-relaxed text-[#3d4d5f]">
          I&apos;m your healthcare assistant. Ask me about your plan, care, or
          coverage.
        </p>
        <input
          id="assistant"
          name="assistant"
          type="text"
          aria-describedby="assistant-hint"
          className={`${fieldClass} bg-white`}
        />
        <ul className="mt-4 flex flex-wrap gap-2">
          {homeSuggestions.map((label) => {
            const pressed = suggestion === label;
            return (
              <li key={label}>
                <button
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setSuggestion(pressed ? null : label)}
                  className={`inline-flex min-h-11 items-center rounded-full border px-3 text-sm font-medium ${
                    pressed
                      ? "border-[#005eb8] bg-[#e5f1fb] text-[#00427d]"
                      : "border-[#c5d2e0] bg-white text-[#102033]"
                  }`}
                >
                  {pressed ? (
                    <span aria-hidden="true" className="mr-1.5">
                      ✓
                    </span>
                  ) : null}
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </form>

      <ul className="mt-6 flex flex-col gap-3">
        {homeCards.map((label) => {
          const pressed = card === label;
          return (
            <li key={label}>
              <button
                type="button"
                aria-pressed={pressed}
                onClick={() => setCard(pressed ? null : label)}
                className={`flex min-h-16 w-full items-center rounded-2xl border px-4 text-left text-base font-semibold ${
                  pressed
                    ? "border-[#005eb8] bg-[#e5f1fb] text-[#00427d]"
                    : "border-[#d5e0ea] bg-white text-[#102033]"
                }`}
              >
                {pressed ? (
                  <span aria-hidden="true" className="mr-2">
                    ✓
                  </span>
                ) : null}
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
