"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDay } from "@/app/store/DayContext";
import { useEventsQuery } from "../../hooks/useEventsQuery";
import DaysContent from "./DaysContent";
import SelectMonth from "./SelectMonth";

export default function Calendar() {
  const { isSuccess } = useEventsQuery();
  const { dayInView, setDayInView, setActiveDate } = useDay();

  const [direction, setDirection] = useState(0);
  const [height, setHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (height && containerRef.current) {
      containerRef.current.style.height = `${height}px`;
    }
  }, [height]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const yearAndMonth = dayInView.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const handleChevronLeft = () => {
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() - 1));
    setDirection(-1);
  };

  const handleChevronRight = () => {
    setDayInView(new Date(dayInView.getFullYear(), dayInView.getMonth() + 1));
    setDirection(1);
  };

  const handleDaysOfNextMonth = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() + 1, day)
    );
    setDirection(1);
  };

  const handleDaysOfLastMonth = (day: number) => {
    setDayInView(
      new Date(dayInView.getFullYear(), dayInView.getMonth() - 1, day)
    );
    setDirection(-1);
  };

  return (
    <div className="wrapper relative m-4 mx-auto h-fit w-fit md:ml-4">
      <div className="calendar col-span-1 overflow-hidden rounded-md bg-white p-6 md:my-0 md:ml-0 md:min-w-fit">
        <div className="text-textOnPrimary flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChevronLeft}
            className="focus-ring rounded p-2 text-sm hover:bg-borderDays"
          >
            <FaChevronLeft />
          </motion.button>
          <div className="relative flex h-5 w-1/2 items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.h4
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
                className="absolute text-sm"
              >
                {yearAndMonth}
              </motion.h4>
            </AnimatePresence>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleChevronRight}
            className="focus-ring p-2 text-sm hover:bg-borderDays"
          >
            <FaChevronRight className="text-sm" />
          </motion.button>
        </div>
        <div className="grid grid-cols-7 px-4 md:py-3">
          {days.map((day) => (
            <div key={day} className="day text-center text-xs">
              {day}
            </div>
          ))}
        </div>
        {isSuccess && (
          <div ref={containerRef} className="slide-container relative">
            <DaysContent
              direction={direction}
              handleChevronLeft={handleChevronLeft}
              handleChevronRight={handleChevronRight}
              setHeight={setHeight}
              handleDaysOfNextMonth={handleDaysOfNextMonth}
              handleDaysOfLastMonth={handleDaysOfLastMonth}
            />
          </div>
        )}
        <footer className="flex justify-between gap-24 px-4 md:pt-4 lg:gap-36">
          <div className="relative z-50 flex-1 text-xs">
            <SelectMonth setDirection={setDirection} />
          </div>
          <motion.button
            className="focus-ring z-10 select-none !rounded-lg bg-primary px-2 py-1 text-xs text-white shadow-lg focus-visible:ring-offset-2"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => {
              const d = new Date();
              if (dayInView < d) {
                setDirection(1);
              } else {
                setDirection(-1);
              }
              setDayInView(d);
              setActiveDate(d);
            }}
          >
            Today
          </motion.button>
        </footer>
      </div>
    </div>
  );
}

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};
