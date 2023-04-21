import { motion } from "framer-motion";
import { Event } from "@prisma/client";

interface Props {
  evt: Event;
  handleCompleted: (e: React.MouseEvent, evt: Event) => void;
  handleChip: (e: React.MouseEvent) => void;
}

export default function CheckCard({ evt, handleCompleted, handleChip }: Props) {
  return (
    <div
      onClick={(e) => handleCompleted(e, evt)}
      title="check"
      className="check-card flex h-10 w-10 items-center justify-center overflow-hidden border border-gray-500/20"
    >
      {evt.completed ? <CheckIcon2 /> : <CheckIcon1 />}
      <div title="flip" className="chip" onClick={(e) => handleChip(e)}></div>
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
