import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
}

export default function Backdrop({ children, onClick }: Props) {
  return (
    <motion.div
      drag
      dragConstraints={{
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
      className="backdrop absolute left-0 top-0 z-10 flex h-full w-full items-start justify-center md:items-center "
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}
