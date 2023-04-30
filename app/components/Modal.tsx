import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";

interface Props {
  header: string;
  isOpen: boolean;
  onClose: () => void;
  body: JSX.Element;
  footer?: JSX.Element;
  disabled?: boolean;
  onSubmit?: () => void;
  fullPage?: boolean;
}

export default function Modal({
  header,
  isOpen,
  onClose,
  body,
  footer,
  disabled,
  onSubmit,
  fullPage,
}: Props) {
  if (!isOpen) return null;

  function handleClose() {
    if (disabled) return;
    onClose();
  }

  return (
    <Backdrop onClick={handleClose} fullPage={fullPage}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={`modal mx-4 flex max-w-sm flex-col justify-center rounded-lg bg-slate-800 p-10  ${
          fullPage ? "px-12 py-10" : "p-4"
        }`}
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-bold text-white">{header}</h2>
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
