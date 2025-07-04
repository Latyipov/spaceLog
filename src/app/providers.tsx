"use client";

import { trpcApi } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  const trpcClient = trpcApi.createClient({
    links: [
      httpBatchLink({
        url: "/api/trpc",
      }),
    ],
  });

  return (
    <SessionProvider>
      <trpcApi.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </trpcApi.Provider>
    </SessionProvider>
  );
}
