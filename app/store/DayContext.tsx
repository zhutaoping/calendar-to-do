"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";

const useDayStore = () => {
  const [today, setToday] = useState(new Date());
  const [activeDate, setActiveDate] = useState<Date | null>(null);

  return {
    today,
    setToday,
    activeDate,
    setActiveDate,
  };
};

const DayContext = createContext<ReturnType<typeof useDayStore> | null>(null);

export const DayProvider = ({ children }: { children: ReactNode }) => {
  const dayStore = useDayStore();

  return <DayContext.Provider value={dayStore}>{children}</DayContext.Provider>;
};

export const useDay = () => {
  const context = useContext(DayContext);

  if (!context) {
    throw new Error("useDay must be used within a DayProvider");
  }

  return context;
};
