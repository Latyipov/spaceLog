"use client";

import { useState } from "react";
import "react-day-picker/style.css";
import { ApodByDate } from "@components/ApodByDate";
import { ApodByRange } from "@components/ApodByRange";
import { ApodByCount } from "@components/ApodByCount";
import { DataView } from "@/app/components/DataView";
import type { ApodData } from "@schemas";

export default function ApodPage() {
  const [activeTab, setActiveTab] = useState<"day" | "range" | "count">("day");
  const [dataCollection, setDataCollection] = useState<ApodData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tabs = [
    { id: "day", label: "By Day" },
    { id: "range", label: "By Range" },
    { id: "count", label: "By Count" },
  ] as const;

  return (
    <main className=" mx-auto  w-full md:w-[80%] flex-1 ">
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-4 md:gap-20 p-4 relative min-h-90">
        <div className="flex flex-row md:flex-col gap-2 md:gap-4 p-2 md:p-4 bg-gray-900 rounded-xl shadow-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition text-sm md:text-base
          ${
            activeTab === tab.id
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-300 hover:text-white hover:bg-gray-700"
          }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === "day" && (
          <ApodByDate
            data={dataCollection}
            setData={setDataCollection}
            setLoading={setLoading}
            setError={setError}
          />
        )}
        {activeTab === "range" && (
          <ApodByRange
            setData={setDataCollection}
            setLoading={setLoading}
            setError={setError}
          />
        )}
        {activeTab === "count" && (
          <ApodByCount
            setData={setDataCollection}
            setLoading={setLoading}
            setError={setError}
          />
        )}
      </div>
      <h1 className="text-3xl text-center font-bold">
        NASA - Astronomy Picture of the Day
      </h1>
      <DataView
        dataCollection={dataCollection}
        loading={loading}
        error={error}
        type={"apod"}
      />
    </main>
  );
}
