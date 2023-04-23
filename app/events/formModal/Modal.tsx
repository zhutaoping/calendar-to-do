import { motion } from "framer-motion";
import { Event } from "@prisma/client";
import Backdrop from "./Backdrop";
import Form from "./Form";

interface Props {
  id?: string;
  event?: Event;
  heading: string;
  handleClose: () => void;
  handleMutateEvent: (data: Partial<Event>) => void;
}

export default function Modal({
  id,
  event,
  heading,
  handleClose,
  handleMutateEvent,
}: Props) {
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="modal flex flex-col items-center justify-center rounded-lg bg-slate-800 p-4"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Form
          event={event}
          heading={heading}
          handleMutateEvent={handleMutateEvent}
          handleClose={handleClose}
        />
      </motion.div>
    </Backdrop>
  );
}

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "spring",
      damping: 20,
      stiffness: 300,
    },
  },
  exit: {
    y: "-100vh",
    opacity: 0,
  },
};
