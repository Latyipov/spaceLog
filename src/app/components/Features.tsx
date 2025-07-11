"use client";
import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

export const Features: FC = () => {
  return (
    <section className="py-20 px-6  w-full md:w-[80%] mx-auto">
      <div className="max-w-6xl mx-auto flex flex-wrap flex-row justify-around md:grid-cols-3 gap-12 text-center">
        <Link
          href={"/apod"}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-xl transform hover:scale-[1.02] transition duration-300 w-64"
        >
          <Image
            src="/apod-features.jpg"
            alt="apod"
            className="w-full h-48 object-cover rounded-t-xl"
            width={800}
            height={500}
          />
          <div className="p-4 text-center">
            <h3 className="text-blue-400 font-bold text-lg flex items-center justify-center gap-2">
              🌌 Astronomy Picture of the Day
            </h3>
          </div>
        </Link>

        <Link
          href={"/mars"}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-xl transform hover:scale-[1.02] transition duration-300 w-64"
        >
          <Image
            src="/mars-features.jpg"
            alt="mars"
            className="w-full h-48 object-cover rounded-t-xl"
            width={400}
            height={400}
          />
          <div className="p-4 text-center">
            <h3 className="text-blue-400 font-bold text-lg flex items-center justify-center gap-2">
              🛰️ Mars Rover Photos
            </h3>
          </div>
        </Link>

        <Link
          href={"/*"}
          className="bg-gray-900 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2)] rounded-xl transform hover:scale-[1.02] transition duration-300 w-64"
        >
          <Image
            src="/space-log-features.jpg"
            alt="space-log"
            className="w-full h-48 object-cover rounded-t-xl"
            width={400}
            height={400}
          />
          <div className="p-4 text-center">
            <h3 className="text-blue-400 font-bold text-lg flex items-center justify-center gap-2">
              📓 Your Space Log
            </h3>
          </div>
        </Link>
      </div>
    </section>
  );
};
