"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import { getApodByCount } from "@nasaApi";
import type { ApodData } from "@schemas";

type ApodByCountPropsType = {
  setData: Dispatch<SetStateAction<ApodData[] | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};

export function ApodByCount({
  setData,
  setLoading,
  setError,
}: ApodByCountPropsType) {
  const [count, setCount] = useState<string>("");

  const parsedCount = parseInt(count || "0", 10);
  const isValidCount = parsedCount >= 1 && parsedCount <= 20;

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await getApodByCount(parsedCount);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCount(value);
    }
  };

  return (
    <div className="space-y-4 max-w-md">
      <label className="text-lg font-medium flex flex-col sm:flex-row items-start sm:items-center gap-2">
        Get
        <input
          type="text"
          inputMode="numeric"
          value={count}
          onChange={handleChange}
          placeholder="1–20"
          className="w-24 px-3 py-2 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 text-white placeholder:text-gray-500"
        />
        random APODs
      </label>

      <button
        onClick={fetchData}
        disabled={!isValidCount}
        className="block mx-auto px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Apply
      </button>
    </div>
  );
}
