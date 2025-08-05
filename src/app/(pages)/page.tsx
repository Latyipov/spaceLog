"use client";
import { Intro } from "@components/Intro";
import { Features } from "@components/Features";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

export default function Home() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  useEffect(() => {
    if (message === "account-deleted") {
      toast.success("✅ Your account has been deleted.");
    }
  }, [message]);

  return (
    <main className="flex flex-col min-h-screen">
      <div className="relative bg-[url('/bg-main.jpg')] bg-cover flex-1 ">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <Intro />
      </div>
      <Features />
    </main>
  );
}
