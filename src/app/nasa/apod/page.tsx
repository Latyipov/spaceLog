"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getApodByDate } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Loading } from "@components/Loading/Loading";

export default function ApodPage() {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date>();

  useEffect(() => {
    const fetchApod = async () => {
      setLoading(true);
      setError(null);
      try {
        const apodData = await getApodByDate(selectedDay || new Date());
        console.log(apodData);
        setData(apodData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown Error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchApod();
  }, [selectedDay]);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        NASA APOD — Astronomy Picture of the Day
      </h1>
      <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(day) => {
            console.log(day);
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
        <div className="space-y-4">
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
        </div>
      )}
    </main>
  );
}
