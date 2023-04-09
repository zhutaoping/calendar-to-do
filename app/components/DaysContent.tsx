"use client";

import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { MouseEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

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
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  useEffect(() => {
    setSelectedDate(null);
  }, [today]);

  useEffect(() => {
    if (selectedDate) {
      setIsSelected(false);
    }
  }, [selectedDate, setIsSelected]);

  let now = today;
  // if (new Date().getMonth() === today.getMonth()) {
  //   now = new Date();
  // }

  const daysInMonth = getDaysInMonth(now);
  const startDay = startOfMonth(now).getDay();
  const endDay = endOfMonth(now).getDay();

  const lastDaysInMonth = getDaysInMonth(
    new Date(now.getFullYear(), now.getMonth() - 1, 1)
  );

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLElement;
    setSelectedDate(parseInt(element.innerText));
  };

  const content = [];
  for (let i = lastDaysInMonth - startDay; i < lastDaysInMonth; i++) {
    content.push(
      <div
        onClick={() => handleLastDays(i + 1)}
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
      new Date().getMonth() === now.getMonth();

    let isActive = false;
    if (selectedDate) {
      isActive = i + 1 === selectedDate;
    }
    if (isSelected && i + 1 === now.getDate()) {
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
        onClick={() => handleNextDays(i + 1)}
        key={uuid()}
        className="day flex items-center justify-center text-xs text-otherDays"
      >
        {i + 1}
      </div>
    );
  }

  return <div className="days grid grid-cols-7 px-8 py-4">{content}</div>;
}
