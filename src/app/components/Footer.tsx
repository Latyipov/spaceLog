"use client";
import Link from "next/link";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="text-center py-8 text-gray-500 text-sm bg-black border-t border-gray-800 ">
      <div className="flex justify-between w-[80%] mx-auto gap-6">
        <div>
          &copy; {new Date().getFullYear()} NASA Space Log — made with love for
          the stars ✨ Not affiliated with or endorsed by NASA. Images © NASA,
          used for educational purposes.{" "}
          <Link
            href="https://api.nasa.gov/"
            className="underline hover:text-blue-400"
          >
            NASA API
          </Link>
        </div>
      </div>
    </footer>
  );
};
