"use client";
import { Dispatch, SetStateAction } from "react";
import { trpcApi } from "@/utils/trpc";
import { signOut } from "next-auth/react";

type messageType = { text: string; type: "success" | "error" };
type DeleteAccountButtonProps = {
  setMessage: Dispatch<SetStateAction<messageType | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export function DeleteAccountButton({
  setMessage,
  setLoading,
}: DeleteAccountButtonProps) {
  const { mutate: deleteUser } = trpcApi.user.deleteById.useMutation({
    onSuccess: () => {
      signOut({ callbackUrl: "/" });
      window.alert("Deleted");
    },
    onError: (error) => {
      setMessage({ text: error.message, type: "error" });
    },
  });

  const onDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure that you want delete account?"
    );
    if (confirmed) {
      setLoading(true);
      deleteUser();
    } else {
      return undefined;
    }
  };

  return (
    <div className="border-t border-gray-700 pt-4 space-y-3">
      <button
        onClick={onDeleteAccount}
        className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
      >
        ❌ Delete Account
      </button>
    </div>
  );
}
