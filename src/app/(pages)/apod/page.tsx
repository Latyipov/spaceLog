"use client";

import { useState } from "react";
import "react-day-picker/style.css";
import { ApodByDate } from "@components/ApodByDate";
import { ApodByRange } from "@components/ApodByRange";
import { ApodByCount } from "@components/ApodByCount";

export default function ApodPage() {
  const [activeTab, setActiveTab] = useState<"day" | "range" | "count">("day");

  return (
    <main className=" mx-auto  w-full md:w-[80%] ">
      <h1 className="text-3xl text-center font-bold">
        NASA - Astronomy Picture of the Day
      </h1>
      <div className="flex gap-4 border-b pb-2">
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
      <div className="mt-6">
        {activeTab === "day" && <ApodByDate />}
        {activeTab === "range" && <ApodByRange />}
        {activeTab === "count" && <ApodByCount />}
      </div>
    </main>
  );
}
