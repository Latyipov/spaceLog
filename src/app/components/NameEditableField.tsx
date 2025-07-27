import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { trpcApi } from "@/utils/trpc";
import { userSchema } from "@/zodSchemas";

const nameSchema = userSchema.shape.name;
type messageType = { text: string; type: "success" | "error" };

type RefetchUserType = ReturnType<
  typeof trpcApi.user.getUserById.useQuery
>["refetch"];

type NameEditableFieldProps = {
  currentName: string;
  setMessage: Dispatch<SetStateAction<messageType | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  refetchUser: RefetchUserType;
};

export function NameEditableField({
  currentName,
  setMessage,
  setLoading,
  refetchUser,
}: NameEditableFieldProps) {
  const [name, setName] = useState<string>(currentName);
  const [error, setError] = useState<string | null>(null);

  const { mutate: updateName } = trpcApi.user.updateUserName.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      setLoading(false);
      refetchUser();
      setMessage({ text: "Name updated", type: "success" });
    },
    onError: (error) => {
      setLoading(false);
      console.log(error.message);
      setMessage({ text: error.message, type: "error" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setName(value);
    const isValid = nameSchema.safeParse(value);
    if (!isValid.success) {
      setError(isValid.error.issues[0].message);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    setName(currentName);
  }, [currentName]);

  return (
    <div>
      <label className="block mb-1 text-gray-300">Name</label>
      <div className="flex gap-2">
        <input
          name="name"
          value={name}
          onChange={handleChange}
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <button
          data-field="name"
          disabled={currentName === name || !!error}
          onClick={() => updateName({ name: name })}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Update name
        </button>
      </div>
      {!!error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
