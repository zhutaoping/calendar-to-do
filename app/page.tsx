"use client";

import BlackBoard from "./components/BlackBoard";
import { DayProvider } from "./store/DayContext";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DayProvider>
        <main>
          <BlackBoard />
        </main>
      </DayProvider>
    </QueryClientProvider>
  );
}
