"use client";

import { Header } from "@components/Header";
import { Footer } from "@components/Footer";
import { Intro } from "@components/Intro";
import { Features } from "@components/Features";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="bg-[url('/bg-main.jpg')] bg-cover flex-1">
        <Header />
        <Intro />
      </div>
      <Features />
      <Footer />
    </main>
  );
}
