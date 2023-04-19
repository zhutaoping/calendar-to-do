import { useQuery } from "@tanstack/react-query";
import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import { Event } from "@prisma/client";
import { getEvents } from "../../putAway/eventFetcher";
import { checkHasEvent } from "@/app/utils/checkHasEvent";
import DayItem from "./DayItem";

interface Props {
  handleDaysOfNextMonth: (day: number) => void;
  handleDaysOfLastMonth: (day: number) => void;
}

export default function DaysContent({
  handleDaysOfNextMonth,
  handleDaysOfLastMonth,
}: Props) {
  const { dayInView, setActiveDate } = useDay();

  const { data } = useQuery(["events"], getEvents);
  const events = data as Event[];

  const daysInMonth = getDaysInMonth(dayInView);
  const startDay = startOfMonth(dayInView).getDay();
  const endDay = endOfMonth(dayInView).getDay();

  const lastDaysInMonth = getDaysInMonth(
    new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, 1)
  );

  function handleDaysOfLastMonthClick(day: number) {
    handleDaysOfLastMonth(day);
    setActiveDate(
      new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, day)
    );
  }
  function handleDaysOfNextMonthClick(day: number) {
    handleDaysOfNextMonth(day);
    setActiveDate(
      new Date(dayInView.getFullYear(), dayInView.getMonth() + 1, day)
    );
  }

  let content = [];
  // Last month
  for (let i = lastDaysInMonth - startDay; i < lastDaysInMonth; i++) {
    const hasEvent = checkHasEvent(i, dayInView, events, 0);

    content.push(
      <div
        onClick={() => handleDaysOfLastMonthClick(i + 1)}
        key={i}
        className={`day other-day text-xs text-otherDays ${
          hasEvent ? "hasEvent" : ""
        }`}
      >
        {i + 1}
      </div>
    );
  }
  // This month
  for (let i = 0; i < daysInMonth; i++) {
    content.push(<DayItem key={i + 32} i={i} events={events} />);
  }
  // Next month
  for (let i = 0; i < 6 - endDay; i++) {
    const hasEvent = checkHasEvent(i, dayInView, events, 2);

    content.push(
      <div
        onClick={() => handleDaysOfNextMonthClick(i + 1)}
        key={i + 90}
        className={`day other-day text-xs text-otherDays ${
          hasEvent ? "hasEvent" : ""
        }`}
      >
        {i + 1}
      </div>
    );
  }

  return <div className="days grid grid-cols-7 px-4 pb-4">{content}</div>;
}
