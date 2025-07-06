"use client";

import { useState } from "react";
import Image from "next/image";
import { getApodByDateRange } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker, DateRange } from "react-day-picker";
import { useApi } from "@client/features/useApi";
import "react-day-picker/style.css";
import { Loading } from "@components/Loading/Loading";
import { subDays } from "date-fns";

export function ApodByRange() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 2),
    to: new Date(),
  });

  const { data, loading, error, fetchData } = useApi<ApodData[]>({
    fetcher: () => {
      if (dateRange?.from && dateRange?.to) {
        return getApodByDateRange({
          start: dateRange.from,
          end: dateRange.to,
        });
      }
      return Promise.resolve([]);
    },
    deps: [dateRange?.from, dateRange?.to],
  });

  return (
    <>
      <div>
        <DayPicker
          mode="range"
          selected={dateRange}
          onSelect={(range) => {
            if (range) setDateRange(range);
          }}
          max={30}
          startMonth={new Date(1995, 5)}
          endMonth={new Date()}
          disabled={{ after: new Date() }}
        />
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
