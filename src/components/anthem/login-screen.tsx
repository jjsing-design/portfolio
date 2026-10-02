"use client";

import { useState, type FormEvent } from "react";

import { fieldClass, primaryButtonClass } from "./ui";

export function LoginScreen({ onSignIn }: { onSignIn: () => void }) {
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = String(data.get("username") ?? "").trim();
    const password = String(data.get("password") ?? "").trim();
    if (!username || !password) {
      setError("Enter a username and password.");
      return;
    }
    setError(null);
    onSignIn();
  }

  return (
    <main id="main" className="flex flex-1 flex-col">
      <header className="bg-[#005eb8] px-6 pb-12 pt-14 text-white">
        <h1 className="text-[2rem] font-semibold tracking-tight">Anthem</h1>
        <p className="mt-1 text-base text-white">Healthcare Made Simple</p>
      </header>

      <form
        onSubmit={onSubmit}
        className="mx-5 -mt-6 rounded-2xl border border-[#d5e0ea] bg-white p-5 shadow-sm"
        noValidate
      >
        <div>
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            required
            className={fieldClass}
            onChange={() => setError(null)}
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className={fieldClass}
            onChange={() => setError(null)}
          />
        </div>

        {error ? (
          <p role="alert" className="mt-3 text-sm font-medium text-[#9b1c1c]">
            {error}
          </p>
        ) : null}

        <button type="submit" className={`${primaryButtonClass} mt-5`}>
          Sign in
        </button>

        <button
          type="button"
          className="mt-3 min-h-11 w-full text-center text-sm text-[#00427d]"
        >
          Forgot password?
        </button>
      </form>

      <p className="px-6 py-8 text-center text-sm text-[#3d4d5f]">
        Use any username and password.
      </p>
    </main>
  );
}
