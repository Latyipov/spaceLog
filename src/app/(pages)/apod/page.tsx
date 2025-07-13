"use client";

import { useState } from "react";
import "react-day-picker/style.css";
import { ApodByDate } from "@components/ApodByDate";
import { ApodByRange } from "@components/ApodByRange";
import { ApodByCount } from "@components/ApodByCount";
import { ApodDataView } from "@components/ApodDataView";
import type { ApodData } from "@schemas";

export default function ApodPage() {
  const [activeTab, setActiveTab] = useState<"day" | "range" | "count">("day");
  const [data, setData] = useState<ApodData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log(data);
  return (
    <main className=" mx-auto  w-full md:w-[80%] ">
      <h1 className="text-3xl text-center font-bold">
        NASA - Astronomy Picture of the Day
      </h1>
      <div className="flex flex-raw justify-evenly aligin-center gap-4 p-4 relative">
        <div className="flex flex-col gap-4 p-4">
          <button
            className={
              activeTab === "day" ? "font-bold border-b-2 border-black" : ""
            }
            onClick={() => setActiveTab("day")}
          >
            By Day
          </button>
          <button
            className={
              activeTab === "range" ? "font-bold border-b-2 border-black" : ""
            }
            onClick={() => setActiveTab("range")}
          >
            By Range
          </button>
          <button
            className={
              activeTab === "count" ? "font-bold border-b-2 border-black" : ""
            }
            onClick={() => setActiveTab("count")}
          >
            By Count
          </button>
        </div>
        <div className="">
          {activeTab === "day" && (
            <ApodByDate
              setData={setData}
              setLoading={setLoading}
              setError={setError}
            />
          )}
          {activeTab === "range" && (
            <ApodByRange
              setData={setData}
              setLoading={setLoading}
              setError={setError}
            />
          )}
          {activeTab === "count" && (
            <ApodByCount
              setData={setData}
              setLoading={setLoading}
              setError={setError}
            />
          )}
        </div>
      </div>
      <ApodDataView data={data} loading={loading} error={error} />
    </main>
  );
}
