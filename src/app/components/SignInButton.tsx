"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Загрузка...</p>;

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <p>👋 Привет, {session.user?.name || session.user?.email}</p>
        <button onClick={() => signOut()} className="underline text-red-600">
          Выйти
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn()} className="underline text-blue-600">
      Войти
    </button>
  );
}
