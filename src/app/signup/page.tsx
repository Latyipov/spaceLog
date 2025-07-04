"use client";
import { trpcApi } from "@/utils/trpc";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const register = trpcApi.user.createNewUser.useMutation();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const req = await register.mutateAsync({ email, name, password });
      console.log(req);
      alert("Успешно! Теперь войдите");
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
    <main className="max-w-md mx-auto mt-20 px-4">
      <h1 className="text-2xl font-semibold mb-6">Reg</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border px-3 py-2 rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Имя"
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Зарегистрироваться
        </button>
      </form>
    </main>
  );
}
