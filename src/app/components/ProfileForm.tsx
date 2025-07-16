"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Loading } from "@components/Loading/Loading";
import { trpcApi } from "@/utils/trpc";
import { userSchema, type user } from "@/zodSchemas";

type errorsType = {
  password?: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
};

export function ProfileForm() {
  const { status } = useSession();
  const [inputData, setInputData] = useState<user>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<errorsType | null>(null);

  const {
    data: user,
    isLoading: isUserLoading,
    error: userError,
  } = trpcApi.user.getUserById.useQuery();

  const { mutate: updateUser, isPending: isUpdateNameLoading } =
    trpcApi.user.updateUserName.useMutation({
      onSuccess: () => {
        setMessage("Name updated");
      },
      onError: (error) => {
        console.log(error.message);
        setMessage("Something Wrong");
      },
    });
  const { mutate: updateEmail, isPending: isUpdateEmailLoading } =
    trpcApi.user.updateEmail.useMutation({
      onSuccess: () => {
        setMessage("Email updated");
      },
      onError: (error) => {
        console.log(error.message);
        setMessage("Something Wrong");
      },
    });

  const isChanged = (field: "name" | "email") =>
    user?.[field] !== inputData?.[field];

  const onUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const name = e.currentTarget.dataset.field as "name" | "email";
    if (name === "name") updateUser({ name: inputData.name });
    if (name === "email") updateEmail({ email: inputData.email });
  };

  const validateField = (
    fieldName: "name" | "email" | "password",
    value: string
  ) => {
    const fieldSchema = userSchema.shape[fieldName];
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
    const name = e.target.name as "name" | "email" | "password";
    const value = e.target.value as string;
    setInputData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  useEffect(() => {
    setInputData((prev) => ({
      ...prev,
      name: user?.name ?? "",
      email: user?.email ?? "",
    }));
  }, [user]);

  if (
    status === "loading" ||
    isUserLoading ||
    isUpdateNameLoading ||
    isUpdateEmailLoading
  )
    return <Loading />;
  console.log(errors);
  if (status !== "authenticated") return <p>Not signed in</p>;
  return (
    <div className="w-full max-w-lg bg-gray-900 p-8 rounded-2xl shadow-lg space-y-8">
      <h1 className="text-3xl font-bold text-center">👤 Your Profile</h1>

      {message && (
        <div className="text-green-400 text-center font-medium">{message}</div>
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
        <label className="block mb-1 text-gray-300">New Password</label>
        <div className="flex gap-2 flex-col">
          <input
            name="password"
            type="password"
            value={inputData.password}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {/* <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          /> */}
          <button
            // onClick={handleUpdatePassword}
            className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Update password
          </button>
        </div>
      </div>

      {/* Delete Account */}
      {/* <div className="border-t border-gray-700 pt-4 space-y-3">
        <button
          onClick={() => signOut()}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-semibold transition"
        >
          🚪 Sign Out
        </button>
        <button
          onClick={handleDeleteAccount}
          className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition"
        >
          ❌ Delete Account
        </button>
      </div> */}
    </div>
  );
}
