import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import Backdrop from "./Backdrop";
import FocusTrap from "focus-trap-react";

interface Props {
  header: string;
  onClose: () => void;
  body: JSX.Element;
  footer?: JSX.Element;
  disabled?: boolean;
  onSubmit?: () => void;
  fullPage?: boolean;
  isMobile?: boolean;
}

const Modal = ({
  header,
  onClose,
  body,
  footer,
  disabled,
  onSubmit,
  fullPage,
  isMobile,
}: Props) => {
  return (
    <>
      <Backdrop fullPage={fullPage} onClose={onClose}>
        <FocusTrap
          focusTrapOptions={{
            // Still need Backdrop onClick to close modal
            clickOutsideDeactivates: true,
            initialFocus: ".initFocus",
          }}
        >
          <motion.div
            className={`modal mx-4 flex max-w-sm flex-col justify-center rounded-lg bg-slate-800 p-10 ${
              fullPage ? "px-12 py-10" : "p-4"
            } `}
            variants={isMobile ? fadeIn : dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
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
        </FocusTrap>
      </Backdrop>
    </>
  );
};
export default Modal;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      // delay: 0.1,
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

const fadeIn = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
  exit: {
    y: 20,
    opacity: 0,
  },
};
