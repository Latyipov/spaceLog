import { useState, Dispatch, SetStateAction } from "react";
import { trpcApi } from "@/utils/trpc";
import { userSchema } from "@/zodSchemas";
import { z } from "zod";

const inputPasswordsSchema = z.object({
  oldPassword: userSchema.shape.password,
  newPassword: userSchema.shape.password,
});
type inputPasswordsType = z.infer<typeof inputPasswordsSchema>;
type errorsType = Partial<z.infer<typeof inputPasswordsSchema>>;
type messageType = { text: string; type: "success" | "error" };

type PasswordEditableFieldProps = {
  setMessage: Dispatch<SetStateAction<messageType | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export function PasswordEditableField({
  setMessage,
  setLoading,
}: PasswordEditableFieldProps) {
  const [inputPasswords, setInputPasswords] = useState<inputPasswordsType>({
    oldPassword: "",
    newPassword: "",
  });
  const [errors, setErrors] = useState<errorsType | null>(null);

  const { mutate: updatePassword } = trpcApi.user.updatePassword.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      setMessage({ text: "Password updated", type: "success" });
      setInputPasswords({ oldPassword: "", newPassword: "" });
    },
    onError: (error) => {
      setLoading(false);
      setMessage({ text: error.message, type: "error" });
    },
  });

  const validateField = (
    fieldName: "oldPassword" | "newPassword",
    value: string
  ) => {
    const fieldSchema = inputPasswordsSchema.shape[fieldName];
    const isValid = fieldSchema.safeParse(value);
    if (!isValid.success) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: isValid.error.issues[0].message,
      }));
    } else {
      setErrors((prev) => ({ ...prev, [fieldName]: undefined }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as "oldPassword" | "newPassword";
    const value = e.target.value.trim() as string;
    setInputPasswords((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  return (
    <div>
      <label className="block mb-1 text-gray-300">Current Password</label>
      <div className="flex gap-2 flex-col">
        <input
          name="oldPassword"
          type="password"
          value={inputPasswords.oldPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors?.oldPassword && (
          <p style={{ color: "red" }}>{errors.newPassword}</p>
        )}
        <label className="block mb-1 text-gray-300">New Password</label>
        <input
          name="newPassword"
          type="password"
          value={inputPasswords.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        {errors?.newPassword && (
          <p style={{ color: "red" }}>{errors.newPassword}</p>
        )}
        <button
          data-field="password"
          disabled={!!errors?.oldPassword || !!errors?.newPassword}
          onClick={() =>
            updatePassword({
              oldPassword: inputPasswords.oldPassword,
              newPassword: inputPasswords.newPassword,
            })
          }
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Update password
        </button>
      </div>
    </div>
  );
}
