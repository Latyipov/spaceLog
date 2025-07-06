import { useEffect, useState, useCallback } from "react";

type UseApiProps<T> = {
  fetcher: () => Promise<T>;
  deps?: unknown[];
  auto?: boolean;
};

export function useApi<T>({
  fetcher,
  deps = [],
  auto = false,
}: UseApiProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    if (auto) {
      fetchData();
    }
  }, deps);

  return { data, loading, error, fetchData };
}
