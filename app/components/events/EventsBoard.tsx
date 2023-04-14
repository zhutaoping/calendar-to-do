"use client";

import { format } from "date-fns";
import { useDay } from "../../store/DayContext";
import EventList from "./EventList";
import AddEvent from "./AddEvent";

export default function ToDoList() {
  const { activeDate } = useDay();

  const dayOfWeek = activeDate
    ? format(activeDate, "EEEE")
    : format(new Date(), "EEEE");

  const dayOfMonth = activeDate
    ? format(activeDate, "d MMMM yyyy")
    : format(new Date(), "d MMMM yyyy");

  return (
    <div className="right-board relative col-span-1 mx-8 mt-8 flex min-h-full flex-col justify-between p-4 md:mx-0 md:mt-0 md:h-fit md:pl-16 lg:pl-20">
      <div className=" flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xl text-white">{dayOfWeek}</span>
          <span className="text-sm text-textOnCalendar">{dayOfMonth}</span>
        </div>
        <section className="event-list max-h-[400px] w-full self-start overflow-y-auto text-xl text-textOnCalendar">
          <EventList activeDate={activeDate} />
        </section>
      </div>
      <AddEvent />
    </div>
  );
}
