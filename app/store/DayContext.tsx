"use client";

import { ReactNode, createContext, useContext, useMemo, useState } from "react";

const useDayStore = () => {
  const [dayInView, setDayInView] = useState(new Date());
  const [activeDate, setActiveDate] = useState<Date | null>(new Date());
  const [eventDay, setEventDay] = useState<EventDay | null>(null);
  const [hasEvent, setHasEvent] = useState(false);

  return {
    dayInView,
    setDayInView,
    activeDate,
    setActiveDate,
    eventDay,
    setEventDay,
    hasEvent,
    setHasEvent,
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
