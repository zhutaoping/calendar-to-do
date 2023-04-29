"use client";

import QueryClientProvider from "./QueryProvider";
import { SessionProvider } from "next-auth/react";
import DayProvider from "../store/DayContext";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider>
      <SessionProvider>
        <DayProvider>{children}</DayProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
