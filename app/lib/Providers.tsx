"use client";

import QueryClientProvider from "./QueryProvider";
import DayProvider from "../store/DayContext";
import { SessionProvider } from "next-auth/react";

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
