"use client";
import { FC } from "react";
import Image from "next/image";

export const Header: FC = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4">
      <div className="flex items-center space-x-3">
        <Image src="nasa-logo.svg" alt="NASA Logo" width={80} height={80} />
      </div>

      <nav className="flex items-center space-x-6">
        <a href="#apod" className="hover:text-blue-300 transition">
          APOD
        </a>
        <a href="#mars" className="hover:text-blue-300 transition">
          Mars
        </a>
        <a href="#profile" className="hover:text-blue-300 transition">
          Профиль
        </a>
        <a
          href="/auth"
          className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition"
        >
          Войти
        </a>
      </nav>
    </header>
  );
};
