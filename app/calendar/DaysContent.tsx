import { useEffect, useRef } from "react";
import { endOfMonth, getDaysInMonth, startOfMonth } from "date-fns";
import { useDay } from "@/app/store/DayContext";
import { Event } from "@prisma/client";
import { checkHasEvent } from "@/app/utils/checkHasEvent";
import DayItem from "./DayItem";

import { AnimatePresence, motion } from "framer-motion";
import { useEventsQuery } from "../hooks/useEventsQuery";

interface Props {
  handleDaysOfNextMonth: (day: number) => void;
  handleDaysOfLastMonth: (day: number) => void;
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  direction: number;
  handleChevronLeft: () => void;
  handleChevronRight: () => void;
}

const DaysContent = ({
  handleDaysOfNextMonth,
  handleDaysOfLastMonth,
  setHeight,
  direction,
  handleChevronLeft,
  handleChevronRight,
}: Props) => {
  const { dayInView, setActiveDate } = useDay();
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const size = divRef.current?.getBoundingClientRect();
    setHeight(size?.height ?? 0);
  }, [dayInView, setHeight]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const divRef = document.getElementById("divRef");
      const size = divRef?.getBoundingClientRect();
      setHeight(size?.height ?? 300);
    });
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setHeight]);

  const { data } = useEventsQuery();
  const events = data as Event[];

  const daysInMonth = getDaysInMonth(dayInView);
  const startDay = startOfMonth(dayInView).getDay();
  const endDay = endOfMonth(dayInView).getDay();

  const lastDaysInMonth = getDaysInMonth(
    new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, 1)
  );

  function handleResize(this: Window, ev: UIEvent) {
    throw new Error("Function not implemented.");
  }

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

  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={`${dayInView.getFullYear}-${dayInView.getMonth()}`}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={1}
        onDragEnd={(e, { offset, velocity }) => {
          const swipe = swipePower(offset.x, velocity.x);

          if (swipe < -swipeConfidenceThreshold) {
            handleChevronRight();
          } else if (swipe > swipeConfidenceThreshold) {
            handleChevronLeft();
          }
        }}
        ref={divRef}
        id="divRef"
        className="days absolute grid grid-cols-7 px-4 pb-4"
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
};
export default DaysContent;

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      blur: 10,
    };
  },
  center: {
    zIndex: 10,
    x: 0,
    opacity: 1,
    blur: 0,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
