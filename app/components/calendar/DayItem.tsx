import { MouseEvent, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDayContext } from "@/app/store/DayContext";
import { Event } from "@prisma/client";
import { checkHasEvent } from "@/app/utils/checkHasEvent";

interface Props {
  i: number;
  events: Event[] | null;
}

const DayItem = ({ i, events }: Props) => {
  const [isActive, setIsActive] = useState(false);
  const [isToday, setIsToday] = useState(false);

  const daysGridRef = useRef<HTMLDivElement>(null);

  const { activeDate, setActiveDate, dayInView } = useDayContext();

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
    <motion.div
      data-grid
      ref={daysGridRef}
      onClick={handleClick}
      className={`day text-primary hover:bg-primary hover:text-white ${
        isToday ? "text-lg font-bold" : "text-xs"
      } ${isActive ? "active" : ""} ${hasEvent ? "hasEvent" : ""}`}
    >
      <span className="day-text">{i + 1}</span>
    </motion.div>
  );
};
export default DayItem;

const variants = {
  initial: {
    // rotateX: 0,
  },
  animate: {
    rotateX: 360,
    rotateY: [-30, 0, 30, 0, -30],
    // rotateZ: [0, 30, 0, -30, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};
