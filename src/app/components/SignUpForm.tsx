"use client";
import { trpcApi } from "@/utils/trpc";
import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function SignUpForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<"signin" | "signup">>;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = trpcApi.user.createNewUser.useMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await register.mutateAsync({ email, name, password });
      alert("Success! Now you can sign in");
      if (req.success) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.ok && !res.error) {
          router.push("/");
        } else {
          throw new Error("Ошибка входа");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Неизвестная ошибка");
      }
    }
  };

  return (
    <section className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Sign Up
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign Up
        </button>
      </form>
      <div className="text-center mt-4 text-gray-400 text-sm">
        Already have an account?{" "}
        <button
          onClick={() => setForm("signin")}
          className="text-blue-400 hover:underline cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </section>
  );
}
