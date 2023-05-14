import { ReactNode, createContext, useContext, useMemo, useState } from "react";

const useDayStore = () => {
  const [dayInView, setDayInView] = useState(new Date());
  const [activeDate, setActiveDate] = useState<Date | null>(new Date());

  return {
    dayInView,
    setDayInView,
    activeDate,
    setActiveDate,
  };
};

export type DayContextType = ReturnType<typeof useDayStore>;

// null doesn't make sense here
const DayContext = createContext<DayContextType>({} as DayContextType);

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
