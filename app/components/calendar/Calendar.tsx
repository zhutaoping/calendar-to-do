"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DaysContent from "./DaysContent";
import { useDay } from "../../store/DayContext";

export default function Calendar() {
  const [isSelected, setIsSelected] = useState(false);
  const { today, setToday, setActiveDate } = useDay();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const yearAndMonth = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const handleChevronLeft = () => {
    setIsSelected(false);
    setToday(new Date(today.getFullYear(), today.getMonth() - 1));
    setActiveDate(null);
  };

  const handleChevronRight = () => {
    setIsSelected(false);
    setToday(new Date(today.getFullYear(), today.getMonth() + 1));
    setActiveDate(null);
  };

  const handleNextDays = (day: number) => {
    setToday(new Date(today.getFullYear(), today.getMonth() + 1, day));
    setIsSelected(true);
  };

  const handleLastDays = (day: number) => {
    setToday(new Date(today.getFullYear(), today.getMonth() - 1, day));
    setIsSelected(true);
  };

  return (
    <div className="calendar relative col-span-1 mx-auto my-2 min-w-max rounded-md bg-white md:min-w-fit ">
      <div className="text-textOnPrimary flex items-center justify-between px-8 py-8">
        <button
          onClick={handleChevronLeft}
          className="p-2 text-sm hover:bg-borderDays active:scale-95"
        >
          <FaChevronLeft />
        </button>
        <h4 className="py-2 text-sm">{yearAndMonth}</h4>
        <button
          onClick={handleChevronRight}
          className="p-2 text-sm hover:bg-borderDays active:scale-95"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
      <div className="grid grid-cols-7 px-8">
        {days.map((day) => (
          <div key={day} className="day text-center text-xs">
            {day}
          </div>
        ))}
      </div>
      <DaysContent
        today={today}
        handleNextDays={handleNextDays}
        handleLastDays={handleLastDays}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <footer className="flex justify-between px-8 pb-4">
        <div className="text-xs">placeholder</div>
        <button
          className="select-none rounded-sm border border-primary px-2 py-1 text-xs text-primary transition hover:bg-primary hover:text-white active:scale-95"
          onClick={() => {
            setToday(new Date());
            setActiveDate(new Date());
            setIsSelected(true);
          }}
        >
          Today
        </button>
      </footer>
    </div>
  );
}
