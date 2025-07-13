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
  const [count, setCount] = useState(5);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await getApodByCount(count);
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <label className="text-lg font-medium">
          Get
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={1}
            max={20}
            className="ml-4 w-20 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />{" "}
          random APODs
        </label>
        <br />
        <button
          onClick={fetchData}
          className="px-6 py-2 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Apply
        </button>
      </div>
    </>
  );
}
