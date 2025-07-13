"use client";

import type { ApodData } from "@schemas";
import { Loading } from "@components/Loading/Loading";
import Image from "next/image";

type ApodDataViewPropsType = {
  data: ApodData[] | null;
  loading: boolean;
  error: string | null;
};

export function ApodDataView({ data, loading, error }: ApodDataViewPropsType) {
  return (
    <>
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
