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
    <div className="todo-list relative col-span-1 flex min-h-full flex-col justify-between p-4 md:h-fit md:pl-12">
      <div className=" flex flex-col gap-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xl text-white">{dayOfWeek}</span>
          <span className="text-sm text-textOnCalendar">{dayOfMonth}</span>
        </div>
        <section className="self-start p-2 text-xl text-textOnCalendar">
          <EventList activeDate={activeDate} />
        </section>
      </div>
      <AddEvent />
    </div>
  );
}
