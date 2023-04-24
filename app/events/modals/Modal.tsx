import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { Event } from "@prisma/client";
import Backdrop from "./Backdrop";

interface Props {
  id?: string;
  event?: Event;
  header: string;
  handleMutateEvent?: (data: Partial<Event>) => void;
  onSubmit?: () => void;
  isOpen: boolean;
  onClose: () => void;
  body: JSX.Element;
  footer?: JSX.Element;
  disabled?: boolean;
}

export default function Modal({
  id,
  event,
  header,
  handleMutateEvent,
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  disabled,
}: Props) {
  if (!isOpen) return null;

  function handleClose() {
    if (disabled) return;
    onClose();
  }

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
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg text-white">{header}</h2>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onClose()}
          >
            <AiOutlineClose color="white" size={20} />
          </motion.button>
        </div>
        {body}
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
