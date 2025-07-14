"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { getApodByDateRange } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { subDays } from "date-fns";

type ApodByRangePropsType = {
  setData: Dispatch<SetStateAction<ApodData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export function ApodByRange({
  setData,
  setLoading,
  setError,
}: ApodByRangePropsType) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 2),
    to: new Date(),
  });

  const fetchData = async () => {
    if (!dateRange.from || !dateRange.to) {
      setError("Please select both start and end dates.");
      return;
    }
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await getApodByDateRange({
        start: dateRange.from,
        end: dateRange.to,
      });
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center ">
      <div className="rdp-wrapper">
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
          modifiersClassNames={{
            range_start: "bg-blue-600 text-white rounded-full",
            range_end: "bg-blue-600 text-white rounded-full",
            range_middle: "bg-blue-500/70 text-white",
            selected: "bg-blue-600 text-white rounded-full",
            disabled: "text-gray-500 cursor-not-allowed",
            today: "text-sky-300",
          }}
          styles={{
            day: {
              width: "30px",
              height: "30px",
              fontSize: "12px",
              lineHeight: "30px",
            },
            caption: { fontSize: "14px" },
          }}
        />
      </div>
      <button
        onClick={fetchData}
        disabled={!dateRange?.from || !dateRange?.to}
        className="cursor-pointer px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  );
}
