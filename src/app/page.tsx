"use client";

import { api } from "@/utils/trpc";
import { useState } from "react";

export default function Home() {
  const helloQuery = api.example.hello.useQuery({});
  const { data: helloData, isLoading: helloLoading } =
    api.user.helloById.useQuery({
      id: "87ff7bf4-20ac-4a11-8643-04ca7eb10ce1",
    });
  const { data, isLoading, error } = api.health.dbOk.useQuery();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const [submittedName, setSubmittedName] = useState<string | null>(null);

  const mutation = api.user.updateName.useMutation({
    onSuccess: (data) => {
      setSubmittedName(data.name);
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ email, name });
  };

  if (isLoading || helloLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{helloQuery.data?.message}</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Отправить
        </button>
      </form>
      <div>
        ✅ {data.message} — users in DB: {data.users}
      </div>
      {submittedName && (
        <p className="text-green-700">Имя обновлено: {submittedName}</p>
      )}

      {mutation.isSuccess && (
        <p className="text-green-600">{helloData.message}</p>
      )}

      {mutation.isError && (
        <p className="text-red-600">Ошибка: {mutation.error.message}</p>
      )}
    </main>
  );
}
