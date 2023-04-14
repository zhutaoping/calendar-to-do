"use client";

import QueryClientProvider from "./lib/QueryClientProvider";
import DayProvider from "./store/DayContext";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider>
      <DayProvider>{children}</DayProvider>
    </QueryClientProvider>
  );
}
