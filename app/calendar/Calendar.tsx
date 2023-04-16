"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DaysContent from "./DaysContent";
import { useDay } from "@/app/store/DayContext";
import SelectMonth from "./SelectMonth";

export default function Calendar() {
  const [isSelected, setIsSelected] = useState(false);
  const { dayInView, setDayInView, setActiveDate } = useDay();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const yearAndMonth = dayInView.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const handleChevronLeft = () => {
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() - 1));
  };

  const handleChevronRight = () => {
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() + 1));
  };

  const handleDaysOfNextMonth = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() + 1, day)
    );
    setIsSelected(true);
  };

  const handleDaysOfLastMonth = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, day)
    );
    setIsSelected(true);
  };

  return (
    <div className="calendar relative col-span-1 mx-auto my-4 min-w-max rounded-md bg-white p-6 md:my-4 md:ml-4 md:min-w-fit">
      <div className="text-textOnPrimary flex items-center justify-between">
        <button
          onClick={handleChevronLeft}
          className="focus-ring rounded p-2 text-sm hover:bg-borderDays active:scale-95"
        >
          <FaChevronLeft />
        </button>
        <h4 className="text-sm">{yearAndMonth}</h4>
        <button
          onClick={handleChevronRight}
          className="focus-ring p-2 text-sm hover:bg-borderDays active:scale-95"
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
      <div className="grid grid-cols-7 px-4 md:py-3">
        {days.map((day) => (
          <div key={day} className="day text-center text-xs">
            {day}
          </div>
        ))}
      </div>
      <DaysContent
        handleDaysOfNextMonth={handleDaysOfNextMonth}
        handleDaysOfLastMonth={handleDaysOfLastMonth}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <footer className="flex justify-between gap-24 px-4 md:pt-2 lg:gap-36">
        <div className="relative z-50 flex-1 text-xs">
          <SelectMonth />
        </div>
        <button
          className="focus-ring select-none !rounded-lg border border-primary px-2 py-1 text-xs text-primary shadow-md transition hover:bg-primary hover:text-white focus-visible:border-orange-300 focus-visible:ring-offset-1 active:scale-95"
          onClick={() => {
            setDayInView(new Date());
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
