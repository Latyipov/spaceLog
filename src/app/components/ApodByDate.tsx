"use client";

import { useState, useEffect, type Dispatch, type SetStateAction } from "react";
import { getApodByDate } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type ApodByDatePropsType = {
  setData: Dispatch<SetStateAction<ApodData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export function ApodByDate({
  setData,
  setLoading,
  setError,
}: ApodByDatePropsType) {
  const [selectedDay, setSelectedDay] = useState<Date>();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await getApodByDate(selectedDay || new Date());
        setData([result]);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDay]);

  return (
    <>
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={(day) => {
          if (day) setSelectedDay(day);
        }}
        startMonth={new Date(1995, 5)}
        endMonth={new Date()}
        disabled={{ after: new Date() }}
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
    </>
  );
}
