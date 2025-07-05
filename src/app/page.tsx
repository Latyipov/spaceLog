"use client";

import { trpcApi } from "@/utils/trpc";
import Link from "next/link";
import { SignInButton } from "@components/SignInButton";
import { Loading } from "@components/Loading/Loading";

export default function Home() {
  const helloQuery = trpcApi.example.hello.useQuery();

  // const { data, isLoading, error } = trpcApi.health.dbOk.useQuery();

  // if (isLoading) return <Loading />;
  // if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-4 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">{helloQuery.data?.message}</h1>

      {/* <div>
        ✅ {data?.message} — users in DB: {data?.users}
      </div> */}

      <Link href="/nasa/apod" className="text-blue-600 underline">
        Посмотреть APOD
      </Link>
      <br />
      <SignInButton />
      <br />
      <Link href="/signup" className="text-blue-600 underline">
        Registrate
      </Link>
    </main>
  );
}
