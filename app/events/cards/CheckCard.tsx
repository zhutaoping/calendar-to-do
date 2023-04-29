import { motion } from "framer-motion";
import { Event } from "@prisma/client";
import MyTooltip from "../../components/MyTooltip";
import { useEffect, useRef } from "react";

interface Props {
  evt: Event;
  handleCompleted: (e: React.MouseEvent, evt: Event) => void;
  handleChip: (e: React.MouseEvent) => void;
}

export default function CheckCard({ evt, handleCompleted, handleChip }: Props) {
  const dragRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = dragRef.current as HTMLDivElement;

    element.addEventListener(
      "dragstart",
      (e) => {
        e.dataTransfer?.setDragImage(element, -99999, -99999);
      },
      false
    );

    return () => {
      element.removeEventListener(
        "dragstart",
        (e) => {
          e.dataTransfer?.setDragImage(element, -99999, -99999);
        },
        false
      );
    };
  }, []);

  return (
    <div
      ref={dragRef}
      draggable
      onDrag={(e) => handleChip(e)}
      onClick={(e) => handleCompleted(e, evt)}
      className="check-card flex h-10 w-10 items-center justify-center overflow-hidden  border border-gray-500/20"
    >
      {evt.completed ? <CheckIcon2 /> : <CheckIcon1 />}
      <MyTooltip title="Flip the card">
        <div className="chip" onClick={(e) => handleChip(e)}></div>
      </MyTooltip>
    </div>
  );
}

export interface svgProps {
  [key: string]: string | number;
}

function CheckIcon1(props: svgProps) {
  return (
    <svg
      {...props}
      className="svg h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        // initial={{ pathLength: 0 }}
        animate={{ color: "#d3d4d620" }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function CheckIcon2(props: svgProps) {
  return (
    <svg
      {...props}
      className="svg h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, color: "var(--primary)" }}
        transition={{ duration: 0.2 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}
