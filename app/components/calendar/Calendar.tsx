"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDayContext } from "@/app/store/DayContext";
import { useEvents } from "../../events/hooks/useEvents";
import DaysContent from "./DaysContent";
import SelectMonth from "./SelectMonth";

export default function Calendar() {
  const { isSuccess } = useEvents();
  const { dayInView, setDayInView, setActiveDate } = useDayContext();

  const [direction, setDirection] = useState(0);
  const [height, setHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (height && containerRef.current) {
      containerRef.current.style.height = `${height}px`;
    }
  }, [height]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
    <div className="wrapper relative m-4 mx-auto h-fit w-fit transition-transform md:ml-4">
      <div className="calendar col-span-1 min-h-[360px] overflow-hidden rounded-md bg-white p-6 sm:min-h-[420px] md:my-0 md:ml-0 md:min-h-[500px] md:min-w-fit lg:min-h-[550px] xl:min-h-[600px]">
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
        {/* Days Of Week */}
        <div className="grid grid-cols-7 px-4 md:py-3">
          {daysOfWeek.map((day) => (
            <div key={day} className="square text-center text-xs">
              {day}
            </div>
          ))}
        </div>
        {/* Days Of Month */}
        <div ref={containerRef} className="slide-container relative">
          <DaysContent
            direction={direction}
            handleChevronLeft={handleChevronLeft}
            handleChevronRight={handleChevronRight}
            height={height}
            setHeight={setHeight}
            handleDaysOfNextMonth={handleDaysOfNextMonth}
            handleDaysOfLastMonth={handleDaysOfLastMonth}
          />
        </div>
        {isSuccess && (
          <motion.footer
            layout
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="flex justify-between gap-24 px-4 md:pt-4 lg:gap-36"
          >
            <div className="relative z-10 flex-1 text-xs">
              <SelectMonth setDirection={setDirection} />
            </div>
            <motion.button
              className="focus-ring z-20 select-none !rounded-lg bg-primary px-2 py-1 text-xs text-white shadow-lg focus-visible:ring-offset-2"
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
          </motion.footer>
        )}
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
