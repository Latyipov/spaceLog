import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { trpcApi } from "@/utils/trpc";
import { userSchema } from "@/zodSchemas";

const emailSchema = userSchema.shape.email;
type messageType = { text: string; type: "success" | "error" };

type RefetchUserType = ReturnType<
  typeof trpcApi.user.getUserById.useQuery
>["refetch"];

type NameEditableFieldProps = {
  currentEmail: string;
  setMessage: Dispatch<SetStateAction<messageType | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetchUser: RefetchUserType;
};

export function EmailEditableField({
  currentEmail,
  setMessage,
  setLoading,
  refetchUser,
}: NameEditableFieldProps) {
  const [email, setEmail] = useState<string>(currentEmail);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateEmail } = trpcApi.user.updateEmail.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      refetchUser();
      setMessage({ text: "Email updated", type: "success" });
    },
    onError: (error) => {
      setLoading(false);
      console.log(error.message);
      setMessage({ text: error.message, type: "error" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    const isValid = emailSchema.safeParse(value);
    if (!isValid.success) {
      setError(isValid.error.issues[0].message);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail]);

  return (
    <div>
      <label className="block mb-1 text-gray-300">Email</label>
      <div className="flex gap-2">
        <input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          data-field="email"
          disabled={currentEmail === email || !!error}
          onClick={() => updateEmail({ email: email })}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Update email
        </button>
      </div>
      {!!error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
