"use client";

import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { getApodByDate } from "@nasaApi";
import type { ApodData } from "@schemas";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type ApodByDatePropsType = {
  data: ApodData[] | null;
  setData: Dispatch<SetStateAction<ApodData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export function ApodByDate({
  data,
  setData,
  setLoading,
  setError,
}: ApodByDatePropsType) {
  const [selectedDay, setSelectedDay] = useState<Date>();
  const initialLoaded = useRef(false);

  useEffect(() => {
    const isFirstLoading = !initialLoaded.current && !data?.length;
    if (!isFirstLoading && !selectedDay) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setData(null);
      try {
        const result = await getApodByDate(selectedDay || new Date());
        setData([result]);
        initialLoaded.current = true;
      } catch (err: unknown) {
        console.log(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDay]);

  return (
    <div className="rdp-wrapper">
      <DayPicker
        mode="single"
        selected={selectedDay}
        onSelect={(day) => {
          if (day) setSelectedDay(day);
        }}
        startMonth={new Date(1995, 5)}
        endMonth={new Date()}
        disabled={{ after: new Date() }}
        modifiersClassNames={{
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
  );
}
