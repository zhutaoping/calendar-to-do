import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  fullPage?: boolean;
}

export default function Backdrop({ children, onClick, fullPage }: Props) {
  console.log("fullPage", fullPage);
  return (
    <motion.div
      className={`backdrop absolute left-0 top-0 z-50 flex h-full w-full ${
        fullPage ? "items-center" : "items-start"
      } justify-center md:items-center`}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
