import React, { MouseEvent, memo, useEffect, useState } from "react";
import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { v4 as uuid } from "uuid";
import DayItem from "./DayItem";
import { useDay } from "@/app/store/DayContext";

interface Props {
  today: Date;
  handleNextDays: (day: number) => void;
  handleLastDays: (day: number) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

export default function DaysContent({
  today,
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

  const daysInMonth = getDaysInMonth(today);
  const startDay = startOfMonth(today).getDay();
  const endDay = endOfMonth(today).getDay();

  const lastDaysInMonth = getDaysInMonth(
    new Date(today.getFullYear(), today.getMonth() - 1, 1)
  );

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;
    setActiveDate(
      new Date(today.getFullYear(), today.getMonth(), +element.innerText)
    );
  };

  function handleLastDaysClick(day: number) {
    handleLastDays(day);
    setActiveDate(new Date(today.getFullYear(), today.getMonth(), day));
  }
  function handleNextDaysClick(day: number) {
    handleNextDays(day);
    setActiveDate(new Date(today.getFullYear(), today.getMonth(), day));
  }

  let content = [];
  for (let i = lastDaysInMonth - startDay; i < lastDaysInMonth; i++) {
    content.push(
      <div
        onClick={() => handleLastDaysClick(i + 1)}
        key={uuid()}
        className="day flex items-center justify-center text-xs text-otherDays"
      >
        {i + 1}
      </div>
    );
  }
  for (let i = 0; i < daysInMonth; i++) {
    const isToday =
      new Date().getDate() === i + 1 &&
      new Date().getMonth() === today.getMonth() &&
      new Date().getFullYear() === today.getFullYear();

    // days in current month
    let isActive = false;
    if (activeDate) {
      isActive = i + 1 === activeDate.getDate();
    }

    // change to other month
    if (isSelected && i + 1 === today.getDate()) {
      isActive = true;
    }

    content.push(
      <div
        key={uuid()}
        onClick={handleClick}
        className={`day flex h-[40px] w-[40px] items-center justify-center text-primary transition hover:bg-primary hover:text-white md:h-[50px] md:w-[50px] ${
          isToday ? "text-xl font-bold" : "text-xs"
        } ${isActive ? "active" : ""}`}
      >
        {i + 1}
      </div>
    );
  }

  for (let i = 0; i < 6 - endDay; i++) {
    content.push(
      <div
        onClick={() => handleNextDaysClick(i + 1)}
        key={uuid()}
        className="day flex items-center justify-center text-xs text-otherDays"
      >
        {i + 1}
      </div>
    );
  }

  return <div className="days grid grid-cols-7 px-8 py-4">{content}</div>;
}
