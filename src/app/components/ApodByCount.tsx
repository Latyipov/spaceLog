"use client";

import { useState } from "react";
import Image from "next/image";
import { getApodByCount } from "@nasaApi";
import type { ApodData } from "@schemas";
import { useApi } from "@client/features/useApi";
import { Loading } from "@components/Loading/Loading";

export function ApodByCount() {
  const [count, setCount] = useState(5);

  const { data, loading, error, fetchData } = useApi<ApodData[]>({
    fetcher: () => getApodByCount(count),
    deps: [count],
  });

  return (
    <>
      <div>
        <label className="text-lg font-medium">
          Get
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={20}
            className="ml-4 w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />{" "}
          random APODs
        </label>
        <br />
        <button
          onClick={fetchData}
          className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>

      {loading && <Loading />}
      {error && <p className="text-red-600">{error}</p>}

      {data &&
        data.map((dailyData) => (
          <section key={dailyData.date} className="space-y-4">
            <h2 className="text-xl font-semibold">{dailyData.title}</h2>
            <p className="text-sm text-gray-500">{dailyData.date}</p>

            {dailyData.media_type === "image" ? (
              <div className="relative aspect-[4/3]">
                <Image
                  src={dailyData.url}
                  alt={dailyData.title}
                  fill
                  className="object-cover rounded shadow"
                />
              </div>
            ) : (
              <iframe
                src={dailyData.url}
                title={dailyData.title}
                allowFullScreen
                className="w-full aspect-video rounded"
              />
            )}
            <p className="text-justify">{dailyData.explanation}</p>
          </section>
        ))}
    </>
  );
}
