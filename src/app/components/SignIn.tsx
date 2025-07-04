"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const errorMap: Record<string, string> = {
  CredentialsSignin: "Неверный email или пароль",
  default: "Ошибка входа. Попробуйте ещё раз.",
};

export function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");

  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = error ? errorMap[error] ?? errorMap.default : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(""); // сбрасываем ошибку

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      setFormError("Неверный email или пароль");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-semibold mb-6">Вход в аккаунт</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {(formError || errorMessage) && (
          <p className="text-red-600 text-sm">{formError || errorMessage}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Войти
        </button>
      </form>
    </main>
  );
}
