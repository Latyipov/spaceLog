"use client";
import { FC } from "react";

export const Features: FC = () => {
  return (
    <section className="py-20 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        <div className="p-6 bg-gray-900 rounded-xl shadow">
          <h3 className="text-2xl font-semibold text-blue-400 mb-2">
            🌠 Фото дня
          </h3>
          <p className="text-gray-400">
            Каждый день новое изображение Вселенной из базы NASA APOD.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl shadow">
          <h3 className="text-2xl font-semibold text-blue-400 mb-2">
            📓 Личные записи
          </h3>
          <p className="text-gray-400">
            Сохраняй избранные фото, добавляй комментарии и теги.
          </p>
        </div>
        <div className="p-6 bg-gray-900 rounded-xl shadow">
          <h3 className="text-2xl font-semibold text-blue-400 mb-2">
            🔒 Авторизация
          </h3>
          <p className="text-gray-400">
            Вход по email или через Google. Данные сохраняются в облаке.
          </p>
        </div>
      </div>
    </section>
  );
};
