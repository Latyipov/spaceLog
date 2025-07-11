"use client";
import { Intro } from "@components/Intro";
import { Features } from "@components/Features";

export default function Home() {
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
