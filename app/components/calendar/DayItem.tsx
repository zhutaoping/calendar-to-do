import { MouseEvent, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

interface Props {
  today: Date;
  i: number;
  isSelected: boolean;
  selectedDate: number | null;
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
}

export default function DayItem({
  today,
  isSelected,
  selectedDate,
  i,
  handleClick,
}: Props) {
  const [isActive, setIsActive] = useState(false);
  const [isToday, setIsToday] = useState(false);

  useEffect(() => {
    if (
      new Date().getDate() === i + 1 &&
      new Date().getMonth() === today.getMonth() &&
      new Date().getFullYear() === today.getFullYear()
    ) {
      setIsToday(true);
    }
  }, [today, i]);

  useEffect(() => {
    if (selectedDate) {
      if (i + 1 === selectedDate) {
        setIsActive(true);
      }
    }
    if (isSelected && i + 1 === today.getDate()) {
      setIsActive(true);
    }
  }, [selectedDate, isSelected, today, i]);

  return (
    <div
      key={uuid()}
      onClick={handleClick}
      className={`day flex h-[40px] w-[40px] items-center justify-center text-primary transition hover:bg-primary hover:text-white md:h-[50px] md:w-[50px] ${
        isToday ? "text-xl font-bold" : "text-xs"
      } ${isActive ? "active" : ""}`}
    >
      {i + 1}
    </div>
  );
}
