"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import DaysContent from "./DaysContent";
import { useDay } from "../../store/DayContext";
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
    // setIsSelected(false);
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() - 1));
  };

  const handleChevronRight = () => {
    // setIsSelected(false);
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() + 1));
  };

  const handleNextDays = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() + 1, day)
    );
    setIsSelected(true);
  };

  const handleLastDays = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, day)
    );
    setIsSelected(true);
  };

  return (
    <div className="calendar relative col-span-1 mx-auto my-2 min-w-max rounded-md bg-white md:min-w-fit ">
      <div className="text-textOnPrimary flex items-center justify-between px-8 py-8">
        <button
          onClick={handleChevronLeft}
          className="focus-ring rounded p-2 text-sm hover:bg-borderDays active:scale-95"
        >
          <FaChevronLeft />
        </button>
        <h4 className="py-2 text-sm">{yearAndMonth}</h4>
        <button
          onClick={handleChevronRight}
          className="focus-ring p-2 text-sm hover:bg-borderDays active:scale-95"
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
        dayInView={dayInView}
        handleNextDays={handleNextDays}
        handleLastDays={handleLastDays}
        isSelected={isSelected}
        setIsSelected={setIsSelected}
      />
      <footer className="flex justify-between gap-24 px-8 pb-4 lg:gap-36">
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