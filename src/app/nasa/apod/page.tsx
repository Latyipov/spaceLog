"use client";

import { useEffect, useState } from "react";
import { getApod } from "@nasaApi";
import type { ApodData } from "@schemas";

export default function ApodPage() {
  const [data, setData] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApod = async () => {
      setLoading(true);
      setError(null);
      try {
        const apodData = await getApod();
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
  }, []);

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">
        NASA APOD — Astronomy Picture of the Day
      </h1>

      {loading && <p>Загрузка...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{data.title}</h2>
          <p className="text-sm text-gray-500">{data.date}</p>

          {data.media_type === "image" ? (
            <img
              src={data.url}
              alt={data.title}
              className="rounded shadow max-w-full"
            />
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
