import { ReactNode, createContext, useContext, useMemo, useState } from "react";

export const useDayStore = () => {
  const [dayInView, setDayInView] = useState(new Date());
  const [activeDate, setActiveDate] = useState<Date | null>(new Date());

  return {
    dayInView,
    setDayInView,
    activeDate,
    setActiveDate,
  };
};

export type DayStoreState = ReturnType<typeof useDayStore>;

const DayContext = createContext<DayStoreState | null>(null);

const DayProvider = ({ children }: { children: ReactNode }) => {
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

export default DayProvider;
