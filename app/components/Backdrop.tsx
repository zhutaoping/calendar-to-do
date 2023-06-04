import { motion } from 'framer-motion'

interface Props {
  children: React.ReactNode
  fullPage?: boolean
  onClose: () => void
}

export default function Backdrop({ children, onClose, fullPage }: Props) {
  return (
    <motion.div
      className={`backdrop absolute left-0 top-0 z-50 flex h-full w-full ${
        fullPage ? 'items-start' : 'items-start'
      } justify-center md:items-center`}
      // onClick={() => onClose()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
