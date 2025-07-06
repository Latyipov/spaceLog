"use client";

import { useState } from "react";
import Image from "next/image";
import { getApodByDate } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Loading } from "@components/Loading/Loading";
import { useApi } from "@client/features/useApi";

export function ApodByDate() {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const { data, loading, error } = useApi<ApodData>({
    fetcher: () => getApodByDate(selectedDay || new Date()),
    deps: [selectedDay],
    auto: true,
  });

  return (
    <>
      <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(day) => {
            if (day) setSelectedDay(day);
          }}
          startMonth={new Date(1995, 5)}
          endMonth={new Date()}
          disabled={{ after: new Date() }}
        />
      </div>
      {loading && <Loading />}
      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-sm text-gray-500">{data.date}</p>

          {data.media_type === "image" ? (
            <div className="relative aspect-[4/3]">
              <Image
                src={data.url}
                alt={data.title}
                fill
                className="object-cover rounded shadow"
              />
            </div>
          ) : (
            <iframe
              src={data.url}
              title={data.title}
              allowFullScreen
              className="w-full aspect-video rounded"
            />
          )}

          <p className="text-justify">{data.explanation}</p>
        </section>
      )}
    </>
  );
}
