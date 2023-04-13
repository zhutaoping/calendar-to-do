import { useDay } from "@/app/store/DayContext";
import { MouseEvent, useEffect, useState } from "react";

interface Props {
  i: number;
  isSelected: boolean;
  thisMonthFilter: number[];
}

const DayItem = ({ i, isSelected, thisMonthFilter }: Props) => {
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
      i + 1 === activeDate.getDate() &&
      activeDate.getMonth() === dayInView.getMonth() &&
      activeDate.getFullYear() === dayInView.getFullYear()
    ) {
      setIsActive(true);
    }
    if (
      isSelected &&
      i + 1 === dayInView.getDate() &&
      activeDate.getMonth() === dayInView.getMonth() &&
      activeDate.getFullYear() === dayInView.getFullYear()
    ) {
      setIsActive(true);
    }
  }, [activeDate, isSelected, dayInView, i]);

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
  let hasEvent = false;
  if (thisMonthFilter && thisMonthFilter.includes(i + 1)) {
    hasEvent = true;
  }

  return (
    <div
      onClick={handleClick}
      className={`day text-primary transition  hover:bg-primary hover:text-white ${
        isToday ? "text-xl font-bold" : "text-xs"
      } ${isActive ? "active" : ""} ${hasEvent ? "hasEvent" : ""}`}
    >
      {i + 1}
    </div>
  );
};

export default DayItem;
