"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <div>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className=" w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
      >
        🚪 Exit
      </button>
    </div>
  );
}
