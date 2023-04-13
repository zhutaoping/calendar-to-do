import React, { memo, useEffect, useMemo } from "react";
import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import DayItem from "./DayItem";
import { getEvents } from "@/app/lib/eventApi";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@prisma/client";

interface Props {
  handleNextDays: (day: number) => void;
  handleLastDays: (day: number) => void;
  isSelected: boolean;
  setIsSelected: (value: boolean) => void;
}

export default function DaysContent({
  handleNextDays,
  handleLastDays,
  isSelected,
  setIsSelected,
}: Props) {
  const { dayInView, activeDate, setActiveDate } = useDay();

  const { data } = useQuery(["events"], getEvents);
  const events = data as Event[];

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

  const lastMonthFilter = useMemo(() => {
    const filteredEvents = events?.filter(
      (event) =>
        event.month === dayInView.getMonth() &&
        event.year === dayInView.getFullYear()
    );
    return filteredEvents?.map((event) => event.day);
  }, [dayInView, events]);

  const thisMonthFilter = useMemo(() => {
    const filteredEvents = events?.filter(
      (event) =>
        event.month === dayInView.getMonth() + 1 &&
        event.year === dayInView.getFullYear()
    );
    return filteredEvents?.map((event) => event.day);
  }, [dayInView, events]);

  const nextMonthFilter = useMemo(() => {
    const filteredEvents = events?.filter(
      (event) =>
        event.month === dayInView.getMonth() + 2 &&
        event.year === dayInView.getFullYear()
    );
    return filteredEvents?.map((event) => event.day);
  }, [dayInView, events]);

  let content = [];
  // last month
  for (let i = lastDaysInMonth - startDay; i < lastDaysInMonth; i++) {
    let hasEvent = false;
    if (lastMonthFilter && lastMonthFilter.includes(i + 1)) {
      hasEvent = true;
    }

    content.push(
      <div
        onClick={() => handleLastDaysClick(i + 1)}
        key={i}
        className={`day other-day text-xs text-otherDays ${
          hasEvent ? "hasEvent" : ""
        }`}
      >
        {i + 1}
      </div>
    );
  }
  // this month
  for (let i = 0; i < daysInMonth; i++) {
    content.push(
      <DayItem
        key={i + 32}
        i={i}
        isSelected={isSelected}
        thisMonthFilter={thisMonthFilter}
      />
    );
  }
  // next month
  for (let i = 0; i < 6 - endDay; i++) {
    let hasEvent = false;
    if (nextMonthFilter && nextMonthFilter.includes(i + 1)) {
      hasEvent = true;
    }

    content.push(
      <div
        onClick={() => handleNextDaysClick(i + 1)}
        key={i + 90}
        className={`day other-day text-xs text-otherDays ${
          hasEvent ? "hasEvent" : ""
        }`}
      >
        {i + 1}
      </div>
    );
  }

  return <div className="days grid grid-cols-7 px-8 py-4">{content}</div>;
}
