"use client";

import QueryClientProvider from "./QueryProvider";
import DayProvider from "../store/DayContext";

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