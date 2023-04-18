import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      className="backdrop absolute left-0 top-0 flex h-full w-full items-center justify-center"
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
