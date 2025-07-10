"use client";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="text-center py-8 text-gray-500 text-sm bg-black border-t border-gray-800">
      &copy; {new Date().getFullYear()} NASA Log — сделано с любовью к звёздам
      ✨
    </footer>
  );
};
