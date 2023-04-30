import { motion } from "framer-motion";
import { MouseEvent } from "react";

interface Props {
  children: React.ReactNode;
  fullPage?: boolean;
  onClose: () => void;
}

export default function Backdrop({ children, onClose, fullPage }: Props) {
  function handleClick(e: MouseEvent) {
    console.log("Backdrop handleClick");
    onClose();
  }

  return (
    <motion.div
      className={`backdrop absolute left-0 top-0 z-40 flex h-full w-full ${
        fullPage ? "items-center" : "items-start"
      } justify-center md:items-center`}
      onClick={(e) => handleClick(e)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
