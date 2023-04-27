import { MouseEvent, useEffect, useState } from "react";
import { useDay } from "@/app/store/DayContext";
import { Event } from "@prisma/client";
import { checkHasEvent } from "@/app/utils/checkHasEvent";

interface Props {
  i: number;
  events: Event[] | null;
}

const DayItem = ({ i, events }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const { activeDate, setActiveDate, dayInView } = useDay();

  useEffect(() => {
    setIsToday(false);
    if (
      new Date().getDate() === i + 1 &&
      new Date().getMonth() === dayInView.getMonth() &&
      new Date().getFullYear() === dayInView.getFullYear()
    ) {
      setIsToday(true);
    }
  }, [dayInView, i]);

  useEffect(() => {
    setIsActive(false);
    if (!activeDate) return;

    if (
      activeDate.getDate() === i + 1 &&
      activeDate.getMonth() === dayInView.getMonth() &&
      activeDate.getFullYear() === dayInView.getFullYear()
    ) {
      setIsActive(true);
    }
  }, [activeDate, dayInView, i]);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    const element = e.target as HTMLDivElement;
    setActiveDate(
      new Date(
        dayInView.getFullYear(),
        dayInView.getMonth(),
        +element.innerText
      )
    );
  };
  const hasEvent = checkHasEvent(i, dayInView, events, 1);

  return (
    <div
      onClick={handleClick}
      className={`day text-primary hover:bg-primary hover:text-white ${
        isToday ? "text-lg font-bold" : "text-xs"
      } ${isActive ? "active" : ""} ${hasEvent ? "hasEvent" : ""}`}
    >
      {i + 1}
    </div>
  );
};

export default DayItem;
