"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Loading } from "@components/Loading/Loading";
import { trpcApi } from "@/utils/trpc";
import { NameEditableField } from "@components/NameEditableField";
import { EmailEditableField } from "@components/EmailEditableField";
import { PasswordEditableField } from "@components/PasswordEditableField";
import { SignOutButton } from "@components/SignOutButton";
import { DeleteAccountButton } from "@components/DeleteAccountButton";

type messageType = { text: string; type: "success" | "error" };

export function ProfileForm() {
  const { status } = useSession();
  const [message, setMessage] = useState<messageType | null>(null);
  const [isHandleLoading, setIsHandleLoading] = useState<boolean>(false);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = trpcApi.user.getUserById.useQuery();

  if (status !== "authenticated") return <p>Not signed in</p>;

  if (isUserLoading || isHandleLoading) return <Loading />;

  if (userError) {
    return (
      <div className="text-red-500 text-center">
        ❌ User data error: {userError.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-center">👤 Your Profile</h1>

      {message && (
        <div
          className={`text-center font-medium ${
            message.type === "error" ? "text-red-400" : "text-green-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <NameEditableField
        currentName={user?.name ?? ""}
        setMessage={setMessage}
        setLoading={setIsHandleLoading}
        refetchUser={refetchUser}
      />
      <EmailEditableField
        currentEmail={user?.email ?? ""}
        setMessage={setMessage}
        setLoading={setIsHandleLoading}
        refetchUser={refetchUser}
      />
      <PasswordEditableField
        setMessage={setMessage}
        setLoading={setIsHandleLoading}
      />
      <SignOutButton />

      <DeleteAccountButton
        setMessage={setMessage}
        setLoading={setIsHandleLoading}
      />
    </div>
  );
}
