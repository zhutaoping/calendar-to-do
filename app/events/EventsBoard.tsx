"use client";

import { format } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import EventList from "./EventList";
import AddEvent from "./AddEvent";
import { useEffect, useState } from "react";

export default function EventsBoard() {
  const { activeDate } = useDay();
  const [smallScreen, setSmallScreen] = useState(false);

  const dayOfWeek = activeDate
    ? format(activeDate, "EEEE")
    : format(new Date(), "EEEE");

  const dayOfMonth = activeDate
    ? format(activeDate, "d MMMM yyyy")
    : format(new Date(), "d MMMM yyyy");

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  function handleResize() {
    if (window.innerWidth < 768) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  }

  return (
    <div className="right-board relative col-span-1 flex min-h-full flex-col justify-between">
      <div className="flex flex-col">
        <div className="flex items-baseline justify-between px-8 pt-4 md:px-10 md:py-6">
          <span className="text-xl text-white">{dayOfWeek}</span>
          <span className="text-sm text-textOnCalendar">{dayOfMonth}</span>
        </div>
        {smallScreen && <AddEvent />}
        <EventList activeDate={activeDate} />
      </div>
      {!smallScreen && <AddEvent />}
    </div>
  );
}
