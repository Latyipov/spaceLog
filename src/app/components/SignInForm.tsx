"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const errorMap: Record<string, string> = {
  CredentialsSignin: "Неверный email или пароль",
  default: "Ошибка входа. Попробуйте ещё раз.",
};

export function SignInForm({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<"signin" | "signup">>;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = error ? errorMap[error] ?? errorMap.default : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setFormError("Wrong email or password");
    }
  };

  return (
    <section className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h1 className="text-3xl font-bold text-white text-center mb-6">
        Sign In
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {(formError || errorMessage) && (
          <p className="text-red-600 text-sm">{formError || errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
      <div className="text-center mt-4 text-gray-400 text-sm">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => setForm("signup")}
          className="text-blue-400 hover:underline"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
}
