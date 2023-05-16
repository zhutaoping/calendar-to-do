"use client";

import { SessionProvider } from "next-auth/react";
import { DayProvider } from "../stores/DayContext";
import QueryProvider from "./QueryProvider";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return (
    <QueryProvider>
      <SessionProvider>
        <DayProvider>{children}</DayProvider>
      </SessionProvider>
    </QueryProvider>
  );
}
