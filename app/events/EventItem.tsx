/* eslint-disable react/display-name */
import { MouseEvent, forwardRef, useEffect, useRef } from "react";
import { VscCircleFilled } from "react-icons/vsc";
import { Event } from "@prisma/client";
import CheckCard from "./cards/CheckCard";
import DeleteCard from "./cards/DeleteCard";

import { motion } from "framer-motion";

interface Props {
  evt: Event;
  index: number;
  handleClick: (evt: Event) => void;
  handleCompleted: (e: React.MouseEvent, evt: Event) => void;
  handleDelete: (e: React.MouseEvent, id: string) => void;
}

type Ref = HTMLLIElement;

const EventItem = forwardRef<Ref, Props>(
  ({ evt, index, handleClick, handleCompleted, handleDelete }, ref) => {
    const cardsRef = useRef<HTMLDivElement | null>(null);

    let timer!: ReturnType<typeof setTimeout>;

    function handleChip(e: MouseEvent) {
      console.log("drag");
      e.stopPropagation();
      const element = cardsRef.current!;

      let degValue = 0;

      if (element.style.transform) {
        degValue = parseInt(element.style.transform.split("(")[1]);
      }

      function isOdd(num: number) {
        return num % 2;
      }

      if (!isOdd(degValue / 180)) {
        degValue += 180;
        timer = setTimeout(() => {
          element.style.transform = "";
          clearTimeout(timer);
        }, 3000);
      } else {
        degValue = 0;
        clearTimeout(timer);
      }

      element.style.transform = `rotateY(${degValue}deg)`;
    }

    return (
      <motion.li
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        ref={ref}
        className="mb-1 flex w-full 
        items-center justify-between bg-gradient-to-r from-slate-600 to-bgContainer px-8 py-2 md:pr-6"
        key={evt.id}
      >
        <div
          onClick={() => handleClick(evt)}
          className={`flex flex-col ${evt.completed ? "" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-2">
            <VscCircleFilled
              className={`${
                evt.completed ? "" : "text-primary"
              } h-4 w-4 shrink-0`}
            />
            <p
              className={`transition-color pr-3 text-base md:max-w-[320px] md:p-0 ${
                evt.completed
                  ? "text-textOnCalendar line-through"
                  : "text-white"
              }`}
            >
              {evt.title}
            </p>
          </div>

          <div className="ml-6">
            <span className="text-xs text-gray-400">{evt.startTime} - </span>
            <span className="text-xs text-gray-400">{evt.endTime}</span>
          </div>
        </div>
        {/* flip board */}
        <div className="flip-board relative h-10 w-10 cursor-pointer">
          <div ref={cardsRef} className="flip-cards">
            <CheckCard
              evt={evt}
              handleCompleted={handleCompleted}
              handleChip={handleChip}
            />
            <DeleteCard
              evt={evt}
              handleDelete={handleDelete}
              handleChip={handleChip}
            />
          </div>
        </div>
      </motion.li>
    );
  }
);
export default EventItem;
