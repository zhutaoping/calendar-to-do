"use client";

import { format } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import EventList from "./EventList";
import AddEvent from "./AddEvent";

export default function EventsBoard() {
  const { activeDate } = useDay();

  const dayOfWeek = activeDate
    ? format(activeDate, "EEEE")
    : format(new Date(), "EEEE");

  const dayOfMonth = activeDate
    ? format(activeDate, "d MMMM yyyy")
    : format(new Date(), "d MMMM yyyy");

  return (
    <div className="right-board relative col-span-1 flex min-h-full flex-col justify-between p-4 md:mt-0 md:h-fit md:pl-10 lg:pl-12">
      <div className=" flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xl text-white">{dayOfWeek}</span>
          <span className="text-sm text-textOnCalendar">{dayOfMonth}</span>
        </div>
        <section className="event-list w-full self-start text-xl text-textOnCalendar md:max-h-[420px] md:overflow-y-auto">
          <EventList activeDate={activeDate} />
        </section>
      </div>
      <AddEvent />
    </div>
  );
}