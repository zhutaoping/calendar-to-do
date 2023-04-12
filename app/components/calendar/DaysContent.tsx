import React, { useEffect } from "react";
import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import DayItem from "./DayItem";

interface Props {
  dayInView: Date;
  handleNextDays: (day: number) => void;
  handleLastDays: (day: number) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

export default function DaysContent({
  dayInView,
  handleNextDays,
  handleLastDays,
  isSelected,
  setIsSelected,
}: Props) {
  const { activeDate, setActiveDate } = useDay();

  // prevent multiple active date
  useEffect(() => {
    if (!isSelected) return;

    if (activeDate) {
      setIsSelected(false);
    }
  }, [activeDate, setIsSelected, isSelected]);

  const daysInMonth = getDaysInMonth(dayInView);
  const startDay = startOfMonth(dayInView).getDay();
  const endDay = endOfMonth(dayInView).getDay();

  const lastDaysInMonth = getDaysInMonth(
    new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, 1)
  );

  function handleLastDaysClick(day: number) {
    handleLastDays(day);
    setActiveDate(
      new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, day)
    );
  }
  function handleNextDaysClick(day: number) {
    handleNextDays(day);
    setActiveDate(
      new Date(dayInView.getFullYear(), dayInView.getMonth() + 1, day)
    );
  }

  let content = [];
  for (let i = lastDaysInMonth - startDay; i < lastDaysInMonth; i++) {
    content.push(
      <div
        onClick={() => handleLastDaysClick(i + 1)}
        key={i}
        className="day flex items-center justify-center text-xs text-otherDays"
      >
        {i + 1}
      </div>
    );
  }
  for (let i = 0; i < daysInMonth; i++) {
    content.push(<DayItem key={i + 32} i={i} isSelected={isSelected} />);
  }
  for (let i = 0; i < 6 - endDay; i++) {
    content.push(
      <div
        onClick={() => handleNextDaysClick(i + 1)}
        key={i + 90}
        className="day events flex items-center justify-center text-xs text-otherDays"
      >
        {i + 1}
      </div>
    );
  }

  return <div className="days grid grid-cols-7 px-8 py-4">{content}</div>;
}
