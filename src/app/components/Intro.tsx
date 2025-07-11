"use client";
import { FC } from "react";
import Link from "next/link";

export const Intro: FC = () => {
  return (
    <section className="flex flex-col items-center text-center py-24 px-6 overflow-hidden mt-[100px]">
      <div className="z-10 max-w-3xl">
        <h2 className="text-5xl z-10 md:text-6xl font-extrabold mb-4 text-white leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Space Every Day
        </h2>
        <p className="text-xl mb-8 z-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          Discover the universe with NASA images and keep your personal space
          journal
        </p>
        <Link
          href="/apod"
          className=" inline-block text-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl text-[clamp(1rem,3vw,1.7rem)] hover:bg-blue-700 transition"
        >
          Explore the Photo of the Day
        </Link>
      </div>
    </section>
  );
};
