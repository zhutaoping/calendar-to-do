import { MouseEvent } from "react";
import { v4 as uuid } from "uuid";

interface Props {
  handleClick: (e: MouseEvent<HTMLDivElement>) => void;
  i: number;
  isToday: boolean;
  isActive: boolean;
}

export default function DayItem({ handleClick, i, isToday, isActive }: Props) {
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
