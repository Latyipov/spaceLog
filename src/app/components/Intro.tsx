"use client";
import { FC } from "react";

export const Intro: FC = () => {
  return (
    <section className=" relative flex flex-col items-center text-center py-24 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10 bg-[url('/space-bg.jpg')] bg-cover bg-center"></div>
      <div className="relative z-10 max-w-3xl">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-white leading-tight">
          Космос каждый день
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Открой Вселенную с помощью изображений NASA и веди личный космический
          дневник.
        </p>
        <a
          href="/nasa/apod"
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl text-lg hover:bg-blue-700 transition"
        >
          Смотреть Фото Дня
        </a>
      </div>
    </section>
  );
};
