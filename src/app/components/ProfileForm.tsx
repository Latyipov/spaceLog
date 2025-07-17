"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loading } from "@components/Loading/Loading";
import { trpcApi } from "@/utils/trpc";
import { userSchema } from "@/zodSchemas";
import { signOut } from "next-auth/react";
import { z } from "zod";

const inputDataSchema = userSchema.pick({ name: true, email: true }).extend({
  oldPassword: userSchema.shape.password,
  newPassword: userSchema.shape.password,
});

type inputDataType = z.infer<typeof inputDataSchema>;
type errorsType = Partial<z.infer<typeof inputDataSchema>>;
type messageType = { text: string; type: "success" | "error" };

export function ProfileForm() {
  const { status } = useSession();
  const [inputData, setInputData] = useState<inputDataType>({
    name: "",
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [message, setMessage] = useState<messageType | null>(null);
  const [errors, setErrors] = useState<errorsType | null>(null);
  const [isHandleLoading, setIsHandleLoading] = useState<boolean>(false);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
    refetch: refetchUser,
  } = trpcApi.user.getUserById.useQuery();

  const { mutate: updateUser, isPending: isUpdateNameLoading } =
    trpcApi.user.updateUserName.useMutation({
      onSuccess: () => {
        refetchUser();
        setMessage({ text: "Name updated", type: "success" });
      },
      onError: (error) => {
        console.log(error.message);
        setMessage({ text: error.message, type: "error" });
      },
    });
  const { mutate: updateEmail, isPending: isUpdateEmailLoading } =
    trpcApi.user.updateEmail.useMutation({
      onSuccess: () => {
        refetchUser();
        setMessage({ text: "Email updated", type: "success" });
      },
      onError: (error) => {
        console.log(error.message);
        setMessage({ text: error.message, type: "error" });
      },
    });
  const { mutate: updatePassword, isPending: isUpdatePasswordLoading } =
    trpcApi.user.updatePassword.useMutation({
      onSuccess: () => {
        setMessage({ text: "Password updated", type: "success" });
        setInputData((prev) => ({
          ...prev,
          oldPassword: "",
          newPassword: "",
        }));
      },
      onError: (error) => {
        setMessage({ text: error.message, type: "error" });
      },
    });
  const { mutate: deleteUser } = trpcApi.user.deleteById.useMutation({
    onSuccess: () => {
      signOut({ callbackUrl: "/" });
      window.alert("Deleted");
    },
    onError: (error) => {
      setMessage({ text: error.message, type: "error" });
    },
  });

  const isChanged = (field: "name" | "email") =>
    user?.[field] !== inputData?.[field];

  const onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.dataset.field as "name" | "email" | "password";
    if (name === "name") updateUser({ name: inputData.name });
    if (name === "email") updateEmail({ email: inputData.email });
    if (name === "password")
      updatePassword({
        oldPassword: inputData.oldPassword,
        newPassword: inputData.newPassword,
      });
  };

  const validateField = (
    fieldName: "name" | "email" | "oldPassword" | "newPassword",
    value: string
  ) => {
    const fieldSchema = inputDataSchema.shape[fieldName];
    const result = fieldSchema.safeParse(value);
    if (!result.success) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: result.error.issues[0].message,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as
      | "name"
      | "email"
      | "oldPassword"
      | "newPassword";
    const value = e.target.value.trim() as string;
    setInputData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const onDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure that you want delete account?"
    );
    if (confirmed) {
      setIsHandleLoading(true);
      deleteUser();
    } else {
      return undefined;
    }
  };

  useEffect(() => {
    setInputData((prev) => ({
      ...prev,
      name: user?.name ?? "",
      email: user?.email ?? "",
    }));
  }, [user]);

  if (status !== "authenticated") return <p>Not signed in</p>;

  if (
    isUserLoading ||
    isUpdateNameLoading ||
    isUpdateEmailLoading ||
    isUpdatePasswordLoading ||
    isHandleLoading
  )
    return <Loading />;

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

      <div>
        <label className="block mb-1 text-gray-300">Name</label>
        <div className="flex gap-2">
          <input
            name="name"
            value={inputData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            data-field="name"
            disabled={!isChanged("name") || !!errors?.name}
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Update name
          </button>
        </div>
        {errors?.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Email</label>
        <div className="flex gap-2">
          <input
            name="email"
            type="email"
            value={inputData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            data-field="email"
            disabled={!isChanged("email") || !!errors?.email}
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Update email
          </button>
        </div>
        {errors?.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <label className="block mb-1 text-gray-300">Current Password</label>
        <div className="flex gap-2 flex-col">
          <input
            name="oldPassword"
            type="password"
            value={inputData.oldPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <label className="block mb-1 text-gray-300">New Password</label>
          <input
            name="newPassword"
            type="password"
            value={inputData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {errors?.newPassword && (
            <p style={{ color: "red" }}>{errors.newPassword}</p>
          )}
          <button
            data-field="password"
            disabled={
              !!errors?.oldPassword ||
              !!errors?.newPassword ||
              !inputData.newPassword ||
              !inputData.oldPassword
            }
            onClick={onUpdate}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Update password
          </button>
        </div>
      </div>
      <div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className=" w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          🚪 Выйти
        </button>
      </div>
      <div className="border-t border-gray-700 pt-4 space-y-3">
        <button
          onClick={onDeleteAccount}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
        >
          ❌ Delete Account
        </button>
      </div>
    </div>
  );
}
