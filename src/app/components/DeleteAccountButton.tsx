"use client";
import { Dispatch, SetStateAction } from "react";
import { trpcApi } from "@/utils/trpc";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

type DeleteAccountButtonProps = {
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export function DeleteAccountButton({ setLoading }: DeleteAccountButtonProps) {
  const { mutate: deleteUser } = trpcApi.user.deleteById.useMutation({
    onSuccess: () => {
      signOut({ callbackUrl: "/?message=account-deleted" });
    },
    onError: (error) => {
      console.log(error.message);
      toast.error(error.message);
    },
  });

  const onDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? All your logs will be permanently lost."
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
